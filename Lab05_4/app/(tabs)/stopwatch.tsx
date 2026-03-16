// app/(tabs)/stopwatch.tsx
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

export default function Stopwatch() {
  const [time, setTime] = useState(0); // milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => setTime((prev) => prev + 10), 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds
      .toString()
      .padStart(2, '0')}`;
  };

  const startStop = () => {
    if (isRunning) {
      setIsRunning(false);
      Vibration.vibrate(100);
    } else {
      setIsRunning(true);
      Vibration.vibrate(50);
    }
  };

  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time]);
      Vibration.vibrate(50);
    }
  };

  return (
    <LinearGradient colors={['#11998e', '#38ef7d']} style={styles.container}>
      <Text style={styles.title}>Đồng hồ bấm giờ</Text>

      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{formatTime(time)}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.controlButton, isRunning ? styles.stopButton : styles.startButton]}
          onPress={startStop}
        >
          <Ionicons name={isRunning ? 'pause' : 'play'} size={32} color="white" />
          <Text style={styles.buttonLabel}>{isRunning ? 'Dừng' : 'Bắt đầu'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={reset}
          disabled={time === 0 && laps.length === 0}
        >
          <Ionicons name="refresh" size={32} color="white" />
          <Text style={styles.buttonLabel}>Đặt lại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.lapButton]}
          onPress={recordLap}
          disabled={!isRunning}
        >
          <Ionicons name="flag" size={32} color="white" />
          <Text style={styles.buttonLabel}>Vòng</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.lapList}>
        {laps.map((lapTime, index) => (
          <View key={index} style={styles.lapItem}>
            <Text style={styles.lapText}>Vòng {index + 1}</Text>
            <Text style={styles.lapTimeText}>{formatTime(lapTime)}</Text>
          </View>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 40,marginTop: 150 },
  timeContainer: { alignItems: 'center', marginBottom: 50 },
  timeText: { fontSize: 50, fontWeight: '900', color: 'white', letterSpacing: 4, textShadowColor: 'rgba(0,0,0,0.3)', textShadowOffset: { width: 2, height: 2 }, textShadowRadius: 10 },
  buttonRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 40 },
  controlButton: { alignItems: 'center', padding: 20, borderRadius: 50, width: 100, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 6, elevation: 8 },
  startButton: { backgroundColor: '#2ecc71' },
  stopButton: { backgroundColor: '#e74c3c' },
  resetButton: { backgroundColor: '#95a5a6' },
  lapButton: { backgroundColor: '#3498db' },
  buttonLabel: { color: 'white', fontSize: 14, fontWeight: 'bold', marginTop: 8 },
  lapList: { flex: 1, width: '100%' },
  lapItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.2)' },
  lapText: { fontSize: 18, color: '#e0ffff', fontWeight: '600' },
  lapTimeText: { fontSize: 18, color: 'white', fontWeight: 'bold' },
});