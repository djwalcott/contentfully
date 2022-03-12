import { renderHook } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { server } from '../../setupTests';
import { createWrapper } from '../../testing/query-wrapper';
import { useEntry } from '../entry';

describe('useEntry hook', () => {
  test('returns data in correct format', async () => {
    const { result, waitFor } = renderHook(() => useEntry('entry1234'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isSuccess);

    expect(result.current.data).toEqual({
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
    });
  });

  test('returns error on error', async () => {
    server.use(
      rest.get('*', (req, res, ctx) => {
        return res(ctx.status(500));
      }),
    );

    const { result, waitFor } = renderHook(() => useEntry('entry1234'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => result.current.isError);

    expect(result.current.error).toBeDefined();
  });
});
