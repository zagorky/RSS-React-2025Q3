import { withDataTestId } from '~utils/utilities';

export const EmptyList = () => {
  return (
    <div {...withDataTestId('empty-list')} className="basic-content-wrapper">
      <h2 className="h2">No matching</h2>
      <p>Try another search query</p>
    </div>
  );
};