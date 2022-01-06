import { useMutation, useQueryClient } from 'react-query';
import { useAppSelector } from '../storage/store';

const BASE_URL = 'https://api.contentful.com';

export const useCreateHook = () => {
  const {
    tokens: { selected },
    space: { space },
    notifications: { deviceToken },
  } = useAppSelector(state => state);
  const queryClient = useQueryClient();

  const body = JSON.stringify({
    name: 'Contentfully notificationssdfsd',
    url: 'https://netli.fyi/functions/contentfully',
    topics: ['Entry.create', 'ContentType.create', '*.publish', 'Asset.*'],
    filters: [],
    headers: [
      {
        key: 'deviceToken',
        value: `${deviceToken}`,
      },
    ],
  });

  return useMutation(
    async () => {
      const response = await fetch(
        `${BASE_URL}/spaces/${space}/webhook_definitions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${selected?.content}`,
            'Content-Type': 'application/vnd.contentful.management.v1+json',
          },
          body: body,
        },
      );

      if (!response.ok) {
        throw new Error('Could not create');
      }

      return response.json();
    },
    {
      onSuccess: data => {},
    },
  );
};
