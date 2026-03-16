// app/(tabs)/alarm.tsx
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

interface AlarmItem {
  id: number;
  time: Date;
  enabled: boolean;
}

export default function Alarm() {
  const [alarms, setAlarms] = useState<AlarmItem[]>([]);
  const [nextId, setNextId] = useState(1);
  const [showPicker, setShowPicker] = useState(false);

  const addAlarm = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      const newAlarm: AlarmItem = {
        id: nextId,
        time: selectedDate,
        enabled: true, // mặc định bật khi thêm mới
      };
      setAlarms((prev) => [...prev, newAlarm]);
      setNextId((prev) => prev + 1);
      Alert.alert('Đã thêm', `Báo thức lúc ${selectedDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`);
    }
  };

  const toggleAlarm = (id: number) => {
    setAlarms((prev) =>
      prev.map((alarm) =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const deleteAlarm = (id: number) => {
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== id));
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  // Kiểm tra báo thức mỗi giây
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      alarms.forEach((alarm) => {
        if (
          alarm.enabled &&
          now.getHours() === alarm.time.getHours() &&
          now.getMinutes() === alarm.time.getMinutes() &&
          now.getSeconds() === 0
        ) {
          Vibration.vibrate([600, 400, 600, 400, 600]);
          Alert.alert('Báo thức!', `Đã đến giờ: ${formatTime(alarm.time)}`);
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <LinearGradient colors={['#ff7e5f', '#feb47b']} style={styles.container}>
      <Text style={styles.title}>Báo thức</Text>

      <TouchableOpacity style={styles.addButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.addButtonText}>+ Thêm báo thức</Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {alarms.length === 0 ? (
          <Text style={styles.emptyText}>Chưa có báo thức nào</Text>
        ) : (
          alarms.map((alarm) => (
            <View key={alarm.id} style={styles.alarmItem}>
              <View style={styles.alarmInfo}>
                <Text style={[styles.alarmTime, !alarm.enabled && styles.disabledTime]}>
                  {formatTime(alarm.time)}
                </Text>
                <Switch
                  value={alarm.enabled}
                  onValueChange={() => toggleAlarm(alarm.id)}
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={alarm.enabled ? '#4cd137' : '#f4f3f4'}
                />
              </View>

              <TouchableOpacity onPress={() => deleteAlarm(alarm.id)}>
                <Text style={styles.deleteText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={addAlarm}
        />
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 150,
  },
  addButton: {
    backgroundColor: 'rgba(255,255,255,0.28)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignSelf: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    width: '100%',
  },
  emptyText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  alarmItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.18)',
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  alarmInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  alarmTime: {
    fontSize: 28,
    fontWeight: '600',
    color: 'white',
  },
  disabledTime: {
    color: 'rgba(255,255,255,0.5)',
    textDecorationLine: 'line-through',
  },
  deleteText: {
    color: '#ff6b6b',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 8,
  },
});