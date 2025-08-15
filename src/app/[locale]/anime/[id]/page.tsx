import { fetchAnimeDataItem } from '~lib/api';
import { DetailedPage } from '~ui/detail-page/detailed-page';

const DetailPage = async (
  props: Readonly<{
    params: Promise<{ id: string; locale: string }>;
    searchParams?: Promise<{ query?: string; page?: string }>;
  }>
) => {
  const { id } = await props.params;
  const data = await fetchAnimeDataItem({ id });

  return <DetailedPage data={data} />;
};

export default DetailPage;