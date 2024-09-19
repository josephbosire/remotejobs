import { TSortType } from "../lib/types";

type SortingControlsProps = {
  onClick: (sortyBy: TSortType) => void;
  sortBy: TSortType;
};

export default function SortingControls({
  sortBy,
  onClick,
}: SortingControlsProps) {
  return (
    <section className="sorting">
      <i className="fa-solid fa-arrow-down-short-wide"></i>

      <SortingButton
        onClick={() => {
          onClick("relevant");
        }}
        isActive={sortBy === "relevant"}
      >
        Relevant
      </SortingButton>
      <SortingButton
        onClick={() => {
          onClick("recent");
        }}
        isActive={sortBy === "recent"}
      >
        Recent
      </SortingButton>
    </section>
  );
}

type SortingButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
};
const SortingButton = ({ onClick, isActive, children }: SortingButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`sorting__button sorting__button--recent ${isActive ? "sorting__button--active" : ""}`}
    >
      {children}
    </button>
  );
};
