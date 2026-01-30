import { SquarePen } from "lucide-react";

type EditButtonProp = {
  onClick: () => void;
};

export function EditButton({ onClick }: EditButtonProp) {
  return (
    <button
      className="bg-red-300 w-20 h-10 flex justify-center items-center rounded-4xl hover:bg-red-400"
      onClick={onClick}
    >
      <SquarePen className="text-white" />
    </button>
  );
}
