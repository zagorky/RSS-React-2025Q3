import { navigation } from '~config/navigation';
import { redirect } from 'react-router';

export const searchAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const searchQuery = formData.get('search-input')?.toString() ?? '';
  const url = new URL(request.url);
  url.searchParams.set('q', searchQuery);
  url.searchParams.set('page', '1');

  return redirect(`${navigation.main}?${url.searchParams.toString()}`);
};
