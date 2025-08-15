import type { DataItem } from '~types/types';

import { DetailedPage } from '~ui/detail-page/detailed-page';

const Modal = ({ data }: { data: DataItem }) => {
  return (
    <div className="fixed top-0 right-0 z-50 m-5 overflow-hidden">
      <section className="max-h-screen w-full max-w-[500px] justify-items-center overflow-y-auto">
        <DetailedPage data={data} />
      </section>
    </div>
  );
};

export default Modal;
