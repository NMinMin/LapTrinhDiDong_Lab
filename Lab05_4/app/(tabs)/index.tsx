import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

export default function RealTimeClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('vi-VN', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.fullScreen}>
      <Text style={styles.clockTitle}>Đồng hồ thời gian thực</Text>
      <Text style={styles.realTime}>{formatTime(time)}</Text>
      <Text style={styles.date}>
        {time.toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fullScreen: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  clockTitle: { fontSize: 28, color: 'white', marginBottom: 20, fontWeight: '600' },
  realTime: { fontSize: 52, color: 'white', fontWeight: 'bold', letterSpacing: 4 },
  date: { fontSize: 22, color: '#e0e0ff', marginTop: 10 },
});