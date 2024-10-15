import React from "react";
import CategoryButton from "./CategoryButton";

type Props = {
  categories?: string[];
  selectedCategory?: string | undefined;
  className?: string;
};

/**
 * All category buttons, used to filter posts by category.
 * If no selectedCategory is provided, the "All" button will be selected.
 */
const CategoryButtons = (props: Props) => {
  const { categories = [], selectedCategory, className } = props;

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <CategoryButton
        key="all"
        text="All"
        selected={selectedCategory === undefined}
        href="/blog"
      />
      {categories.map((category) => (
        <CategoryButton
          key={category}
          text={category}
          selected={selectedCategory === category}
          href={`/blog/category/${category}`}
        />
      ))}
    </div>
  );
};

export default CategoryButtons;
