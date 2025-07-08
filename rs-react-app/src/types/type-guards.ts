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

const isDataItem = (data: unknown): data is DataItem =>
  isObject(data) &&
  'mal_id' in data &&
  isNumber(data.mal_id) &&
  'title' in data &&
  isString(data.title) &&
  'images' in data &&
  isObject(data.images) &&
  'jpg' in data.images &&
  isImageType(data.images.jpg) &&
  'genres' in data &&
  isArray(data.genres, isGenresType);

const isPaginationType = (data: unknown): data is PaginationType =>
  isObject(data) && 'has_next_page' in data && isBoolean(data.has_next_page);

export const isResponseType = (data: unknown): data is ApiResponseType =>
  isObject(data) &&
  'data' in data &&
  isArray(data.data, isDataItem) &&
  'pagination' in data &&
  isPaginationType(data.pagination);
