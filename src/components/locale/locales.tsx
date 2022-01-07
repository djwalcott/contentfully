import React, { FC, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components/native';
import { useLocales } from '../../hooks/locales';
import { font } from '../../styles';
import { AnimatedBone } from '../shared/bone';
import { SkeletenList } from '../shared/skeleton-list';
import { CardTitle } from '../shared/typography';
import BottomSheet from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { Text } from 'react-native-svg';

type Props = {};

export const Locales: FC<Props> = () => {
  const { data, isLoading } = useLocales();

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <Container>
      <CardTitle>Locales</CardTitle>

      <SkeletenList
        isLoading={isLoading}
        SkeletonComponent={() => (
          <Skeleton>
            <NameBone width={120} height={12} borderRadius={4} />
            <AnimatedBone width={40} height={8} borderRadius={4} />
          </Skeleton>
        )}
        items={2}
        content={
          <>
            {data?.items?.map(item => (
              <Column key={item.sys?.id}>
                <Row>
                  <Name>{`${item.name}`}</Name>
                  {item.default && <Default>Default</Default>}
                </Row>
                <Row>
                  <Locale>{`${item.code}`}</Locale>
                </Row>
              </Column>
            ))}
          </>
        }
      />

      <ContentContainer>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <BottomSheetContainer>
            <Text>Awesome 🎉</Text>
          </BottomSheetContainer>
        </BottomSheet>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: white;
  padding: 16px;
  margin: 8px;
  border-radius: 4px;
  border-color: ${({ theme }) => theme.colors.gray[200]};
  border-width: 1px;
`;

const Name = styled.Text`
  font-size: 13px;
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[800]};
`;

const Locale = styled(Name)`
  font-family: ${font.regular};
  color: ${({ theme }) => theme.colors.gray[600]};
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Column = styled.View`
  margin-bottom: 8px;
`;

const Default = styled.Text`
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.gray[200]};
  padding: 2px 4px;
  color: ${({ theme }) => theme.colors.gray[600]};
  border-radius: 8px;
`;

const Skeleton = styled.View`
  margin-bottom: 12px;
`;

const NameBone = styled(AnimatedBone)`
  margin-bottom: 4px;
`;

const BottomSheetContainer = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
`;

const ContentContainer = styled.View`
  flex: 1;
  align-items: center;
`;
