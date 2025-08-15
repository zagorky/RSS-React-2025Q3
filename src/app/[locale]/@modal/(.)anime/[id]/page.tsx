import { fetchAnimeDataItem } from '~lib/api';
import Modal from '~ui/modal/modal';

const DetailPage = async (
  props: Readonly<{
    params: Promise<{ id: string; locale: string }>;
    searchParams?: Promise<{ query?: string; page?: string }>;
  }>
) => {
  const { id } = await props.params;
  const data = await fetchAnimeDataItem({ id });

  return <Modal data={data} />;
};

export default DetailPage;
