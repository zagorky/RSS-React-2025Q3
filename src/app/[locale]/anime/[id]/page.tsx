import { fetchAnimeDataItem } from '~lib/api';
import { CloseButton } from '~ui/close-button/close-button';
import { DetailPageContent } from '~ui/detail-page/detail-page-content';
import { RefreshQueryButton } from '~ui/refresh-query-button/refresh-query-button';
import { Undo2 } from 'lucide-react';

const DetailPage = async (
  props: Readonly<{
    params: Promise<{ id: string; locale: string }>;
    searchParams?: Promise<{ query?: string; page?: string }>;
  }>
) => {
  const { id } = await props.params;
  const data = await fetchAnimeDataItem({ id });

  return (
    <div className="bg-bg text-text-primary border-border-dark hover:border-primary-700 m-auto flex max-w-4xl flex-col gap-4 p-10">
      <div className="flex justify-between">
        <CloseButton variant="default">
          <Undo2 aria-label="go back button" />
        </CloseButton>
        <RefreshQueryButton />
      </div>
      <DetailPageContent data={data} />
    </div>
  );
};

export default DetailPage;
