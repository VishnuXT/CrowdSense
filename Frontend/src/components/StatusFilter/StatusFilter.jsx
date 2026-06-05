import "./StatusFilter.css";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

function StatusFilter({ value, onChange }) {
  return (
    <div className="status-filter" role="group" aria-label="Filter by status">
      <span className="status-filter-label">Status:</span>
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className={`status-filter-btn ${value === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default StatusFilter;
