import { Button } from '~components/button/button';
import { downloadCsv } from '~utils/csv-helpers';
import { useRef } from 'react';

import { useStore } from '~/store/store';

export const Flyout = () => {
  const selectedCards = useStore((state) => state.selectedCards);
  const linkReference = useRef<HTMLAnchorElement>(null);

  const handleDownloadCsv = () => {
    downloadCsv(selectedCards, linkReference.current);
  };

  return (
    selectedCards.length > 0 && (
      <div className="bg-bg border-border-primary text-text-primary mt-2rounded-xl absolute bottom-4 left-6 rounded-xl border-3 p-2">
        <h3 className="result-item-title text-center">
          Selected cards: {selectedCards.length}
        </h3>
        <div className="flex gap-4">
          <Button onClick={handleDownloadCsv} className="cursor-pointer">
            <a ref={linkReference} className="hidden">
              Download link
            </a>
            Download
          </Button>
          <Button className="cursor-pointer">Unselect all</Button>
        </div>
      </div>
    )
  );
};