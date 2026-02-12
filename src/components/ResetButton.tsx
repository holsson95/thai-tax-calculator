interface ResetButtonProps {
  onClick: () => void
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border px-4 py-2 rounded hover:bg-gray-100 transition-colors"
    >
      Reset
    </button>
  )
}
