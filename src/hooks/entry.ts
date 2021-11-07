import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';

const BASE_URL = 'https://api.contentful.com';

export type Entry = {
  metadata: {
    tags: [];
  };
  fields: {
    [key: string]: {
      [locale: string]: unknown;
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
    publishedVersion: 63;
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

export const useEntries = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Response, Error>(
    ['entries', space, environment, selected],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/entries`,
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
    { enabled: !!space && !!environment && !!selected },
  );
};
