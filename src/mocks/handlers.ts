import { getSearchEndpoint } from '~api/api';
import {
  apiEndpoints,
  apiUrl,
  endpointParameters,
  queryVariants,
} from '~config/app-config';
import { http, HttpResponse } from 'msw';

import {
  getEmptyQueryResponse,
  getEmptyResponse,
  getSpecificQueryResponse,
} from '~/mocks/data';

export const handlers = [
  http.get(getSearchEndpoint(), ({ request }) => {
    const search = new URL(request.url).searchParams.get(
      endpointParameters.search
    );

    if (!search) {
      return HttpResponse.json({ data: getEmptyQueryResponse() });
    }

    if (search === queryVariants.notFound) {
      return HttpResponse.json({ data: getEmptyResponse() });
    }

    if (search === queryVariants.specific) {
      return HttpResponse.json({ data: getSpecificQueryResponse() });
    }

    return HttpResponse.json({ data: getEmptyQueryResponse() });
  }),

  http.get(`${apiUrl}/${apiEndpoints.badRequest}`, () => {
    return new HttpResponse(null, { status: 400 });
  }),
];
