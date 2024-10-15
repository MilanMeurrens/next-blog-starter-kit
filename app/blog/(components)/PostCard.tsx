import React from "react";
import Image from "next/image";
import Link from "next/link";
import CategoryLink from "./CategoryLink";
import TagPillsList from "./TagPillsList";
import { BlogPost } from "../(services)/blogPostService";
type Props = {
  post: BlogPost;
};

/**
 * A card for a blog post containing the post's image, category, title, description, and tags.
 */
const PostCard = ({ post }: Props) => {
  return (
    <div className="flex w-full flex-col">
      {/* IMAGE */}
      <Link href={`/blog/${post.slug}`} className="mb-4">
        <Image
          src={post.imageThumbnail ?? post.image}
          alt={post.title}
          width={100}
          height={100}
          sizes="100%"
          className="h-[280px] w-full rounded-sm object-cover transition-opacity hover:opacity-90"
        />
      </Link>

      {/* CATEGORY */}
      {post.category && <CategoryLink category={post.category} />}

      {/* TITLE */}
      <Link href={`/blog/${post.slug}`}>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight hover:underline">
          {post.title}
        </h2>
      </Link>

      {/* DESCRIPTION */}
      {post.description && (
        <p className="mt-4 line-clamp-3 leading-6 text-foreground opacity-70">
          {post.description}
        </p>
      )}

      {/* TAGS */}
      {post.tags && post.tags.length > 0 && (
        <TagPillsList tags={post.tags} max={3} />
      )}

      {/* READ MORE */}
      <Link
        href={`/blog/${post.slug}`}
        className="mt-6 flex items-center gap-2 font-medium leading-6 text-foreground hover:text-blue-500 hover:underline"
      >
        Learn more{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z"></path>
        </svg>
      </Link>
    </div>
  );
};

export default PostCard;
