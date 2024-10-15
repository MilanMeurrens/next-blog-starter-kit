import Link from "next/link";
import React from "react";

type Props = {
  text: string;
};

/**
 * A pill for a tag. This is used to filter posts by tag.
 * The color of the pill is automatically determined by the text of the tag.
 */
const TagPill = ({ text }: Props) => {
  const index = hashCode(text) % colorPairs.length;
  const [textColor, backgroundColor] = colorPairs[index];

  return (
    <Link
      href={`/blog/tag/${text}`}
      className="inline-block rounded border-transparent px-3 py-1 text-base font-normal leading-6 hover:cursor-pointer hover:opacity-80"
      style={{
        color: textColor,
        backgroundColor,
      }}
    >
      {text}
    </Link>
  );
};

export default TagPill;

// Pre-defined list of color pairs (text color, background color)
const colorPairs = [
  ["#4a5568", "#e1f5fe"], // Blue
  ["#2f855a", "#e6fffa"], // Green
  ["#c53030", "#fff5f5"], // Red
  ["#b7791f", "#fffbeb"], // Yellow
  ["#6b46c1", "#f3e8ff"], // Purple
  ["#c05621", "#fff5eb"], // Orange
  ["#2c7a7b", "#e6fffa"], // Teal
  ["#b83280", "#fef6f9"], // Pink
  ["#0c8599", "#e3fafc"], // Cyan
  ["#b7791f", "#fffbeb"], // Amber
  ["#4c51bf", "#ebf4ff"], // Indigo
  ["#c53030", "#fff5f5"], // Rose
  ["#2f855a", "#e6fffa"], // Emerald
  ["#9c4221", "#fff5eb"], // Sienna
  ["#3182ce", "#ebf8ff"], // Royal Blue
  ["#2f855a", "#e6fffa"], // Forest Green
];

// Generate a hash code for the given string
// So we can get a consistent color for each tag, depending on the text
function hashCode(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}
