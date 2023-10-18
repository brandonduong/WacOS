import clsx from "clsx";

interface Props {
  author: string;
  message: string;
  subject: string;
  opened: boolean;
  selected: boolean;
  handleClick: () => void;
}

export default function EmailButton({
  author,
  message,
  subject,
  opened,
  selected,
  handleClick,
}: Props) {
  return (
    <div
      className={clsx(
        "p-2 bg-fuchsia-200 border-2 flex flex-col",
        {
          "border-cpurple": selected,
        },
        { "border-purple-300": !selected }
      )}
      onClick={handleClick}
    >
      <div className="grid grid-cols-3">
        <span className="text-slate-400">{author}</span>
        <span className="truncate col-span-2 text-end text-ccyan">
          {subject}
        </span>
      </div>
      <div className="truncate text-cpurple">
        <span>{message}</span>
      </div>
    </div>
  );
}
