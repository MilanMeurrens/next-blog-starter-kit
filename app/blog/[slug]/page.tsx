import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import TagPill from "../(components)/TagPill";
import CategoryLink from "../(components)/CategoryLink";
import { getPost, getPostsMetadata } from "../(services)/blogPostService";
import "./github-dark.css";
import { useMDXComponents as MDXComponents } from "@/mdx-components";
import { Metadata, ResolvingMetadata } from "next";

function Thing() {
  return <>World</>;
}

const customComponents = {
  Thing,
};

const options = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    // Set detect to false to not highlight code blocks withouth a specified code language
    rehypePlugins: [[rehypeHighlight, { detect: true }]],
  },
};

type Props = {
  params: {
    slug: string;
  };
};

export async function generateStaticParams() {
  try {
    const posts = getPostsMetadata();

    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error while generating static params for blog posts", error);
    return [];
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  try {
    const post = getPost(params.slug);

    // Access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: post.data.title,
      description: post.data.description,
      openGraph: {
        images: [
          post.data.imageThumbnail ?? post.data.image,
          ...previousImages,
        ],
      },
    };
  } catch (error) {
    console.error("Error while generating metadata for blog post", error);
    return {
      title: "Blog post not found",
      description: "The blog post you are looking for does not exist",
    };
  }
}

const page = ({ params: { slug } }: Props) => {
  let content, data;

  try {
    ({ content, data } = getPost(slug));
  } catch (error) {
    console.error("Error loading post:", error);
  }

  if (!content || !data) {
    return (
      <div className="custom-container flex h-80 min-h-screen flex-col items-center justify-center">
        <h4 className="text-xl font-semibold tracking-tight">
          Oops, we can&apos;t find this post!
        </h4>
      </div>
    );
  }

  return (
    <section className="mb-60 mt-40 min-h-screen">
      <div className="custom-container max-w-[816px]">
        {/* CATEGORY */}
        {data.category && <CategoryLink category={data.category} />}

        {/* TITLE */}
        <h1 className="mt-2 text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
          {data.title}
        </h1>

        {/* TAGS */}
        {data.tags && data.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {data.tags.map((tag) => (
              <TagPill key={tag} text={tag} />
            ))}
          </div>
        )}

        <div
          className={`flex items-center gap-4 ${
            data.tags && data.tags.length > 0 ? "mt-8" : "mt-4"
          }`}
        >
          <div className="flex flex-col items-start gap-1 text-foreground opacity-70 sm:flex-row sm:items-center sm:gap-2">
            <div className="flex items-center gap-2">
              {/* DATE */}
              <p>
                {new Date(data.createdAt).getFullYear() ===
                new Date().getFullYear()
                  ? new Date(data.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  : new Date(data.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
              </p>

              {/* READING TIME */}
              {data.readingTime && (
                <>
                  <div className="size-0.5 rounded-full bg-black" />
                  <p>{data.readingTime} min read</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <Image
          src={data.image}
          alt={data.title}
          width={100}
          height={100}
          sizes="100vw"
          className="mt-10 h-auto max-h-[500px] w-full rounded-sm object-cover"
        />
      </div>

      {/* MDX CONTENT */}
      <article className="custom-container prose mt-10 max-w-[816px] lg:prose-xl">
        <MDXRemote
          source={content}
          components={MDXComponents({ customComponents })}
          options={options as any}
        />
      </article>
    </section>
  );
};

export default page;
