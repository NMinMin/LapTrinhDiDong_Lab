import React, { useState } from 'react';
import {
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const [refreshing, setRefreshing] = useState(false);
  // Màu ban đầu: xanh dương
  const [statusColor, setStatusColor] = useState('#3B82F6'); // blue-500
  const [headerColor, setHeaderColor] = useState('#3B82F6');

  const colors = ['#3B82F6', '#EF4444', '#10B981', '#8B5CF6', '#F59E0B']; // blue, red, green, purple, amber
  const [colorIndex, setColorIndex] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);

    // Giả lập tải dữ liệu 1.2 giây
    setTimeout(() => {
      // Chuyển sang màu tiếp theo
      const nextIndex = (colorIndex + 1) % colors.length;
      setColorIndex(nextIndex);
      setStatusColor(colors[nextIndex]);
      setHeaderColor(colors[nextIndex]);

      setRefreshing(false);
    }, 1200);
  };

  return (
    <>
      {/* StatusBar được điều khiển động */}
      <StatusBar
        backgroundColor={statusColor}
        barStyle="light-content" // chữ/icon trắng để đẹp với nền tối
        translucent={false}
        animated={true}
      />

      {/* SafeAreaView để tránh bị che notch trên iOS */}
      <SafeAreaView style={[styles.container, { backgroundColor: '#F9FAFB' }]}>
        {/* Header động theo màu */}
        <View style={[styles.header, { backgroundColor: headerColor }]}>
          <Text style={styles.headerText}>Bài tập 2</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#ffffff', '#e0f2fe']} // màu vòng xoay (Android)
              tintColor="#ffffff"           // iOS
              title="Đang đổi màu status bar..." // Android
              titleColor="#ffffff"
              progressBackgroundColor={headerColor} // nền vòng xoay
            />
          }
        >
          <View style={styles.content}>
            <Text style={styles.title}>Kéo xuống để đổi màu Status Bar</Text>

            <Text style={styles.instruction}>
              Kéo xuống (pull-to-refresh) → Status bar và header sẽ đổi màu ngẫu nhiên!
            </Text>

            <View style={styles.colorBox}>
              <Text style={styles.colorText}>Màu hiện tại:</Text>
              <View style={[styles.currentColor, { backgroundColor: statusColor }]} />
              <Text style={styles.colorHex}>{statusColor}</Text>
            </View>

            {/* Nội dung giả để có thể scroll */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 4, // bóng đổ Android
    shadowColor: '#000', // bóng đổ iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  colorBox: {
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  colorText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  currentColor: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginVertical: 12,
    borderWidth: 4,
    borderColor: '#ffffff',
  },
  colorHex: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#374151',
  },
});

export default App;