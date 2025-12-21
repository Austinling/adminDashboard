export function AddStudentButton({ onClick }: { onClick: () => void }) {
  return (
    <div>
      <button
        onClick={onClick}
        className="flex items-center justify-center cursor-pointer gap-3 bg-[linear-gradient(90deg,rgba(242,128,128,1)_0%,rgba(247,230,230,1)_67%)] border-2 border-gray-400 text-white rounded-4xl p-3"
      >
        Add Student
      </button>
    </div>
  );
}
