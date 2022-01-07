import { useActionSheet } from '@expo/react-native-action-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import styled from 'styled-components/native';
import {
  Container,
  TitleContainer,
  UnpaddedContainer,
} from '../components/shared/container';
import { ListButton, ListButtonText } from '../components/shared/text-button';
import { CardTitle } from '../components/shared/typography';
import { useContentfulUser } from '../hooks/user';
import { useDeleteWebhook, useWebhook } from '../hooks/webhooks';
import { SpaceStackParamList } from '../navigation/navigation';
import { font } from '../styles';

export type WebhookScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'Webhook'
>;

type Props = {
  route: WebhookScreenProps['route'];
  navigation: WebhookScreenProps['navigation'];
};

export const Webhook: FC<Props> = ({
  route: {
    params: { webhookID },
  },
  navigation,
}) => {
  const { data: webhook } = useWebhook(webhookID);
  const { data: updatedBy } = useContentfulUser(webhook?.sys.updatedBy.sys.id);
  const { data: createdBy } = useContentfulUser(webhook?.sys.createdBy.sys.id);
  const { mutate: deleteHook } = useDeleteWebhook();
  const { showActionSheetWithOptions } = useActionSheet();

  const handleDelete = () => {
    showActionSheetWithOptions(
      {
        options: ['Delete', 'Cancel'],
        cancelButtonIndex: 1,
        destructiveButtonIndex: 0,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          deleteHook(webhookID);
          navigation.navigate('Space');
        }
      },
    );
  };

  return (
    <ScrollView>
      <TitleContainer>
        <CardTitle>Webhook</CardTitle>
      </TitleContainer>
      <Container>
        <Field>
          <Title>URL</Title>
          <Value selectable>{webhook?.url}</Value>
        </Field>
        <Field>
          <Title>Created</Title>
          <Value>
            {webhook?.sys.createdAt} by{' '}
            {`${createdBy?.firstName} ${createdBy?.lastName}`}
          </Value>
        </Field>
        <Field>
          <Title>Updated</Title>
          <Value>
            {webhook?.sys.updatedAt} by{' '}
            {`${updatedBy?.firstName} ${updatedBy?.lastName}`}
          </Value>
        </Field>

        <Field>
          <Title>Topics</Title>
          <Value>{JSON.stringify(webhook?.topics)}</Value>
        </Field>

        <Field>
          <Title>Topics</Title>
          <Value>{JSON.stringify(webhook?.headers)}</Value>
        </Field>

        <Field>
          <Title>Topics</Title>
          <Value>{JSON.stringify(webhook?.headers)}</Value>
        </Field>
      </Container>

      <UnpaddedContainer>
        <ListButton onPress={handleDelete} noBorder>
          <ListButtonText>Delete webhook</ListButtonText>
        </ListButton>
      </UnpaddedContainer>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

const Field = styled.View`
  margin-bottom: 8px;
`;

const Value = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray[600]}
  font-family: ${font.medium};
  margin-bottom: 4px;
`;

const Title = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.gray[500]}
  font-family: ${font.regular};
`;
