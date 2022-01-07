import { useMutation, useQueryClient } from 'react-query';
import { useAppSelector } from '../storage/store';
import { WebhooksResponse } from './webhooks';

const BASE_URL = 'https://api.contentful.com';

export const useCreateNotifications = () => {
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
      onMutate: async newHook => {
        await queryClient.cancelQueries('webhooks');
        const previousHooks = queryClient.getQueryData(['webhooks', { space }]);
        console.log(previousHooks);
        queryClient.setQueryData(['webhooks', { space }], old => ({
          ...old,
          items: [...old.items, newHook],
        }));
        return { previousHooks };
      },
      onError: (_error, newHook, context) => {
        queryClient.setQueryData('todos', context.previousHooks);
      },
      onSettled: newHook => {
        queryClient.invalidateQueries(['webhooks', newHook.id]);
      },
    },
  );
};
