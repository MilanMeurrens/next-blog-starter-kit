import Link from "next/link";
import React from "react";

type Props = {
  text: string;
  selected: boolean;
  href: string;
};

/**
 * A button link to a category.
 */
const CategoryButton = (props: Props) => {
  const { text, selected, href } = props;

  return (
    <Link
      href={href}
      className={`rounded-full px-6 py-2 text-base font-normal leading-6 transition-all hover:cursor-pointer ${
        selected
          ? "bg-black text-white"
          : "border border-gray-300 bg-transparent text-foreground hover:border-foreground"
      }`}
    >
      {text}
    </Link>
  );
};

export default CategoryButton;
