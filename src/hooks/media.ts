import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';
import { LocaleCode } from '../typings/locale';

const BASE_URL = 'https://api.contentful.com';

export type Media = {
  metadata: {
    tags: [];
  };
  sys: {
    space: {
      sys: Link;
    };
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    environment: {
      sys: Link;
    };
    publishedVersion: number;
    publishedAt: string;
    firstPublishedAt: string;
    createdBy: {
      sys: Link;
    };
    updatedBy: {
      sys: Link;
    };
    publishedCounter: number;
    version: number;
    publishedBy: {
      sys: Link;
    };
  };
  fields: {
    title: {
      [key in LocaleCode]: string;
    };
    file: {
      [key in LocaleCode]: {
        url: string;
        details: {
          size: number;
          image: {
            width: number;
            height: number;
          };
        };
        fileName: string;
        contentType: string;
      };
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
  items: Media[];
};

export const useAssets = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Response, Error>(
    ['assets', space, selected],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/assets`,
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
    { enabled: !!space && !!selected },
  );
};

export const useAsset = (assetID?: string) => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Media, Error>(
    ['asset', space, selected, assetID],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/assets/${assetID}`,
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
    { enabled: !!space && !!selected && !!assetID },
  );
};
