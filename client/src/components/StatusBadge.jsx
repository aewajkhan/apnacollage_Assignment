export default function StatusBadge({ completed }) {
  return (
    <span className={`text-xs px-2 py-1 rounded 
      ${completed ? "bg-green-500" : "bg-red-500"} text-white`}>
      {completed ? "Completed" : "Pending"}
    </span>
  );
}
