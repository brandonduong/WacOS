import clsx from "clsx";

interface Props {
  handleClick: () => void;
  title: string;
  clicked: boolean;
  className: string;
}

export default function CustomButton({
  handleClick,
  title,
  clicked,
  className,
}: Props) {
  return (
    <div className="mr-2 text-indigo-600">
      <button
        className={clsx(
          className,
          "p-1 border-2 hover:bg-red-200 capitalize",
          {
            "border-t-indigo-600 border-l-indigo-600 border-b-white border-r-white":
              clicked,
          },
          {
            "border-b-indigo-600 border-r-indigo-600 border-t-white border-l-white":
              !clicked,
          }
        )}
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}
