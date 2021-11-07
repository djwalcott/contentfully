import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';

const BASE_URL = 'https://api.contentful.com';

type Organization = {};

type Response = {
  sys: {
    type: 'Array';
  };
  total: number;
  skip: number;
  limit: number;
  items: {
    name: string;
    sys: {
      createdAt: string;
      createdBy: {
        sys: { id: string; linkType: string; type: string };
      };
      id: string;
      organization: {
        sys: { id: string; linkType: string; type: string };
      };
      type: string;
      updatedAt: string;
      updatedBy: {
        sys: { id: string; linkType: string; type: string };
      };
      version: number;
    };
  }[];
};

export const useOrganizations = () => {
  const { selected } = useAppSelector(state => state.tokens);

  return useQuery<Response, Error>(['organization', selected], async () => {
    try {
      const response = await fetch(`${BASE_URL}/spaces`, {
        headers: {
          Authorization: `Bearer ${selected?.content}`,
        },
      });

      return response.json();
    } catch (error) {
      return error;
    }
  });
};
