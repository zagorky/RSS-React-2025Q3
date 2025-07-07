import type {
  ApiResponseType,
  DataItem,
  GenresType,
  ImageType,
  PaginationType,
} from '~types/types';

const isImageType = (data: unknown): data is ImageType =>
  typeof data === 'object' &&
  data !== null &&
  'image_url' in data &&
  typeof data.image_url === 'string';

const isGenresType = (data: unknown): data is GenresType =>
  typeof data === 'object' &&
  data !== null &&
  'name' in data &&
  typeof data.name === 'string';

const isDataItem = (data: unknown): data is DataItem =>
  typeof data === 'object' &&
  data !== null &&
  'mal_id' in data &&
  typeof data.mal_id === 'number' &&
  'title' in data &&
  typeof data.title === 'string' &&
  'images' in data &&
  typeof data.images === 'object' &&
  data.images !== null &&
  'jpg' in data.images &&
  isImageType(data.images.jpg) &&
  'genres' in data &&
  Array.isArray(data.genres) &&
  data.genres.every(isGenresType);

const isPaginationType = (data: unknown): data is PaginationType =>
  typeof data === 'object' &&
  data !== null &&
  'has_next_page' in data &&
  typeof data.has_next_page === 'boolean';

export const isResponseType = (data: unknown): data is ApiResponseType =>
  typeof data === 'object' &&
  data !== null &&
  'data' in data &&
  Array.isArray(data.data) &&
  data.data.every(isDataItem) &&
  'pagination' in data &&
  isPaginationType(data.pagination);
