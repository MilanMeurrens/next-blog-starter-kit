import React from "react";
import {
  getPostCategories,
  getPostsMetadata,
} from "./(services)/blogPostService";
import BlogPostsGrid from "./(components)/BlogPostsGrid";
import CategoryButtons from "./(components)/CategoryButtons";

type Props = {};

const page = (props: Props) => {
  const posts = getPostsMetadata();
  const categories = getPostCategories();

  return (
    <section className="custom-container mb-40 mt-24 min-h-screen">
      <h1 className="text-center text-6xl font-bold">Next Blog Starter Kit</h1>
      <CategoryButtons categories={categories} className="mt-24" />
      <BlogPostsGrid posts={posts} className="mt-10" />
    </section>
  );
};

export default page;
