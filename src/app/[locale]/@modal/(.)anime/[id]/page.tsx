import {fetchAnimeDataItem} from '~lib/api';
import {CloseButton} from '~ui/close-button/close-button';
import {DetailPageContent} from '~ui/detail-page/detail-page-content';
import {RefreshQueryButton} from '~ui/refresh-query-button/refresh-query-button';
import {XIcon} from 'lucide-react';

const DetailPage = async (
  props: Readonly<{
    params: Promise<{ id: string; locale: string }>;
    searchParams?: Promise<{ query?: string; page?: string }>;
  }>
) => {
  const { id } = await props.params;
  const data = await fetchAnimeDataItem({ id });

  return (
    <div className="fixed top-0 right-0 m-5 overflow-hidden">
      <CloseButton
        variant="custom"
        classNames="loader-overlay cursor-pointer"
      />
      <section className="detailed-page-container max-h-screen justify-items-center overflow-y-auto">
        <div className="flex w-full items-center justify-between gap-2">
          <CloseButton variant="outline">
            <XIcon className="text-error h-4.5" />
          </CloseButton>
          <RefreshQueryButton />
        </div>
        <div>
          <DetailPageContent data={data} />
        </div>
      </section>
    </div>
  );
};

export default DetailPage;