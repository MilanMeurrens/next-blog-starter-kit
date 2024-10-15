# Next Blog Starter Kit
This repo is an easy to use starting point for your blogs using Next.js, Tailwind CSS and MDX to create a blog with tags and categories.

[-> Try Live Demo](https://next-blog-starter-kit-woad.vercel.app/blog)

<img width="1156" alt="Next Blog Starter Kit Preview" src="https://github.com/user-attachments/assets/acedc676-7e72-4d69-9839-695f6825f6f2">

## Key Features:

1. **Static MDX Development**: Using static MDX files makes it easy to start your blog without connecting to third party API's, CDN's or a database. This approach is ideal for simple applications.
2. **Rich Metadata with Front Matter**: Use the front matter in your MDX files to store essential post metadata. From tags and categories to author information and descriptions, it can be easily parsed using the gray-matter package.
3. **Stylish Typography with Tailwind CSS**: Apply some default styling to your blog using the Tailwind CSS Typography plugin, making it look like great instantly.
4. **Code Highlighting**: Use the Rehype Highlight plugin to add syntax highlighting to your code snippets in your desired style.
5. **SEO Optimized**: Implement some Next.js SEO best practices to make your blog more discoverable.

Combining these elements creates a great starting point for your blog that's easy to customize and reuse in all your projects.

## How to use

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

Or use the VSCode debugger to run the development server, configured in the `.vscode/launch.json` file.

## How to integrate with your own project

1. Copy the entire `app/blog` folder to your project
2. Install all packeges
   ```bash
      npm install gray-matter @next/mdx @mdx-js/loader @mdx-js/react @types/mdx next-mdx-remote rehype-highlight remark-gfm

      npm install -D @tailwindcss/typography
   ```
3. Copy the mdx-components.tsx file to the root of your project (same level as the `app` folder)
4. Edit the next.config.js file to look like this:
   ```js
      import createMDX from "@next/mdx";

      /** @type {import('next').NextConfig} */
      const nextConfig = {
        pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
      };

      const withMDX = createMDX({
        // Add markdown plugins here, as desired
      });

      // Merge MDX config with Next.js config
      export default withMDX(nextConfig);
   ```
5. Add the Tailwind CSS Typography plugin to your `tailwind.config.js` file
   ```js
      /** @type {import('tailwindcss').Config} */
      module.exports = {
        theme: {
          // ...
        },
        plugins: [
          require('@tailwindcss/typography'),
          // ...
        ],
      }
   ```
6. Copy the `public/blog` folder to your project. This is where all the images for your blog posts will be stored.
7. Ready to go!

**Important:** Make sure the slug in the MDX file is the same as the file name!
