import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

// Định nghĩa interface cho mỗi cuộc hẹn
interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  fullDate: Date;
}

const AppointmentLogic = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  const showTimePicker = () => setTimePickerVisible(true);
  const hideTimePicker = () => setTimePickerVisible(false);

  const handleConfirmDate = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    setTimeout(() => showTimePicker(), 300);
  };

  const handleConfirmTime = (time: Date) => {
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      title: title.trim() || 'Cuộc hẹn không tên',
      date: time.toLocaleDateString('vi-VN'),
      time: time.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      fullDate: time,
    };

    setAppointments((prev) =>
      [...prev, newAppointment].sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime())
    );

    setTitle('');
    setSelectedDate(new Date());
    hideTimePicker();

    Alert.alert('Thành công', 'Đã thêm cuộc hẹn mới!');
  };

  const deleteAppointment = (id: string) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc muốn xóa cuộc hẹn này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            setAppointments((prev) => prev.filter((item) => item.id !== id));
          },
        },
      ]
    );
  };

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentInfo}>
        <Ionicons name="calendar-outline" size={28} color="#3B82F6" />
        <View style={styles.textContainer}>
          <Text style={styles.appointmentTitle}>{item.title}</Text>
          <Text style={styles.appointmentDate}>
            {item.date} • {item.time}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => deleteAppointment(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lịch Hẹn Của Tôi</Text>
        <Text style={styles.headerSubtitle}>Quản lý lịch trình dễ dàng</Text>
      </View>

      {/* Form thêm cuộc hẹn */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tiêu đề cuộc hẹn (ví dụ: Gặp khách hàng)"
          placeholderTextColor="#94A3B8"
          value={title}
          onChangeText={setTitle}
        />

        <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
          <Ionicons name="calendar" size={20} color="#3B82F6" />
          <Text style={styles.pickerText}>
            {selectedDate.toLocaleDateString('vi-VN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pickerButton} onPress={showTimePicker}>
          <Ionicons name="time-outline" size={20} color="#3B82F6" />
          <Text style={styles.pickerText}>
            {selectedDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>

        {/* NÚT THÊM LỊCH HẸN - ĐÃ THÊM RÕ RÀNG */}
        <TouchableOpacity style={styles.addButton} onPress={showDatePicker}>
          <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" style={styles.addIcon} />
          <Text style={styles.addButtonText}>Thêm Lịch Hẹn Mới</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách cuộc hẹn */}
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-clear-outline" size={80} color="#CBD5E1" />
            <Text style={styles.emptyText}>Chưa có cuộc hẹn nào</Text>
            <Text style={styles.emptySubText}>
              Nhấn nút "Thêm Lịch Hẹn Mới" ở trên để bắt đầu
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Date Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        display={Platform.OS === 'ios' ? 'inline' : 'default'}
      />

      {/* Time Picker */}
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={hideTimePicker}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#3B82F6',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E0F2FE',
    marginTop: 4,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pickerText: {
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 12,
    flex: 1,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: '#10B981',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  addIcon: {
    marginRight: 12,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  appointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  appointmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    marginLeft: 12,
  },
  appointmentTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
  },
  appointmentDate: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#475569',
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 16,
    color: '#94A3B8',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default AppointmentLogic;