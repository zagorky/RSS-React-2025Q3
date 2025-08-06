import { isString } from '~types/type-guards';

const themes = ['dark', 'light', 'system'] as const;

export const isTheme = (value: unknown): value is Theme => {
  return isString(value)
    ? themes.some((theme): theme is Theme => theme === value)
    : false;
};

export type Theme = (typeof themes)[number];