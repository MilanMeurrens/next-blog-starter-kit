import { MetadataRoute } from "next";
import {
  getPostCategories,
  getPostsMetadata,
} from "./blog/(services)/blogPostService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://yourdomain.com";

  const blogPosts = getPostsMetadata();
  const blogCategories = getPostCategories();

  const blogPostsPaths = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.createdAt),
  }));

  const blogCategoriesPaths = blogCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },

    // Blog posts
    ...blogPostsPaths,

    // Blog categories
    ...blogCategoriesPaths,
  ];
}
