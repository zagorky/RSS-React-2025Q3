import type {
  ApiResponseType,
  DataItem,
  GenresType,
  ImageType,
  PaginationType,
} from '~types/types';

const isString = (data: unknown): data is string => {
  return typeof data === 'string';
};

const isNumber = (data: unknown): data is number => {
  return typeof data === 'number';
};

const isBoolean = (data: unknown): data is boolean => {
  return typeof data === 'boolean';
};

const isObject = (data: unknown): data is object => {
  return typeof data === 'object' && data !== null;
};

const isArray = <T>(
  data: unknown,
  itemGuard?: (item: unknown) => item is T
): data is T[] => {
  return Array.isArray(data) && (itemGuard ? data.every(itemGuard) : true);
};

const isImageType = (data: unknown): data is ImageType =>
  isObject(data) && 'image_url' in data && isString(data.image_url);

const isGenresType = (data: unknown): data is GenresType =>
  isObject(data) && 'name' in data && isString(data.name);

const hasProperty = <K extends string>(
  property: K,
  source: unknown
): source is {
  [key in K]: unknown;
} => {
  return typeof source === 'object' && source !== null && property in source;
};

const isDataItem = (data: unknown): data is DataItem =>
  isObject(data) &&
  hasProperty('mal_id', data) &&
  isNumber(data.mal_id) &&
  hasProperty('title', data) &&
  isString(data.title) &&
  hasProperty('images', data) &&
  isObject(data.images) &&
  hasProperty('jpg', data.images) &&
  isImageType(data.images.jpg) &&
  hasProperty('genres', data) &&
  isArray(data.genres, isGenresType);

const isPaginationType = (data: unknown): data is PaginationType =>
  isObject(data) && 'has_next_page' in data && isBoolean(data.has_next_page);

export const isResponseType = (data: unknown): data is ApiResponseType =>
  isObject(data) &&
  hasProperty('data', data) &&
  isArray(data.data, isDataItem) &&
  hasProperty('pagination', data) &&
  isPaginationType(data.pagination);
