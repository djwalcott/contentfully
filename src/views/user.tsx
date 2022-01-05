import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { FC, useEffect } from 'react';
import styled, { css } from 'styled-components/native';
import { Container } from '../components/shared/container';
import { Skeleton } from '../components/shared/skeleton';
import { CardTitle } from '../components/shared/typography';
import { useContentfulUser } from '../hooks/user';
import { SpaceStackParamList } from '../navigation/navigation';
import { font } from '../styles';

export type SpaceScreenProps = NativeStackScreenProps<
  SpaceStackParamList,
  'User'
>;

type Props = {
  route: SpaceScreenProps['route'];
  navigation: SpaceScreenProps['navigation'];
};

export const User: FC<Props> = ({
  route: {
    params: { userID },
  },
}) => {
  const { data: user, isLoading } = useContentfulUser(userID);

  return (
    <ScrollView>
      <Container>
        <NameSkeleton
          isLoading={isLoading}
          borderRadius={8}
          height={12}
          width={160}>
          <CardTitle>
            {user?.firstName} {user?.lastName}
          </CardTitle>
        </NameSkeleton>
        <Skeleton
          isLoading={isLoading}
          borderRadius={8}
          height={12}
          width={120}>
          <FieldValue>{user?.email}</FieldValue>
        </Skeleton>
      </Container>

      <Container>
        <Field>
          <FieldTitle>Login count</FieldTitle>
          <Skeleton
            isLoading={isLoading}
            borderRadius={8}
            height={12}
            width={120}>
            <FieldValue>{user?.signInCount}</FieldValue>
          </Skeleton>
        </Field>
        <Field>
          <FieldTitle>Account activated</FieldTitle>
          <Skeleton
            isLoading={isLoading}
            borderRadius={8}
            height={12}
            width={120}>
            <FieldValue>{user?.activated ? 'Yes' : 'No'}</FieldValue>
          </Skeleton>
        </Field>
        <Field>
          <FieldTitle>Account confirmed</FieldTitle>
          <Skeleton
            isLoading={isLoading}
            borderRadius={8}
            height={12}
            width={120}>
            <FieldValue>{user?.confirmed ? 'Yes' : 'No'}</FieldValue>
          </Skeleton>
        </Field>
        <Field noBorder>
          <FieldTitle>2-Factor Authentication Enabled</FieldTitle>
          <Skeleton
            isLoading={isLoading}
            borderRadius={8}
            height={12}
            width={120}>
            <FieldValue>{user?.['2faEnabled'] ? 'Yes' : 'No'}</FieldValue>
          </Skeleton>
        </Field>
      </Container>
    </ScrollView>
  );
};

const ScrollView = styled.ScrollView``;

type FieldProps = {
  noBorder?: boolean;
};

const Field = styled.View<FieldProps>`
  ${({ noBorder }) =>
    !noBorder &&
    css`
      border-bottom-width: 1px;
      border-bottom-color: ${({ theme }) => theme.colors.gray[200]};
      margin-bottom: 16px;
      padding-bottom: 8px;
    `}
`;

const FieldTitle = styled.Text`
  font-family: ${font.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
  font-size: 12px;
  margin-bottom: 4px;
  text-transform: uppercase;
`;

const FieldValue = styled.Text`
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[700]};
  font-size: 13px;
  text-transform: uppercase;
`;

const NameSkeleton = styled(Skeleton)`
  margin-bottom: 4px;
`;
