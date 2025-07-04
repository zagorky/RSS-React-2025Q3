export type ResponseType = {
  data: DataItem[];
  pagination: PaginationType;
};

export type DataItem = {
  mal_id: 0;
  url: string;
  images: { jpg: ImageType; webp: ImageType };
  trailer: TrailerType;
  approved: boolean;
  titles: TitleType[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: Type;
  source: string;
  episodes: 0;
  status: string;
  airing: true;
  duration: string;
  rating: Rating;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  genres: GenresType[];
};

type Rating =
  | 'G - All Ages'
  | 'PG - Children'
  | 'PG-13 - Teens 13 or older'
  | 'R - 17+ (violence & profanity)'
  | 'R+ - Mild Nudity'
  | 'Rx - Hentai';

type Type =
  | 'tv'
  | 'movie'
  | 'ova'
  | 'special'
  | 'ona'
  | 'music'
  | 'cm'
  | 'pv'
  | 'tv_special';

type ImageType = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type TrailerType = {
  youtube_id: string;
  url: string;
  embed_url: string;
};

type TitleType = {
  type: string;
  title: string;
};

type GenresType = {
  mal_id: number;
  type: string;
  name: string;
  url: string;
};

type PaginationType = {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: PaginationItem;
};

type PaginationItem = {
  count: number;
  total: number;
  per_page: number;
};
