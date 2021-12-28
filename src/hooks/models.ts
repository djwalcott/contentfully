import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';

const BASE_URL = 'https://api.contentful.com';

export type FieldType =
  | 'Symbol'
  | 'Array'
  | 'Text'
  | 'RichText'
  | 'Number'
  | 'Integer'
  | 'Boolean'
  | 'Date'
  | 'Location'
  | 'Object'
  | 'Link';

export type Model = {
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
  displayField: string;
  name: string;
  description: string;
  fields: [
    {
      id: string;
      name: string;
      type: FieldType;
      localized: boolean;
      required: boolean;
      validations: [
        {
          unique: boolean;
        },
        {
          regexp: {
            pattern: '^[a-zA-Z0-9-&+_\\s]*$';
            flags: null;
          };
          message: 'Only letters, numbers, spaces and the character _';
        },
      ];
      disabled: boolean;
      omitted: boolean;
    },
    {
      id: string;
      name: string;
      type: FieldType;
      localized: boolean;
      required: boolean;
      validations: [];
      disabled: boolean;
      omitted: boolean;
    },
    {
      id: string;
      name: string;
      type: FieldType;
      localized: boolean;
      required: boolean;
      validations: [];
      disabled: boolean;
      omitted: boolean;
    },
  ];
};

type Response = {
  sys?: {
    type?: 'Array';
  };
  total?: number;
  skip?: number;
  limit?: number;
  items?: Model[];
};

export const useModels = () => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Response, Error>(
    ['models', space, environment],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/environments/${environment}/content_types`,
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
    { enabled: !!space },
  );
};

export const useModel = (modelID?: string) => {
  const {
    tokens: { selected },
    space: { space, environment },
  } = useAppSelector(state => state);

  return useQuery<Model, Error>(
    ['models', space, environment, modelID],
    async () => {
      const response = await fetch(
        `${BASE_URL}/spaces/${space}/environments/${environment}/content_types/${modelID}`,
        {
          headers: {
            Authorization: `Bearer ${selected?.content}`,
          },
        },
      );

      const json = await response.json();

      console.log(json);

      if (json.sys.type === 'Error') {
        throw new Error(json.message);
      }

      return json;
    },
    { enabled: !!space && !!modelID && !!selected },
  );
};
