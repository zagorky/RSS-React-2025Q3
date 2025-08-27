type HeaderProps = {
  additionalColumns: string[];
};

export const TableHeader = ({ additionalColumns }: HeaderProps) => (
  <thead className="bg-gray-50">
    <tr>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Country</th>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">ISO Code</th>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Year</th>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Population</th>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">CO2</th>
      <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">CO2 per Capita</th>
      {additionalColumns.map((column) => (
        <th key={column} className="border border-gray-200 px-4 py-3 text-left text-sm font-medium capitalize">
          {column.replaceAll('_', ' ')}
        </th>
      ))}
    </tr>
  </thead>
);