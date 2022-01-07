import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';
import { LocaleCode } from '../typings/locale';

const BASE_URL = 'https://api.contentful.com';

type Field = string;
type FieldName = string;

export type Entry = {
  metadata: {
    tags: [];
  };
  fields: {
    [key in FieldName]: {
      [key in LocaleCode]: Field;
    };
  };
  sys: {
    space: {
      sys: Entry;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: Entry;
    };
    publishedVersion: number;
    publishedAt: string;
    firstPublishedAt: string;
    createdBy: {
      sys: Entry;
    };
    updatedBy: {
      sys: Entry;
    };
    publishedCounter: number;
    version: number;
    publishedBy: {
      sys: Entry;
    };
    contentType: {
      sys: Link;
    };
  };
};

type Response = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: Entry[];
};

type QueryParams = {
  type: 'limit' | 'skip' | 'order' | 'query';
  parameter?: string;
};

type QueryOptions = QueryParams[];

type Page = {
  pages: Response;
  skip: number;
  entries: Entry[];
};

export const useEntries = (queryOptions?: QueryOptions) => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  const url = new URL(
    `${BASE_URL}/spaces/${space}/environments/${environment}/entries?limit=25&skip=0`,
  );

  queryOptions?.forEach(({ type, parameter }) => {
    if (type && parameter) {
      url.searchParams.append(type, parameter);
    }
  });

  return useInfiniteQuery<Response, Error, Page>(
    ['entries', { space, environment, queryOptions }],
    async ({ pageParam = 0 }) => {
      url.searchParams.set('skip', `${pageParam}`);

      const response = await fetch(url.href, {
        headers: {
          Authorization: `Bearer ${selected?.content}`,
        },
      });

      return response.json();
    },
    {
      enabled: !!space && !!environment && !!selected,
      select: data => {
        const allPagesArray: Entry[][] = [];
        data?.pages?.forEach(entryArray =>
          allPagesArray.push(entryArray.items),
        );
        const flatEntries = allPagesArray.flat();
        return {
          pages: data.pages,
          pageParams: data.pageParams,
          entries: flatEntries,
        };
      },
      getNextPageParam: lastPage =>
        lastPage.skip + 25 < lastPage.total ? lastPage.skip + 25 : undefined,
    },
  );
};

export const useEntry = (entryID?: string) => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Entry, Error>(
    ['entry', space, environment, selected],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/entries/${entryID}`,
          {
            headers: {
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
    { enabled: !!space && !!environment && !!selected && !!entryID },
  );
};

export const useUnpublishEntry = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useMutation(
    async ({
      entryID,
      unpublish,
      version,
    }: {
      entryID: string;
      version: number;
      unpublish: boolean;
    }) => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/entries/${entryID}/published`,
          {
            method: unpublish ? 'DELETE' : 'PUT',
            headers: {
              'X-Contentful-Version': `${version}`,
              Authorization: `Bearer ${selected?.content}`,
            },
          },
        );

        return response.json();
      } catch (error) {
        return error;
      }
    },
  );
};
