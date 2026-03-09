// App.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Easing,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  // Checkbox states
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [sound, setSound] = useState(false);

  // Radio state
  const [theme, setTheme] = useState('system'); // 'light', 'dark', 'system'

  // Image button state + animation
  const [profilePressed, setProfilePressed] = useState(false);
  const imageScale = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(1)).current;

  const animateImage = (pressed) => {
    Animated.parallel([
      Animated.spring(imageScale, {
        toValue: pressed ? 0.94 : 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(imageOpacity, {
        toValue: pressed ? 0.85 : 1,
        duration: 180,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderCheckbox = (checked, onPress, label, iconName) => {
    return (
      <TouchableOpacity
        style={styles.optionRow}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons
          name={checked ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
          size={28}
          color={checked ? '#00d4ff' : '#94a3b8'}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.optionText}>{label}</Text>
          {iconName && (
            <MaterialCommunityIcons name={iconName} size={20} color="#64748b" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#0f172a']}
      style={styles.gradient}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>Cài Đặt Ứng Dụng</Text>

        {/* Profile Image Button + Image View */}
        <View style={styles.profileSection}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={() => {
              setProfilePressed(true);
              animateImage(true);
            }}
            onPressOut={() => {
              setProfilePressed(false);
              animateImage(false);
            }}
            onPress={() => alert('Mở trang chỉnh sửa profile!')}
          >
            <Animated.View
              style={[
                styles.profileImageWrapper,
                {
                  transform: [{ scale: imageScale }],
                  opacity: imageOpacity,
                },
              ]}
            >
              <Image
                source={{
                  uri: 'https://scontent.fsgn20-1.fna.fbcdn.net/v/t39.30808-6/645684263_2409512726157586_6552837054796805915_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeEIpe9Qe4zzsRQui4DEyLB_mqGEM1ui3X6aoYQzW6Ldfh7vKr-YhEpOWCBTy3EnyHB9Nr0cDq9jYNXLEHs4_U6b&_nc_ohc=Z_wpYIHIaG4Q7kNvwGqsm9-&_nc_oc=AdkKGyqVBxoLrtUYmkaNEOmQSWZT6wl7RJKO8CGrt2DM9fXkf8K6KzuxxAOE8s2bh8k&_nc_zt=23&_nc_ht=scontent.fsgn20-1.fna&_nc_gid=QsqOAgWjYOwotFP3gWI13w&_nc_ss=8&oh=00_Afz1-pYQ2V4eTfNu-8gnuCyjrUjNNxDS32l1CEECSx7osA&oe=69B407BE',
                }}
                style={styles.profileImage}
              />
              <LinearGradient
                colors={['rgba(0,212,255,0.3)', 'rgba(147,51,234,0.3)']}
                style={[
                  StyleSheet.absoluteFill,
                  profilePressed && styles.overlayActive,
                ]}
              />
            </Animated.View>
          </TouchableOpacity>

          <Text style={styles.profileName}>Võ Nhạc Phước</Text>
          <Text style={styles.profileStatus}>Premium User • Active</Text>
        </View>

        {/* Checkbox Group */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Tùy chọn chung</Text>

          {renderCheckbox(notifications, () => setNotifications(!notifications), 'Thông báo đẩy', 'bell-ring-outline')}
          {renderCheckbox(darkMode, () => setDarkMode(!darkMode), 'Chế độ tối', 'weather-night')}
          {renderCheckbox(sound, () => setSound(!sound), 'Âm thanh trong ứng dụng', 'volume-high')}
        </View>

        {/* Radio Group */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Chủ đề giao diện</Text>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setTheme('light')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={theme === 'light' ? 'radiobox-marked' : 'radiobox-blank'}
              size={28}
              color={theme === 'light' ? '#00d4ff' : '#94a3b8'}
            />
            <Text style={styles.optionText}>Sáng (Light)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setTheme('dark')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={theme === 'dark' ? 'radiobox-marked' : 'radiobox-blank'}
              size={28}
              color={theme === 'dark' ? '#00d4ff' : '#94a3b8'}
            />
            <Text style={styles.optionText}>Tối (Dark)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setTheme('system')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={theme === 'system' ? 'radiobox-marked' : 'radiobox-blank'}
              size={28}
              color={theme === 'system' ? '#00d4ff' : '#94a3b8'}
            />
            <Text style={styles.optionText}>Theo hệ thống</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveText}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 80,
  },
  header: {
    fontSize: 32,
    fontWeight: '800',
    color: '#e0f2fe',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profileImageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'rgba(0, 212, 255, 0.4)',
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  overlayActive: {
    borderRadius: 70,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginTop: 16,
  },
  profileStatus: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'rgba(30, 41, 59, 0.7)',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#cbd5e1',
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 17,
    color: '#e2e8f0',
    marginLeft: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#06b6d4',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#00d4ff',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  saveText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});