import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Linking,
  Image,
  StatusBar,
} from 'react-native';
import {mainStorage} from '../lib/storage';

const FACEBOOK_URL = 'https://www.facebook.com/share/18iR65mPMX/';
const STORAGE_KEY = 'fb_follow_confirmed';

export const isFacebookFollowed = (): boolean => {
  return mainStorage.getBool(STORAGE_KEY, false);
};

export const markFacebookFollowed = (): void => {
  mainStorage.setBool(STORAGE_KEY, true);
};

type Props = {
  visible: boolean;
  onFollowed: () => void;
};

const FacebookFollowGate = ({visible, onFollowed}: Props) => {
  const handleOpenFacebook = async () => {
    try {
      await Linking.openURL(FACEBOOK_URL);
    } catch {}
  };

  const handleConfirmFollow = () => {
    markFacebookFollowed();
    onFollowed();
  };

  return (
    <Modal
      visible={visible}
      transparent={false}
      animationType="fade"
      statusBarTranslucent>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#0a0a0a',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 28,
        }}>
        {/* Facebook logo area */}
        <View
          style={{
            width: 88,
            height: 88,
            borderRadius: 44,
            backgroundColor: '#1877F2',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 28,
            shadowColor: '#1877F2',
            shadowOffset: {width: 0, height: 8},
            shadowOpacity: 0.5,
            shadowRadius: 16,
            elevation: 12,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 48,
              fontWeight: '900',
              lineHeight: 56,
            }}>
            f
          </Text>
        </View>

        {/* Title */}
        <Text
          style={{
            color: 'white',
            fontSize: 24,
            fontWeight: '800',
            textAlign: 'center',
            marginBottom: 12,
            letterSpacing: 0.3,
          }}>
          Follow Facebook Kami
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            color: '#9CA3AF',
            fontSize: 15,
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: 36,
            paddingHorizontal: 8,
          }}>
          Untuk mengakses semua provider, silakan follow halaman Facebook kami
          terlebih dahulu. Gratis dan hanya butuh beberapa detik!
        </Text>

        {/* Steps */}
        <View
          style={{
            backgroundColor: '#171717',
            borderRadius: 16,
            padding: 20,
            width: '100%',
            marginBottom: 32,
            borderWidth: 1,
            borderColor: '#262626',
          }}>
          {[
            ['1', 'Tap tombol "Buka Facebook" di bawah'],
            ['2', 'Klik Follow / Ikuti di halaman kami'],
            ['3', 'Kembali ke sini dan tap "Sudah Follow"'],
          ].map(([num, text]) => (
            <View
              key={num}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: num === '3' ? 0 : 14,
              }}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: '#1877F2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                }}>
                <Text
                  style={{color: 'white', fontSize: 13, fontWeight: '700'}}>
                  {num}
                </Text>
              </View>
              <Text style={{color: '#D1D5DB', fontSize: 14, flex: 1}}>
                {text}
              </Text>
            </View>
          ))}
        </View>

        {/* Open Facebook Button */}
        <TouchableOpacity
          onPress={handleOpenFacebook}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#1877F2',
            borderRadius: 14,
            paddingVertical: 16,
            paddingHorizontal: 24,
            width: '100%',
            alignItems: 'center',
            marginBottom: 14,
            shadowColor: '#1877F2',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.4,
            shadowRadius: 10,
            elevation: 8,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
            Buka Facebook
          </Text>
        </TouchableOpacity>

        {/* Confirm Follow Button */}
        <TouchableOpacity
          onPress={handleConfirmFollow}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#16a34a',
            borderRadius: 14,
            paddingVertical: 16,
            paddingHorizontal: 24,
            width: '100%',
            alignItems: 'center',
            shadowColor: '#16a34a',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 6,
          }}>
          <Text
            style={{color: 'white', fontSize: 16, fontWeight: '700'}}>
            Sudah Follow ✓
          </Text>
        </TouchableOpacity>

        {/* Note */}
        <Text
          style={{
            color: '#4B5563',
            fontSize: 12,
            textAlign: 'center',
            marginTop: 20,
            lineHeight: 18,
          }}>
          Konfirmasi ini hanya perlu dilakukan sekali.{'\n'}Setelah itu semua
          provider langsung bisa digunakan.
        </Text>
      </View>
    </Modal>
  );
};

export default FacebookFollowGate;
