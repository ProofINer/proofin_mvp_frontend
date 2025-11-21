import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors, typography, spacing } from '../styles';
import ImagePickerModal from '../components/ImagePickerModal';

// ICONS
import NotificationIcon from '../assets/icons/notification.svg';
import SettingIcon from '../assets/icons/setting.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import PlusIcon from '../assets/icons/plus.svg'; // 있으면 사용, 없으면 제거

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function TenantHomeScreen({ navigation }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCamera = () => {
    setIsModalVisible(false);
    console.log('카메라 촬영');
    // 나중에 카메라 기능 추가
  };

  const handleGallery = () => {
    setIsModalVisible(false);
    navigation.navigate('ReportComplete');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔝 헤더 */}
      <View style={styles.header}>
        <Text style={[typography.titleXL, styles.logoText]}>ProofIN</Text>

        <View style={styles.iconGroup}>
          <TouchableOpacity onPress={() => console.log('Notification')}>
            <NotificationIcon width={20} height={20} fill={`${colors.surface}E6`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Settings')}>
            <SettingIcon width={20} height={20} fill={`${colors.surface}E6`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => console.log('Profile')}>
            <ProfileIcon width={19} height={19} fill={`${colors.surface}E6`} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 제목 */}
      <Text style={[typography.titleL, styles.sectionTitle]}>AI 레포트 생성</Text>

      {/* 부제 */}
      <Text style={[typography.bodyL, styles.subtitle]}>
        가구를 촬영하면 손상도를 알 수 있어요!
      </Text>

      {/* 📷 사진 등록 박스 */}
      <TouchableOpacity 
        style={styles.uploadBox}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.uploadContents}>
          {/* 아이콘 (SVG 있으면 사용) */}
          {/* {PlusIcon && <PlusIcon width={32} height={32} fill="#A4ACB3" />} */}
          <Text style={styles.plusIcon}>＋</Text>

          <Text style={[typography.bodyL, styles.uploadText]}>
            사진 등록
          </Text>
        </View>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: spacing.xxl }} />

      {/* 이미지 선택 모달 */}
      <ImagePickerModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onCamera={handleCamera}
        onGallery={handleGallery}
      />
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.l,
  },
  logoText: {
    color: colors.background,
    fontWeight: '600',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: spacing.l,
  },

  /* SECTION TITLE */
  sectionTitle: {
    color: colors.background,
    marginBottom: spacing.s,
  },

  /* SUBTITLE */
  subtitle: {
    textAlign: 'center',
    color: colors.background,
    opacity: 0.8,
    marginBottom: spacing.l,
  },

  /* UPLOAD BOX */
  uploadBox: {
    width: '100%',
    height: 220,
    backgroundColor: '#DDE1E6',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.l,
  },
  uploadContents: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    fontSize: 40,
    color: '#A4ACB3',
    marginBottom: spacing.s,
  },
  uploadText: {
    color: '#9AA1A9',
  },
});
