import type { DataItem } from '~types/types';

export const generateCSV = (data: DataItem[]) => {
  const headers = 'mal_id,title';
  const rows = data.map(
    (item) => `"${item.mal_id}","${item.title.replace('"', '""')}"`
  );
  return [headers, ...rows].join('\n');
};