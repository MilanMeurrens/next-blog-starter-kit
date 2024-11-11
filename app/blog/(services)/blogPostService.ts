import matter from "gray-matter";
import fs from "fs"; // WARNING: fs is only available on the server, not in the browser envorionment
import path from "path";

// TODO: Change this to the actual path
const postsFolder = "app/blog/(posts)/";

export interface BlogPost {
  title: string;
  createdAt: Date;
  readingTime?: number;
  category?: string;
  tags?: string[];
  description?: string;
  slug: string;
  image: string;
  imageThumbnail?: string;
}

export function matterDataToBlogPost(matterData: {
  [key: string]: any;
}): BlogPost {
  return {
    title: matterData.title,
    createdAt: new Date(matterData.createdAt),
    readingTime: matterData.readingTime,
    category: matterData.category,
    tags: matterData.tags,
    description: matterData.description,
    slug: matterData.slug,
    image: matterData.image,
    imageThumbnail: matterData.imageThumbnail,
  } as BlogPost;
}

/**
 * Returns the metadata of all blog posts. It doesn't read the content of the post.
 * If category and tags are provided, it will filter the posts by the provided category and tags.
 */
export const getPostsMetadata = ({
  category,
  tags,
}: {
  category?: string;
  tags?: string[];
} = {}): BlogPost[] => {
  const folder = postsFolder;
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter((file) => file.endsWith(".mdx"));

  const posts = markdownPosts.map((fileNames) => {
    const source = fs.readFileSync(`${folder}/${fileNames}`, "utf8");
    const { data } = matter(source);
    return matterDataToBlogPost(data);
  });

  const filteredPosts = posts.filter((post) => {
    if (category && post.category !== category) {
      return false;
    }
    if (tags && !tags.some((tag) => post.tags?.includes(tag))) {
      return false;
    }
    return true;
  });

  return filteredPosts;
};

/**
 * Returns all unique categories from the blog posts.
 */
export const getPostCategories = (): string[] => {
  const posts = getPostsMetadata();
  const allCategories = posts
    .map((post) => post.category)
    .filter((category): category is string => !!category);
  const uniqueCategories = Array.from(new Set(allCategories));

  return uniqueCategories;
};

/**
 * Returns all unique tags from the blog posts.
 */
export const getPostTags = (): string[] => {
  const posts = getPostsMetadata();
  const allTags = posts.flatMap((post) => post.tags ?? []);
  const uniqueTags = Array.from(new Set(allTags));

  return uniqueTags;
};

/**
 * Returns the content and metadata of a blog post by slug.
 */
export const getPost = (slug: string): { content: string; data: BlogPost } => {
  const filePath = path.join(process.cwd(), postsFolder, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: with slug ${slug} at path ${filePath}`);
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);
  return { content, data: matterDataToBlogPost(data) };
};
