import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://yourdomain.com"),
  title: {
    default: "My Blog",
    template: "%s | My Blog",
  },
  description:
    "This is a placeholder description for a blog. It should be a short summary of the post.",

  // For sharing on socials
  openGraph: {
    description:
      "This is a placeholder description for a blog. It should be a short summary of the post.",
    images: ["/public/blog/placeholder.webp"],
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
