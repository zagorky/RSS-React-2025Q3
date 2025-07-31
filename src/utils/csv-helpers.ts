import type { DataItem } from '~types/types';

const generateCSV = (data: DataItem[]) => {
  const headers = 'mal_id,title';
  const rows = data.map(
    (item) => `"${item.mal_id}","${item.title.replace('"', '""')}"`
  );
  return [headers, ...rows].join('\n');
};

export const downloadCsv = (
  data: DataItem[],
  linkReference: HTMLAnchorElement | null
) => {
  if (!linkReference) {
    return;
  }

  const csvData = generateCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  linkReference.href = url;
  linkReference.download = 'zagorky-selected-cards.csv';
  linkReference.click();
  setTimeout(() => URL.revokeObjectURL(url), 100);
};