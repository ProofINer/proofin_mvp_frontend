import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, spacing, typography } from '../styles';

type ReportResultScreenRouteProp = RouteProp<RootStackParamList, 'ReportResult'>;
type ReportResultScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ReportResult'>;

interface Props {
  route: ReportResultScreenRouteProp;
  navigation: ReportResultScreenNavigationProp;
}

interface ReportBlock {
  id: number;
  label: string;
  item: string;
  damage: string;
  description: string;
  imageUri: string | null;
}

export default function ReportResultScreen({ route, navigation }: Props) {
  const { results } = route.params || {};

  const handleNext = () => {
    navigation.navigate('Home');
  };

  // 예시 데이터 (API 연동 전 미리보기용)
  const sample: ReportBlock[] = [
    {
      id: 1,
      label: '이미지1',
      item: '벽지',
      damage: '10%',
      description: '전반적으로 사용감은 있으나 흠집이나 변색된 부분이 없으며 상태가 좋아보임.',
      imageUri: null, // 실제 이미지 넣기
    },
    {
      id: 2,
      label: '이미지2',
      item: '바닥',
      damage: '5%',
      description: '스크래치가 약간 있으나 큰 문제 없음.',
      imageUri: null,
    },
  ];

  const data: ReportBlock[] = results || sample;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        
        {/* 🔝 헤더 */}
        <Text style={[typography.titleXL, styles.logo]}>ProofIN</Text>

        {/* 페이지 제목 */}
        <Text style={[typography.titleL, styles.title]}>AI 레포트 결과</Text>

        {data.map((block) => (
          <View key={block.id} style={styles.blockWrapper}>

            {/* 이미지 제목 */}
            <Text style={[typography.titleM, styles.imageLabel]}>
              {block.label}
            </Text>

            {/* 이미지 박스 */}
            <View style={styles.imageBox}>
              {block.imageUri ? (
                <Image
                  source={{ uri: block.imageUri }}
                  style={styles.realImage}
                  resizeMode="cover"
                />
              ) : (
                <Text style={styles.placeholderText}>이미지 미등록</Text>
              )}
            </View>

            {/* 항목 */}
            <View style={styles.infoRow}>
              <Text style={[typography.bodyL, styles.fieldLabel]}>항목</Text>
              <Text style={[typography.bodyL, styles.fieldValue]}>{block.item}</Text>
            </View>

            {/* 손상도 */}
            <View style={styles.infoRow}>
              <Text style={[typography.bodyL, styles.fieldLabel]}>손상도</Text>
              <Text style={[typography.bodyL, styles.fieldValue]}>{block.damage}</Text>
            </View>

            {/* 설명 */}
            <View style={styles.infoRowColumn}>
              <Text style={[typography.bodyL, styles.fieldLabel]}>설명</Text>
              <Text style={[typography.bodyL, styles.description]}>
                {block.description}
              </Text>
            </View>

          </View>
        ))}
      </ScrollView>

      {/* OK 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={[typography.titleM, styles.buttonText]}>OK</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },

  logo: {
    color: colors.background,
    marginBottom: spacing.l,
  },

  title: {
    color: colors.background,
    marginBottom: spacing.xl,
  },

  blockWrapper: {
    marginBottom: spacing.xxl,
  },

  imageLabel: {
    textAlign: 'center',
    color: colors.background,
    marginBottom: spacing.s,
  },

  imageBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#DDE1E6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  realImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  placeholderText: {
    color: '#9AA1A9',
  },

  infoRow: {
    flexDirection: 'row',
    marginBottom: spacing.m,
  },
  infoRowColumn: {
    marginBottom: spacing.m,
  },

  fieldLabel: {
    fontWeight: '600',
    color: colors.secondary,
    marginBottom: spacing.xs,
  },
  fieldValue: {
    color: colors.background,
    marginLeft: spacing.s,
  },

  description: {
    color: colors.background,
    opacity: 0.8,
    lineHeight: 20,
  },

  button: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    position: 'absolute',
    bottom: spacing.xl,
    alignSelf: 'center',
  },
  buttonText: {
    color: colors.surface,
  },
});
