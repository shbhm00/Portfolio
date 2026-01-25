/**
 * Blog Sample Data
 *
 * Technical blog posts related to React Native and mobile development
 */

import type { BlogPost } from '@/types';
import { DEFAULT_AUTHOR } from '@/constants';

export const blogPosts: BlogPost[] = [
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
