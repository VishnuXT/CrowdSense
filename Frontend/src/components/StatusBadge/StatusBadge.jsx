import "./StatusBadge.css";

function StatusBadge({ status }) {
  const badgeClass = status.toLowerCase();

  return (
    <span className={`badge ${badgeClass}`}>
      {status}
    </span>
  );
}

export default StatusBadge;