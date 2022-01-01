import { useMutation, useQuery } from 'react-query';
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

type QueryOptions = {
  limit: number;
  skip: number;
};

export const useEntries = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  const url = new URL(
    `${BASE_URL}/spaces/${space}/environments/${environment}/entries`,
  );

  url.searchParams;

  return useQuery<Response, Error>(
    ['entries', space, environment, selected],
    async () => {
      try {
        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${selected?.content}`,
          },
        });

        return response.json();
      } catch (error) {
        return error;
      }
    },
    { enabled: !!space && !!environment && !!selected },
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
