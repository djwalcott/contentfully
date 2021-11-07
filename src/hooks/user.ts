import { useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';

const BASE_URL = 'https://api.contentful.com';

type User = {
  sys: {
    type: string;
    id: string;
    version: 1;
    createdAt: string;
    updatedAt: string;
  };
  firstName: string;
  lastName: string;
  avatarUrl: string;
  email: string;
  activated: boolean;
  signInCount: number;
  confirmed: boolean;
  '2faEnabled': boolean;
};

type Response = {
  total: number;
  limit: number;
  skip: number;
  sys: {
    type: 'Array';
  };
  items: User[];
};

export const useUser = () => {
  const { selected } = useAppSelector(state => state.tokens);

  return useQuery<User, Error>(
    ['user', selected],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${selected?.content}`,
          },
        });

        return response.json();
      } catch (error) {
        return error;
      }
    },
    {
      enabled: !!selected,
    },
  );
};

export const useUsers = () => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery<Response, Error>(
    ['users', space],
    async () => {
      try {
        const response = await fetch(`${BASE_URL}/spaces/${space}/users`, {
          headers: {
            Authorization: `Bearer ${selected?.content}`,
          },
        });

        return response.json();
      } catch (error) {
        return error;
      }
    },
    {
      enabled: !!space && !!selected,
    },
  );
};
