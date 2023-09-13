import clsx from "clsx";

interface Props {
  handleClick: () => void;
  title: string | React.ReactNode;
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
    <div className="mr-2 text-purple">
      <button
        className={clsx(
          className,
          "p-1 border-2 hover:bg-fuchsia-100 capitalize flex items-center",
          {
            "border-t-purple border-l-purple border-b-white border-r-white":
              clicked,
          },
          {
            "border-b-purple border-r-purple border-t-white border-l-white":
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
