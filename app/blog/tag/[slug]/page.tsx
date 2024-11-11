import React from "react";
import BlogPostsGrid from "../../(components)/BlogPostsGrid";
import {
  getPostsMetadata,
  getPostTags,
} from "../../(services)/blogPostService";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  try {
    const tags = getPostTags();

    return tags.map((tag) => ({
      slug: tag,
    }));
  } catch (error) {
    console.error(
      "Error while generating static params for blog tag pages",
      error,
    );
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    return {
      title: "Posts with tag: " + decodeURIComponent(params.slug),
    };
  } catch (error) {
    console.error("Error while generating metadata for tag page", error);
    return {
      title: "Tag not found",
      description: "The tag you are looking for does not exist",
    };
  }
}

const page = (props: Props) => {
  const { slug } = props.params;
  const posts = getPostsMetadata({ tags: [decodeURIComponent(slug)] });

  return (
    <section className="custom-container mb-40 mt-24 min-h-screen">
      <h1 className="text-center text-6xl font-bold">
        All posts with tag: {decodeURIComponent(slug)}
      </h1>
      <BlogPostsGrid posts={posts} className="mt-24" />
    </section>
  );
};

export default page;
