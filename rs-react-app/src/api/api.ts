import { apiEndpoints, apiUrl } from '../config/app-config';

const getUrl = (query?: string) => {
  return query
    ? `${apiUrl}/${apiEndpoints.anime}?q=${query.trim()}`
    : `${apiUrl}/${apiEndpoints.anime}`;
};

export const fetchRequest = async (query?: string) => {
  const url = getUrl(query);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Fetch error: ${response.statusText}`);
  }

  return response.json();
};
