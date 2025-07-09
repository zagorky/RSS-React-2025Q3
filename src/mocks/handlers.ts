import { getSearchEndpoint } from '~api/api';
import { endpointParameters, queryVariants } from '~config/app-config';
import { http, HttpResponse } from 'msw';

import {
  getEmptyQueryResponse,
  getEmptyResponse,
  getSpecificQueryResponse,
} from '~/mocks/data';

export const handlers = [
  http.get(getSearchEndpoint(), ({ request }) => {
    const query = new URL(request.url).searchParams.get(
      endpointParameters.search
    );

    if (query === queryVariants.notFound) {
      return HttpResponse.json({ data: getEmptyResponse() });
    }

    if (query === queryVariants.empty) {
      return HttpResponse.json({ data: getEmptyQueryResponse() });
    }

    if (query === queryVariants.specific) {
      return HttpResponse.json({ data: getSpecificQueryResponse() });
    }
  }),
];
