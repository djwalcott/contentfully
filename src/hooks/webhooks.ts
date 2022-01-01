import { useMutation, useQuery } from 'react-query';
import { useAppSelector } from '../storage/store';
import { Link } from '../typings/contentful';

const BASE_URL = 'https://api.contentful.com';

export type Webhook = {
  name: string;
  url: string;
  httpBasicUsername: null;
  topics: string[];
  filters: null;
  transformation: {
    body: {
      fallback: 'Coaching content has been updated';
      text: 'Coaching content has been updated!';
      pretext: 'Following fields were updated';
      color: '#4A5AEF';
      fields: [
        {
          title: 'Entity version: { /payload/sys/version }';
          value: '';
          short: false;
        },
      ];
    };
  };
  active: true;
  sys: {
    type: string;
    id: string;
    version: number;
    space: {
      sys: Link;
    };
    createdBy: {
      sys: Link;
    };
    createdAt: string;
    updatedBy: {
      sys: Link;
    };
    updatedAt: string;
  };
  headers: [];
};

type Response = {
  total: number;
  limit: number;
  skip: number;
  sys: {
    type: 'Array';
  };
  items: Webhook[];
};

export const useWebhooks = () => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery<Response, Error>(
    ['webhooks', space],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/webhook_definitions`,
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
    {
      enabled: !!space && !!selected,
    },
  );
};

export const useWebhook = (id: string) => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery<Webhook, Error>(
    ['webhooks', id, space],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/webhook_definitions/${id}`,
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
    {
      enabled: !!space && !!selected,
    },
  );
};

export type WebhookHealth = {
  sys: {
    id: string;
    type: 'Webhook';
    space: {
      sys: Link;
    };
    createdBy: {
      sys: Link;
    };
  };
  calls: {
    total: number;
    healthy: number;
  };
};

export const useWebhookHealth = (id: string) => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useQuery<WebhookHealth, Error>(
    ['webhooks', id, 'health', space],
    async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/spaces/${space}/webhooks/${id}/health`,
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
    {
      enabled: !!space && !!selected,
    },
  );
};

export const removeWebhook = (id: string) => {
  const {
    tokens: { selected },
    space: { space },
  } = useAppSelector(state => state);

  return useMutation(async id => {
    try {
      const response = await fetch(
        `${BASE_URL}/spaces/${space}/webhook_definitions/${id}`,
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
  });
};
