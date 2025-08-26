import { use } from 'react';

import { stablePromise } from '~/api/api';

const formatNumber = (value: number | undefined): string => {
  if (value === undefined) {
    return 'N/A';
  }
  if (value === 0) {
    return '0';
  }

  if (Math.abs(value) < 0.01) {
    return value.toExponential(2);
  }

  if (Math.abs(value) > 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  }

  return value.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

export const Table = () => {
  const data = use(stablePromise());

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-center text-2xl font-bold">Climate Data Overview</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Country</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">ISO Code</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Year</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Population</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">CO2</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">CO2 per Capita</th>
              <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium">Cement CO2</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {Object.entries(data).map(([countryName, countryData]) =>
              countryData.data.map((yearData) => (
                <tr key={`${countryName}-${yearData.year}`} className="hover:bg-gray-50">
                  <td className="border border-gray-200 px-4 py-2 text-sm font-medium">{countryName}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{countryData.iso_code || 'N/A'}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{yearData.year}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{formatNumber(yearData.population)}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{formatNumber(yearData.co2)}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{formatNumber(yearData.co2_per_capita)}</td>
                  <td className="border border-gray-200 px-4 py-2 text-sm">{formatNumber(yearData.cement_co2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};