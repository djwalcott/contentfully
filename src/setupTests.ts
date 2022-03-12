import { setupServer } from 'msw/node';
import { setLogger } from 'react-query';
import { rest } from 'msw';
import 'cross-fetch/polyfill';

export const handlers = [
  rest.get(
    '*/spaces/test/environments/test/entries/entry1234',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          sys: {
            space: {
              sys: {
                id: 'sys-id',
              },
            },
            id: 'id',
          },
          fields: {
            field: {
              'en-US': 'Test lesson',
              'fi-FI': 'Test lesson.  ',
            },
            anotherField: {
              'en-US': 'test-lesson',
              'fi-FI': 'test-lesson',
            },
          },
        }),
      );
    },
  ),
];

export const server = setupServer(...handlers);

// Establish API mocking before all tests.
global.beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
global.afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
global.afterAll(() => server.close());

// silence react-query errors
setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});
