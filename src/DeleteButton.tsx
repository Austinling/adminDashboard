type deleteClick = {
  onClick: () => void;
  isOn: boolean;
};

export function DeleteButton({ onClick, isOn }: deleteClick) {
  return (
    <button
      className="flex items-center justify-center cursor-pointer gap-3 bg-red-500 border-2 border-gray-400 text-white rounded-4xl p-3"
      onClick={onClick}
    >
      {isOn ? "Delete" : "Edit"}
    </button>
  );
}
