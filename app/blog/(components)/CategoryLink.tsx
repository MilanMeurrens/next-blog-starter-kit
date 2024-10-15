import Link from "next/link";
import React from "react";

type Props = {
  category: string;
  className?: string;
};

/**
 * A link to a category. This is used to filter posts by category.
 */
const CategoryLink = ({ category, className }: Props) => {
  return (
    <Link href={`/blog/category/${category}`}>
      <p className={`font-light opacity-70 hover:text-blue-500 ${className}`}>
        {category}
      </p>
    </Link>
  );
};

export default CategoryLink;
