import { LS_KEY } from '../config/app-config';

export const retrieveQueryFormLS = () => {
  return localStorage.getItem(LS_KEY) ?? '';
};

export const setQueryToLS = (value: string) => {
  localStorage.setItem(LS_KEY, value);
};
