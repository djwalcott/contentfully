import { useMutation, useQueryClient } from 'react-query';
import { useAppSelector } from '../storage/store';
import { WebhooksResponse } from './webhooks';

const BASE_URL = 'https://api.contentful.com';

export type ContentfulNotificationPayload = {
  name: string;
  url: string;
  topics: string[];
  filters: string[];
  headers: Array<{
    key: string;
    value: string;
  }>;
};

export const useCreateNotifications = () => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);
  const queryClient = useQueryClient();

  return useMutation(
    async (payload: ContentfulNotificationPayload) => {
      const response = await fetch(
        `${BASE_URL}/spaces/${space}/webhook_definitions`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${selected?.content}`,
            'Content-Type': 'application/vnd.contentful.management.v1+json',
          },
          body: JSON.stringify(payload),
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
        const previousHooks = queryClient.getQueryData<WebhooksResponse>([
          'webhooks',
          { space },
        ]);

        if (previousHooks) {
          queryClient.setQueryData<WebhooksResponse>(['webhooks', { space }], {
            ...previousHooks,
            items: [
              ...previousHooks?.items,
              {
                ...newHook,
                sys: {
                  id: 'temp',
                  updatedAt: new Date().toISOString(),
                },
              },
            ],
          });
        }

        return { previousHooks };
      },
      onError: (_error, _newHook, context) => {
        if (context?.previousHooks) {
          queryClient.setQueryData('todos', context.previousHooks);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['webhooks']);
      },
    },
  );
};
