import '@testing-library/jest-dom';
import { getSearchEndpoint } from '~api/api';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { emptyQueryResponse } from '~/mocks/data';

vi.mock('zustand');

export const handlers = [
  http.get(getSearchEndpoint(), () => {
    return HttpResponse.json({ data: emptyQueryResponse });
  }),
];

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
