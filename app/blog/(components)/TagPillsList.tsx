import React from "react";
import TagPill from "./TagPill";

type Props = {
  tags: string[];
  max?: number;
};

/**
 * A wrapped list of tag pills. When there are more than [max] tags, the extra tags are hidden.
 */
const TagPillsList = ({ tags, max = 3 }: Props) => {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2">
      {tags.slice(0, max).map((tag) => (
        <TagPill key={tag} text={tag} />
      ))}
      {tags.length > max && <TagPill text={`+${tags.length - max}`} />}
    </div>
  );
};

export default TagPillsList;
