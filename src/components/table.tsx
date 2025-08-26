import type {CountriesDataType} from '~types/types';

type TableProps = {
  countries?: CountriesDataType;
};

export const Table = ({ countries }: TableProps) => {
  return <>{countries}</>;
};