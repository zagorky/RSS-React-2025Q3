export type ApiResponseType = {
  data: DataItem[];
  pagination: PaginationType;
};

export type DataItem = {
  mal_id: 0;
  url: string;
  images: { jpg: ImageType; webp: ImageType };
  title: string;
  type: Type;
  synopsis: string;
  genres: GenresType[];
};

export type Type =
  | 'tv'
  | 'movie'
  | 'ova'
  | 'special'
  | 'ona'
  | 'music'
  | 'cm'
  | 'pv'
  | 'tv_special';

export type ImageType = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

export type GenresType = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

export type PaginationType = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: PaginationItem;
};

export type PaginationItem = {
  count: number;
  total: number;
  per_page: number;
};
