import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';

const BASE_URL = 'https://api.contentful.com';

type Response = {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: {
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
      publishedVersion: 10;
      publishedAt: string;
      firstPublishedAt: string;
      createdBy: {
        sys: Link;
      };
      updatedBy: {
        sys: Link;
      };
      publishedCounter: 3;
      version: 11;
      publishedBy: {
        sys: Link;
      };
    };
    fields: {
      title: {
        'en-US': string;
      };
      file: {
        'en-US': {
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
  }[];
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
          `${BASE_URL}/spaces/${space}/environments/${environment}/assets?limit=5`,
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
