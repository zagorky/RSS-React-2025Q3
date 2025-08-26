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
  iso_code: z.string(),
  data: z.array(YearlyDataSchema),
});

export const CountriesDataSchema = z.record(z.string(), CountryDataSchema);

export type YearlyDataType = z.infer<typeof YearlyDataSchema>;

export type CountryDataType = z.infer<typeof CountryDataSchema>;

export type CountriesDataType = z.infer<typeof CountriesDataSchema>;