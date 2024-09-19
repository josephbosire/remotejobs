import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <section>
      <button onClick={() => toggleOpen()} className="bookmarks-btn">
        Bookmarks <TriangleDownIcon />
      </button>
      {isOpen && <BookmarksPopover />}
    </section>
  );
}
