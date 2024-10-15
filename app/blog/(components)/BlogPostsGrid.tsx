import React from "react";
import PostCard from "./PostCard";
import { BlogPost } from "../(services)/blogPostService";
type Props = {
  posts: BlogPost[];
  className?: string;
};

/**
 * A grid of blog posts.
 */
const BlogPostsGrid = (props: Props) => {
  const { posts, className } = props;

  return (
    <div
      className={`grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
};

export default BlogPostsGrid;
