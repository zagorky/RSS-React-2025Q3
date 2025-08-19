import { create } from 'zustand';

type CountryStoreType = {
  countries: string[];
};

export const useCountryStore = create<CountryStoreType>()(() => ({
  countries: [
    'Argentina',
    'Argentina',
    'Belarus',
    'Brazil',
    'Canada',
    'China',
    'Egypt',
    'France',
    'Germany',
    'India',
    'Italy',
    'Japan',
    'South Korea',
    'Mexico',
    'Poland',
    'Russia',
    'Spain',
    'South Africa',
    'Sweden',
    'Switzerland',
    'Ukraine',
    'United Kingdom',
    'United States',
  ],
}));