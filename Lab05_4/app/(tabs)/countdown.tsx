// app/(tabs)/countdown.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

export default function Countdown() {
  const [remaining, setRemaining] = useState(0); // ms
  const [isRunning, setIsRunning] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [initialDuration, setInitialDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 100) {
            clearInterval(interval!);
            setIsRunning(false);
            Vibration.vibrate([1000, 500, 1000]);
            Alert.alert('Hết giờ!', 'Đếm ngược đã hoàn tất!');
            return 0;
          }
          return prev - 100;
        });
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, remaining]);

  const formatTime = (ms: number) => {
    if (ms <= 0) return '00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const now = new Date();
      const diff = selectedDate.getTime() - now.getTime();
      if (diff > 0) {
        setInitialDuration(diff);
        setRemaining(diff);
      } else {
        Alert.alert('Lỗi', 'Vui lòng chọn thời gian trong tương lai!');
      }
    }
  };

  return (
    <LinearGradient colors={['#ee0979', '#ff6a00']} style={styles.container}>
      <Text style={styles.title}>Đồng hồ đếm ngược</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(remaining)}</Text>
      </View>

      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setShowPicker(true)}
        disabled={isRunning}
      >
        <Ionicons name="time-outline" size={28} color="white" />
        <Text style={styles.pickerLabel}>Chọn thời gian</Text>
      </TouchableOpacity>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.controlButton, styles.startButton]}
          onPress={() => setIsRunning(true)}
          disabled={isRunning || remaining === 0}
        >
          <Ionicons name="play" size={32} color="white" />
          <Text style={styles.buttonLabel}>Bắt đầu</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.stopButton]}
          onPress={() => setIsRunning(false)}
          disabled={!isRunning}
        >
          <Ionicons name="pause" size={32} color="white" />
          <Text style={styles.buttonLabel}>Dừng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={() => {
            setIsRunning(false);
            setRemaining(initialDuration);
          }}
          disabled={remaining === 0}
        >
          <Ionicons name="refresh" size={32} color="white" />
          <Text style={styles.buttonLabel}>Đặt lại</Text>
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={new Date(Date.now() + 60000)} // mặc định +1 phút
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 40 },
  timeContainer: { alignItems: 'center', marginBottom: 50 },
  timeText: { fontSize: 50, fontWeight: '900', color: 'white', letterSpacing: 6, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 3, height: 3 }, textShadowRadius: 12 },
  pickerButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, marginBottom: 40, alignSelf: 'center' },
  pickerLabel: { color: 'white', fontSize: 18, fontWeight: 'bold', marginLeft: 12 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 },
  controlButton: { alignItems: 'center', padding: 20, borderRadius: 50, width: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  startButton: { backgroundColor: '#27ae60' },
  stopButton: { backgroundColor: '#c0392b' },
  resetButton: { backgroundColor: '#7f8c8d' },
  buttonLabel: { color: 'white', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
});