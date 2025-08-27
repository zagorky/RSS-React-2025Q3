import { z } from 'zod';

const YearlyDataSchema = z.object({
  year: z.number(),
  population: z.number().optional(),
  co2: z.number().optional(),
  co2_per_capita: z.number().optional(),
  cement_co2: z.number().optional(),
  cement_co2_per_capita: z.number().optional(),
  cumulative_cement_co2: z.number().optional(),
  methane: z.number().optional(),
  methane_per_capita: z.number().optional(),
  nitrous_oxide: z.number().optional(),
  nitrous_oxide_per_capita: z.number().optional(),
});

const CountryDataSchema = z.object({
  iso_code: z.string().optional(),
  data: z.array(YearlyDataSchema),
});

export const CountriesDataSchema = z.record(z.string(), CountryDataSchema);

export type CountriesDataType = z.infer<typeof CountriesDataSchema>;

export const allExtraFields = [
  'cement_co2',
  'cement_co2_per_capita',
  'cumulative_cement_co2',
  'methane',
  'methane_per_capita',
  'nitrous_oxide_per_capita',
  'nitrous_oxide',
] as const;

export type ExtraFieldType = (typeof allExtraFields)[number];