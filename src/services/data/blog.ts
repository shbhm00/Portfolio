/**
 * Blog Sample Data
 *
 * Technical blog posts related to React Native and mobile development
 */

import type { BlogPost } from '@/types';
import { DEFAULT_AUTHOR } from '@/constants';

export const blogPosts: BlogPost[] = [
  {
    id: '6',
    slug: 'tiktok-style-vertical-video-player-react-native',
    title: 'Building a TikTok-Style Vertical Video Player in React Native',
    excerpt:
      'A deep dive into building a production-ready, high-performance vertical video feed with multi-instance pooling, smart preloading, and buttery-smooth animations.',
    content: `
# Building a TikTok-Style Vertical Video Player in React Native

The rise of short-form video content has fundamentally changed how users consume media. From TikTok to Instagram Reels, YouTube Shorts to Snapchat Spotlight — vertical video feeds have become the dominant content format for mobile-first experiences.

Building such a feature in React Native presents unique challenges: **seamless video transitions**, **memory efficiency**, **cross-platform consistency**, and **60fps animations**. In this comprehensive guide, I'll explore a battle-tested architecture that handles millions of video views while maintaining a native-like experience.

## What You'll Learn

- A component-based architecture for vertical video feeds
- Video player pooling strategies for instant playback
- Platform-specific optimizations (iOS vs Android)
- Memory-efficient pagination with infinite scroll
- Smooth animations using Reanimated 2

---

## Architectural Overview

### The Three-Layer Architecture

Our system is built on three distinct layers:

**Layer 1: Configuration Layer (ReelsScreen)**

This is the entry point that establishes the foundation:
- Observable State Container for real-time playback data
- Platform Detection for iOS vs Android optimizations
- DRM Configuration for content protection

**Layer 2: Orchestration Layer (ReelsComponent)**

The brain of the operation:
- FlashList Container for virtualized vertical scrolling
- Video Player Pools (different strategies per platform)
- Episode Data Service for API communication
- Bidirectional Pagination Handler

**Layer 3: Presentation Layer (ReelCard)**

Individual video cards containing:
- ReelVideo component for actual playback
- ReelOverlay for controls and metadata
- ReelSlider for progress indication
- Custom hooks for animations, analytics, and playback logic

### Data Flow

The data flows in a unidirectional pattern:

1. **User scrolls** → FlashList detects viewability change
2. **Viewability callback fires** → Determines which video should be active
3. **Pool manager assigns player** → Either reuses existing or assigns from pool
4. **Video loads and plays** → State updates propagate to UI
5. **User interacts** → Controls update observable state → Video responds

---

## Component Hierarchy Deep Dive

### ReelsScreen: The Entry Point

The entry point component serves as the configuration layer. It establishes an **Observable State Container** — a reactive state object using Legend State that holds all playback-related information.

> Why observable state? Consider a progress bar updating 10 times per second.

**Traditional React State:**
10 updates/sec × 60 seconds = **600 re-renders per video**

**Observable State:**
**0 re-renders** (UI subscribes directly to progress value)

The observable state container holds 40+ properties including \`isPaused\`, \`currentTime\`, \`isBuffering\`, \`playbackSequence\`, text/audio track selections, modal visibility states, and error tracking.

### ReelsComponent: The Orchestrator

This is where the magic happens. The main component initializes two different video player pools based on platform:

- **For iOS:** Multi-Instance Video Pool with 3 dedicated instances
- **For Android:** Video Player Pool with 3-5 reusable instances

It also handles bidirectional pagination (loading previous AND next episodes), scroll position tracking for pagination triggers, viewability detection for playback activation, and memory cleanup when data exceeds thresholds.

### ReelCard: The Individual Item

Each video card is a self-contained unit with **ReelVideo** (the actual video player component), **ReelOverlay** (title, actions, play/pause indicators), and **ReelSlider** (progress bar with scrubbing support).

The card uses several custom hooks: \`useVideoPlayer\` for managing playback state, \`useReelAnimations\` for 60fps transitions using Reanimated 2, \`useEventTracking\` for analytics, and \`useReelButtons\` for action button states and handlers.

---

## Video Player Pool Management

One of the biggest performance challenges in vertical video feeds is the overhead of creating and destroying video player instances.

### The Cost of Video Players

Each video player instance allocates significant memory (50-100MB), requires decoder initialization, may need DRM license acquisition, and takes 100-500ms to become ready.

### The Problem Without Pooling

Imagine a user scrolling through videos:

**Traditional Approach (Slow):**
- Video 1: Create player → Play → Destroy (400ms)
- Video 2: Create player → Play → Destroy (400ms)
- Video 3: Create player → Play → Destroy (400ms)

Total perceived delay: **1200ms+** of stuttering and black screens.

### The Solution: Player Pooling

**Pool-Based Approach (Fast):**
- Maintain 3-5 pre-created player instances
- When switching videos, just swap the source URL
- The player stays mounted; only the content changes

Total perceived delay: **50-100ms** (source swap only)

### How the Pool Works

The \`useVideoPlayerPool\` hook manages the pool with these key methods:

**getAvailablePlayer()** — Finds an idle player in the pool with intelligent fallback priorities.

**switchToVideo(url, metadata)** — Activates a video by checking if URL is already preloaded and using that player immediately, or getting an available player to update.

**preloadSurroundingVideos(index, list, direction)** — Background loading that preloads 1-2 videos ahead and behind while respecting device capabilities.

**efficientVideoSwitch(url, metadata, currentPlayer)** — The key optimization that reuses the decoder pipeline instead of remounting.

### Source Updates vs Remounts

This is the critical insight:

**Traditional (Remount):** Unmount, mount, wait for decoder initialization, wait for first frame. **Total: 300-500ms**

**Optimized (Source Update):** Update source prop on existing component, video component handles source change internally, decoder reuses existing pipeline. **Total: 50-100ms**

---

## Multi-Instance Video Pool (iOS Optimization)

iOS has a distinct video rendering architecture that benefits from a different strategy. Instead of a generic pool, we maintain exactly **3 dedicated instances**.

### The Three-Instance Model

- **Previous Instance (index -1):** Holds the video the user just passed
- **Current Instance (index 0):** The actively playing video
- **Next Instance (index +1):** Preloaded and ready for the next swipe

When the user swipes down, previous becomes unused, current becomes previous, next becomes current, and a new next is preloaded.

### Why iOS Gets Special Treatment

iOS AVPlayer handles multiple instances efficiently. The system is optimized for native video preloading, shared decoder resources between instances, and memory pressure handling at the OS level.

Android ExoPlayer, conversely, performs better with fewer active instances and benefits more from source-swapping.

---

## State Management Strategy

Managing state in a video feed is complex. We use a **dual state architecture** with three types of state.

### Type 1: Observable State (Legend State)

For high-frequency updates that shouldn't trigger re-renders: \`isPaused\`, \`currentTime\`, \`isBuffering\`, and \`playbackSequence\`.

\`\`\`javascript
// Access Pattern
const isPaused = useSelector(() => control$.isPaused.get());

// Update Pattern
control$.isPaused.set(true);
\`\`\`

### Type 2: React State (useState)

For low-frequency updates where re-renders are acceptable: \`reelData\`, \`currentIndex\`, \`viewableItem\`, and \`isInitialLoad\`.

### Type 3: Ref State (useRef)

For mutable values that should never trigger re-renders: \`FlashListRef\`, \`playerRef\`, \`currentIndexRef\`, and pagination locks.

### Why This Matters

Using the wrong state type causes performance issues:

**Wrong:** Using React state for currentTime causes **600+ re-renders per minute**

**Right:** Using observable state causes **0 re-renders** — progress bar subscribes directly

---

## Scroll & Viewability Handling

Detecting which video is "active" requires coordinating scroll events with the virtualized list.

### Viewability Configuration

FlashList provides viewability detection with two key settings:

- **viewAreaCoveragePercentThreshold: 30%** — A video is considered "viewable" when 30% of it is visible
- **minimumViewTime: 200ms** — It must be visible for at least 200ms to trigger the callback

This prevents rapid firing during fast scrolling.

### The Viewability Callback Flow

When a video becomes viewable, this sequence executes:

1. Check if update should be ignored during data merge operations
2. Track previous video for analytics (send \`media_watched\` and \`media_started\` events)
3. Reset watch progress (seek previous video to 0 for replay)
4. Destroy previous player on Android (free decoder resources, release DRM licenses)
5. Update state (set \`currentIndex\` and \`viewableItem\`)
6. Unpause new video

### Bidirectional Pagination

Users scroll both up and down. We handle both directions differently:

**Forward Pagination (scrolling down):** Triggered when user is within last 3 items, fetches next batch, appends immediately.

**Backward Pagination (scrolling up):** Triggered when user is within first 3 items, fetches previous batch, stores in a "bucket" (not merged yet), then when user reaches index 0, merge bucket and adjust scroll position.

> Why the bucket approach for backward? Because prepending data changes all indices. Without scroll adjustment, the user would suddenly be looking at a different video.

---

## Animation System

Smooth animations are critical for a native-like experience. We use **Reanimated 2** for worklet-based, 60fps animations.

### Why Worklets Matter

JavaScript runs on a single thread. When JS is busy (parsing data, making calculations), animations stutter.

Reanimated 2 moves animation logic to the **UI thread** via "worklets". The animation runs at 60fps regardless of JS thread activity.

### The useReelAnimations Hook

This hook manages all animation state through shared values that live on the UI thread: \`videoOpacity\`, \`overlayVisibility\`, \`topMetadataOpacity\`, \`actionsOpacity\`, pause/play icon opacities, \`focusProgress\`, \`videoBlur\`, and \`videoBrightness\`.

Animated styles derive from shared values and return style objects for the video container, controls wrapper, center icons with scale, and active video border.

### Animation Timing

All animations use a smooth bezier easing: \`[0.25, 0.1, 0.25, 1.0]\`

**Durations:**
- Video fade in: 200ms
- Video fade out: 150ms
- Controls fade: 150ms
- Focus transition: 300ms
- Play/Pause icon show: 400ms
- Overlay auto-hide delay: 3000ms

---

## Data Layer & Pagination

### Episode Transformation

API responses come in one format; our UI needs another. The transformer converts \`contentId\`, \`title\`, \`playbackUrl\`, \`duration\`, \`boxCoverImage\`, and DRM tokens into \`id\`, formatted title, \`playUrl\`, \`potrait_thumbnail\`, DRM flags, and nested original data.

### Deduplication

When paginating, we might receive duplicates. Before merging, we filter out any items that already exist in the current data set based on unique identifiers.

### Pagination State Machine

The pagination system has clear states: IDLE, CHECK_THRESHOLD, LOADING_PREVIOUS, LOADING_NEXT, and MERGE_AND_ADJUST. Guards prevent double-loading using \`loadingTopRef\`, \`loadingBottomRef\`, and \`isMergingPreviousDataRef\`.

---

## Performance Optimizations

### Memory Management

**Pool Size Limits:**
- iOS: 3 instances (fixed multi-instance)
- Android: 3-5 instances (configurable)
- Low-end devices: 1-2 instances

**Data Array Limits:**
- Maximum: 100 videos in memory
- Cleanup threshold: 80 videos
- On cleanup: Keep currentIndex ± 20 items

### Render Optimization

The \`ReelCard\` uses \`React.memo\` with a custom comparison function that only allows re-renders when the content ID, index, current index, viewable item, or show video prop changes.

All handlers use \`useCallback\`, expensive computations use \`useMemo\`, and user interactions are debounced or throttled appropriately.

### FlashList Configuration

**iOS-specific:** \`pagingEnabled: true\`, \`removeClippedSubviews: true\`, \`decelerationRate: 'fast'\`

**Android-specific:** \`snapToInterval: screenHeight\`, \`snapToAlignment: 'start'\`, \`scrollEventThrottle: 16\`

**Both platforms:** \`estimatedItemSize: screenHeight\`, \`drawDistance: screenHeight × 5\`, \`getItemLayout\` function

---

## Key Takeaways

### Eight Principles for High-Performance Video Feeds

**1. Instance Pooling** — Don't create/destroy players, reuse them. The cost of creating a video player is 10-50× higher than swapping a source URL.

**2. Platform-Specific Strategies** — iOS and Android have different video stack optimizations. iOS handles multiple instances well; Android prefers fewer instances with source swapping.

**3. Observable State for High-Frequency Data** — Progress bars, buffering states, and timing data should not trigger React re-renders. Use observable state patterns.

**4. Predictive Preloading** — Load the next video before the user needs it. The best loading indicator is no loading indicator.

**5. Bidirectional Pagination with Position Preservation** — Users scroll both ways. Handle backward pagination with a bucket-and-merge approach to preserve scroll position.

**6. Worklet-Based Animations** — Move animations to the UI thread with Reanimated 2. JS-thread animations will always drop frames under load.

**7. Aggressive Memoization** — In a list of video players, every unnecessary re-render is a potential frame drop. Memoize components, callbacks, and computed values.

**8. Memory Boundaries** — Set hard limits on pool sizes and data arrays. Video playback is memory-intensive; without limits, you'll hit OOM crashes.

### Performance Metrics to Track

- **Time to First Frame:** Target < 200ms from visibility to playing
- **Video Switch Time:** Target < 100ms from swipe end to playing
- **Scroll FPS:** Target 60fps with no dropped frames
- **Memory Usage:** Target < 300MB total app memory
- **Pool Hit Rate:** Target > 90% preloaded video hits

---

## Conclusion

Building a production-ready vertical video feed requires careful consideration of video player lifecycle management, platform-specific optimizations, memory efficiency, animation performance, and state management.

The architecture presented here has been battle-tested with millions of video plays. The patterns are transferable to any React Native application dealing with media-heavy, scroll-based interfaces.

Whether you're building the next TikTok competitor or adding a video feed to your existing app, these principles will help you deliver a smooth, performant experience that users expect from modern mobile applications.
    `,
    coverImage: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80',
    author: DEFAULT_AUTHOR,
    publishedAt: '2025-01-20',
    readingTime: 18,
    tags: ['React Native', 'Video Streaming', 'Performance', 'Mobile Development', 'Architecture'],
    featured: true,
  },
  {
    id: '1',
    slug: 'react-native-performance-optimization',
    title: 'React Native Performance Optimization: A Comprehensive Guide',
    excerpt:
      'Learn proven techniques to optimize your React Native app for smooth 60fps performance, including JS thread optimization, memory management, and rendering strategies.',
    content: `
# React Native Performance Optimization

Building high-performance mobile apps requires understanding both JavaScript and native performance characteristics. Here's what I've learned optimizing apps with 1M+ users.

## Measuring Performance

Before optimizing, measure:

- **JS Thread FPS**: Use React DevTools Profiler
- **UI Thread FPS**: Use native profiling tools
- **Memory Usage**: Monitor with Android Studio / Xcode
- **Startup Time**: Track cold and warm starts

## Key Optimization Strategies

### 1. Optimize Re-renders

\`\`\`typescript
// Use React.memo for expensive components
const ProductCard = React.memo(({ product }) => {
  return <View>...</View>;
});

// Use useCallback for event handlers
const handlePress = useCallback(() => {
  // handler logic
}, [dependencies]);
\`\`\`

### 2. Virtualize Long Lists

\`\`\`typescript
<FlashList
  data={items}
  renderItem={renderItem}
  estimatedItemSize={100}
  // Much better than FlatList for large lists
/>
\`\`\`

### 3. Enable Hermes

Hermes significantly improves:
- App startup time
- Memory usage
- Bundle size

### 4. Optimize Images

- Use proper image sizes
- Implement lazy loading
- Use FastImage for caching

## Results

With these optimizations, we achieved:
- Video startup time < 2 seconds
- 60fps scrolling in complex feeds
- 35K+ concurrent users handled smoothly
    `,
    coverImage: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop',
    author: DEFAULT_AUTHOR,
    publishedAt: '2024-11-15',
    readingTime: 10,
    tags: ['React Native', 'Performance', 'Mobile Development'],
    featured: true,
  },
  {
    id: '2',
    slug: 'video-streaming-react-native',
    title: 'Building a Video Streaming App with React Native: DRM, HLS, and More',
    excerpt:
      'A deep dive into implementing video streaming features including DRM protection, adaptive bitrate streaming, and SSAI ad integration in React Native.',
    content: `
# Building a Video Streaming App with React Native

Video streaming in mobile apps comes with unique challenges. Here's how we built an OTT platform handling 35K+ concurrent users.

## Core Video Requirements

- HLS/DASH adaptive streaming
- DRM protection (Widevine, FairPlay)
- SSAI/CSAI ad integration
- Picture-in-Picture
- Chromecast/AirPlay support

## Implementation

### Setting Up the Video Player

\`\`\`typescript
import Video from 'react-native-video';

const VideoPlayer = ({ source, drmConfig }) => {
  return (
    <Video
      source={{
        uri: source.url,
        type: 'm3u8',
      }}
      drm={drmConfig}
      onBuffer={handleBuffer}
      onError={handleError}
      resizeMode="contain"
    />
  );
};
\`\`\`

### Optimizing Startup Time

Key strategies:
1. Preload video metadata
2. Implement retry mechanisms
3. Use appropriate initial bitrate
4. Handle network changes gracefully

### DRM Integration

\`\`\`typescript
const drmConfig = {
  type: DRMType.WIDEVINE,
  licenseServer: LICENSE_URL,
  headers: {
    'X-AxDRM-Message': token,
  },
};
\`\`\`

## Analytics

Track these metrics:
- Video startup time (TTFF)
- Rebuffering ratio
- Playback failures
- Bitrate switches

## Results

- Startup time reduced to < 2 seconds
- 99.5% playback success rate
- Smooth 35K+ CCU handling
    `,
    coverImage: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&h=400&fit=crop',
    author: DEFAULT_AUTHOR,
    publishedAt: '2024-10-20',
    readingTime: 12,
    tags: ['React Native', 'Video Streaming', 'DRM', 'OTT'],
    featured: true,
  },
  {
    id: '3',
    slug: 'typescript-react-native-best-practices',
    title: 'TypeScript in React Native: Best Practices for Scalable Apps',
    excerpt:
      'How to leverage TypeScript to build maintainable React Native applications with proper typing, generics, and architecture patterns.',
    content: `
# TypeScript in React Native

Migrating to TypeScript transformed how we build React Native apps. Here's what I've learned leading TypeScript migrations.

## Why TypeScript?

- Catch bugs at compile time
- Better IDE support
- Self-documenting code
- Safer refactoring

## Essential Patterns

### Typed Navigation

\`\`\`typescript
type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  Cart: undefined;
};

const navigation = useNavigation<NavigationProp<RootStackParamList>>();
\`\`\`

### API Response Types

\`\`\`typescript
interface ApiResponse<T> {
  data: T;
  error: string | null;
  loading: boolean;
}

interface Product {
  id: string;
  name: string;
  price: number;
  variants: Variant[];
}
\`\`\`

### Component Props

\`\`\`typescript
interface ButtonProps {
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  children: React.ReactNode;
}
\`\`\`

## Migration Strategy

1. Start with new files
2. Rename .js to .tsx gradually
3. Add types incrementally
4. Enable strict mode eventually

## Results

After migration:
- 40% reduction in runtime errors
- Faster onboarding for new developers
- Confident refactoring
    `,
    coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
    author: DEFAULT_AUTHOR,
    publishedAt: '2024-09-15',
    readingTime: 8,
    tags: ['TypeScript', 'React Native', 'Best Practices'],
    featured: false,
  },
  {
    id: '4',
    slug: 'graphql-react-native-ecommerce',
    title: 'Building E-commerce Apps with GraphQL and React Native',
    excerpt:
      'Learn how to implement efficient data fetching, caching, and state management using GraphQL in your React Native e-commerce app.',
    content: `
# GraphQL in React Native E-commerce

GraphQL changed how we build e-commerce apps. Here's our approach to building apps with 1M+ downloads.

## Why GraphQL?

- Request exactly what you need
- Single request for complex data
- Strong typing
- Real-time subscriptions

## Setting Up

\`\`\`typescript
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Product: {
        keyFields: ['id'],
      },
    },
  }),
});
\`\`\`

## Efficient Queries

\`\`\`graphql
query GetProducts($category: ID!, $limit: Int!) {
  products(category: $category, limit: $limit) {
    id
    name
    price
    thumbnail
    variants {
      id
      size
      inStock
    }
  }
}
\`\`\`

## Caching Strategies

- Use type policies for normalization
- Implement optimistic updates for cart
- Pagination with fetchMore

## Performance Tips

1. Use fragments for reusable fields
2. Implement proper loading states
3. Handle errors gracefully
4. Use persisted queries
    `,
    coverImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    author: DEFAULT_AUTHOR,
    publishedAt: '2024-08-10',
    readingTime: 9,
    tags: ['GraphQL', 'React Native', 'E-commerce'],
    featured: true,
  },
  {
    id: '5',
    slug: 'react-native-reanimated-animations',
    title: 'Smooth Animations with React Native Reanimated',
    excerpt:
      'Create butter-smooth 60fps animations in React Native using Reanimated 2, running entirely on the UI thread.',
    content: `
# React Native Reanimated

Smooth animations are crucial for a premium app feel. Here's how we use Reanimated for 60fps animations.

## Why Reanimated?

- Runs on UI thread
- No JS bridge overhead
- Declarative API
- Gesture handling

## Basic Animation

\`\`\`typescript
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const Component = () => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  return (
    <Animated.View style={animatedStyles}>
      <Content />
    </Animated.View>
  );
};
\`\`\`

## Gesture Animations

\`\`\`typescript
const gesture = Gesture.Pan()
  .onUpdate((e) => {
    offset.value = e.translationX;
  })
  .onEnd(() => {
    offset.value = withSpring(0);
  });
\`\`\`

## Use Cases

- Pull-to-refresh
- Swipe actions
- Tab transitions
- Modal presentations
- Card stacks

## Performance Tips

1. Use worklets for calculations
2. Avoid JS thread crossings
3. Use interpolate for derived values
4. Test on low-end devices
    `,
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=400&fit=crop',
    author: DEFAULT_AUTHOR,
    publishedAt: '2024-07-05',
    readingTime: 7,
    tags: ['React Native', 'Animations', 'Reanimated'],
    featured: false,
  },
];

/**
 * Get all blog posts
 */
export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

/**
 * Get posts by tag
 */
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique tags
 */
export function getAllTags(): string[] {
  const tags = blogPosts.flatMap((post) => post.tags);
  return [...new Set(tags)].sort();
}

/**
 * Get related posts
 */
export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];

  return blogPosts
    .filter((p) => p.slug !== currentSlug)
    .map((post) => ({
      post,
      matchCount: post.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.post);
}
