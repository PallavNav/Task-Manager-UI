import { useState } from "react";

type TaskFilterProps = {
  onFilterChange: (filters: { status: string; priority: string }) => void;
};

const TaskFilter = ({ onFilterChange }: TaskFilterProps) => {
  const [filters, setFilters] = useState({ status: "", priority: "" });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="filter_style">
      <label className="label_pd field-label">Status:</label>
      <select name="status" value={filters.status} onChange={handleChange}>
        <option value="">All</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <label className="label_pd field-label">Priority:</label>
      <select name="priority" value={filters.priority} onChange={handleChange}>
        <option value="">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;
