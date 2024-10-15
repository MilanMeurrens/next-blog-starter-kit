import React from "react";
import BlogPostsGrid from "../../(components)/BlogPostsGrid";
import {
  getPostCategories,
  getPostsMetadata,
} from "../../(services)/blogPostService";
import CategoryButtons from "../../(components)/CategoryButtons";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const category = decodeURIComponent(params.slug);
    const seoData = categorySEOData.find((data) => data.category === category);

    // If no SEO data is found, return default data
    if (!seoData) {
      return {
        title: "Blogposts about " + category,
        description:
          "This is a general description that applies to all categories.",
      };
    }

    return {
      title: seoData.title,
      description: seoData.description,
    };
  } catch (error) {
    console.error("Error while generating metadata for category page", error);
    return {
      title: "Category not found",
      description: "The category you are looking for does not exist",
    };
  }
}

const page = (props: Props) => {
  const { slug } = props.params;
  const selectedCategory = decodeURIComponent(slug);
  const posts = getPostsMetadata({ category: selectedCategory });
  const categories = getPostCategories();

  return (
    <section className="custom-container mb-40 mt-24 min-h-screen">
      <h1 className="text-center text-6xl font-bold">Next Blog Starter Kit</h1>
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        className="mt-24"
      />
      <BlogPostsGrid posts={posts} className="mt-10" />
    </section>
  );
};

export default page;

// Optionally add some SEO data for each category
const categorySEOData = [
  {
    category: "Category 1",
    title: "Category 1 SEO Title",
    description: "Category 1 SEO Description",
  },
  {
    category: "Category 2",
    title: "Category 2 SEO Title",
    description: "Category 2 SEO Description",
  },
];
