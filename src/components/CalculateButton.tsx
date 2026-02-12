interface CalculateButtonProps {
  onClick: () => void
}

export default function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      Calculate
    </button>
  )
}
