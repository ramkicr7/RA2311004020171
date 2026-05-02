export default function Controls({ n, setN }) {
  return (
    <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-lg shadow">
      <span className="font-medium">Top Notifications</span>

      <select
        className="border px-3 py-1 rounded"
        value={n}
        onChange={(e) => setN(Number(e.target.value))}
      >
        <option value={5}>Top 5</option>
        <option value={10}>Top 10</option>
        <option value={15}>Top 15</option>
        <option value={20}>Top 20</option>
      </select>
    </div>
  );
}