import { CountriesDataSchema } from '~types/types';

// TODO поменять на настоящий эндпоинт
// const url = 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';
const url = 'src/api/owid-co2-data.json';

const dataPromise = fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  })
  .then((json) => {
    const result = CountriesDataSchema.safeParse(json);

    if (!result.success) {
      throw new Error(`Validation Error: ${result.error.message}`);
    }

    return result.data;
  });

export const stablePromise = () => dataPromise;