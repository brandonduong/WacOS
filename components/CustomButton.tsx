import clsx from "clsx";

interface Props {
  handleClick: (() => void) | ((e: React.MouseEvent) => void);
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
    <div className="text-cpurple">
      <button
        className={clsx(
          className,
          "p-1 border-2 hover:bg-fuchsia-100 capitalize flex items-center",
          {
            "border-t-cpurple border-l-cpurple border-b-white border-r-white":
              clicked,
          },
          {
            "border-b-cpurple border-r-cpurple border-t-white border-l-white":
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
