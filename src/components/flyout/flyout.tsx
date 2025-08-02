import { Button } from '~components/button/button';
import { useCSV } from '~hooks/useCSV';
import { withDataTestId } from '~utils/utilities';

import { useStore } from '~/store/store';

export const Flyout = () => {
  const { selectedCards, cleanSelectedCards } = useStore();
  const { linkReference, downloadCSV } = useCSV(selectedCards);

  return (
    selectedCards.length > 0 && (
      <div
        {...withDataTestId('flyout')}
        className="bg-bg border-border-primary text-text-primary mt-2rounded-xl fixed bottom-6 left-6 rounded-xl border-3 p-2"
      >
        <h3 className="result-item-title text-center">
          Selected cards: {selectedCards.length}
        </h3>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={downloadCSV}
            classNames="cursor-pointer"
          >
            <a ref={linkReference} className="hidden">
              Download link
            </a>
            Download
          </Button>
          <Button
            onClick={cleanSelectedCards}
            variant="outline"
            classNames="cursor-pointer"
          >
            Unselect all
          </Button>
        </div>
      </div>
    )
  );
};