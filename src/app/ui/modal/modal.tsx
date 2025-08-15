'use client';

import type {DataItem} from '~types/types';

import {DetailedPage} from '~ui/detail-page/detailed-page';

const Modal = ({ data }: { data: DataItem }) => {
  return <DetailedPage data={data} />;
};

export default Modal;