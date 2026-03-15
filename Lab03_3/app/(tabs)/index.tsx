import { Ionicons } from '@expo/vector-icons'; // Đảm bảo đã install: npx expo install @expo/vector-icons
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Easing,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ModalActivityIndicator = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation cho modal
  const scaleAnim = new Animated.Value(0.8);
  const opacityAnim = new Animated.Value(0);

  const animateOpen = () => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animateClose = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => callback());
  };

  const openModal = () => {
    setModalVisible(true);
    animateOpen();
  };

  const closeModal = () => {
    animateClose(() => setModalVisible(false));
  };

  const handleHideModal = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      closeModal();
    }, 1800); // Giả lập xử lý 1.8 giây
  };

  const handleBackPress = () => {
    Alert.alert(
      'Thông báo',
      'Bạn đã tắt modal bằng nút back của thiết bị',
      [
        {
          text: 'OK',
          onPress: () => {
            setLoading(false);
            closeModal();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4F46E5" />

      <View style={styles.content}>
        <Ionicons name="cube-outline" size={80} color="#6366F1" style={styles.icon} />
        <Text style={styles.title}>Modal Activity Indicator</Text>
        <Text style={styles.subtitle}>
          React Native Modal & Activity Indicator
        </Text>

        <TouchableOpacity style={styles.openButton} onPress={openModal}>
          <Text style={styles.openButtonText}>MỞ MODAL</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleBackPress}
      >
        <Animated.View style={[styles.modalOverlay, { opacity: opacityAnim }]}>
          <Animated.View
            style={[
              styles.modalContainer,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            {loading ? (
              <View style={styles.loadingView}>
                <ActivityIndicator size="large" color="#ffffff" />
                <Text style={styles.loadingText}>Đang xử lý...</Text>
              </View>
            ) : (
              <>
                <View style={styles.modalHeader}>
                  <Ionicons name="close-circle" size={40} color="#ffffff" />
                  <Text style={styles.modalTitle}>Ẩn Modal</Text>
                </View>

                <Text style={styles.modalText}>
                  Nhấn nút bên dưới để ẩn modal hoặc dùng nút back của thiết bị
                </Text>

                <TouchableOpacity
                  style={styles.hideButton}
                  onPress={handleHideModal}
                  activeOpacity={0.85}
                >
                  <Text style={styles.hideButtonText}>ẨN MODAL</Text>
                </TouchableOpacity>

                <Text style={styles.hintText}>
                  Hoặc nhấn nút back để đóng và nhận thông báo
                </Text>
              </>
            )}
          </Animated.View>
        </Animated.View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Đã thêm style content để fix lỗi TypeScript "Property 'content' does not exist"
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    width: '100%',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  openButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  openButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '88%',
    backgroundColor: '#6366F1',
    borderRadius: 28,
    padding: 32,
    alignItems: 'center',
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 20,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#E0E7FF',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 24,
  },
  hideButton: {
    backgroundColor: '#F472B6',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 50,
    marginBottom: 20,
    elevation: 6,
  },
  hideButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  hintText: {
    fontSize: 14,
    color: '#C7D2FE',
    textAlign: 'center',
  },

  // Loading
  loadingView: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default ModalActivityIndicator;