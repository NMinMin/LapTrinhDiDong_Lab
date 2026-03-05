import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DateTimePicker from '@react-native-community/datetimepicker';

const Stack = createNativeStackNavigator();

// Màn hình chính - Danh sách Todo
function HomeScreen({ navigation }) {
  const [tasks, setTasks] = useState([]);

  // useEffect: load dữ liệu giả lập khi mount
  useEffect(() => {
    setTasks([
      { id: '1', title: 'Học React Native', completed: false, dueDate: '05/03/2026 20:00' },
      { id: '2', title: 'Làm bài tập Todo List', completed: true, dueDate: '05/03/2026 18:00' },
    ]);
  }, []);

  const toggleComplete = (id) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn chắc chắn muốn xóa công việc này?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          onPress: () => setTasks(prev => prev.filter(t => t.id !== id)),
          style: 'destructive',
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={styles.checkbox}>
        <Text style={styles.checkboxText}>{item.completed ? '✓' : ''}</Text>
      </TouchableOpacity>
      <View style={styles.taskContent}>
        <Text style={[styles.taskTitle, item.completed && styles.completed]}>
          {item.title}
        </Text>
        <Text style={styles.dueDate}>Hạn: {item.dueDate}</Text>
      </View>
      <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteBtn}>
        <Text style={styles.deleteText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />

      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>Chưa có công việc nào</Text>}
        contentContainerStyle={{ padding: 16 }}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask', {
          addTask: (newTask) => {
            setTasks(prev => [...prev, { id: Date.now().toString(), ...newTask }]);
          }
        })}
      >
        <Text style={styles.fabText}>+ Thêm</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Màn hình thêm công việc mới
function AddTaskScreen({ route, navigation }) {
  const { addTask } = route.params;

  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleAdd = () => {
    if (!title.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập tiêu đề công việc!');
      return;
    }

    const dueDateStr = date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    addTask({
      title: title.trim(),
      completed: false,
      dueDate: dueDateStr,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Tiêu đề công việc</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="Nhập công việc mới..."
          placeholderTextColor="#aaa"
        />

        <Text style={styles.label}>Hạn chót</Text>
        <TouchableOpacity style={styles.dateBtn} onPress={() => showMode('date')}>
          <Text style={styles.dateText}>
            Ngày: {date.toLocaleDateString('vi-VN')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateBtn} onPress={() => showMode('time')}>
          <Text style={styles.dateText}>
            Giờ: {date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </TouchableOpacity>

        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
          <Text style={styles.addBtnText}>Thêm Công Việc</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// App chính
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Quản Lý Công Việc' }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{ title: 'Thêm Công Việc Mới' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  form: { flex: 1, padding: 20 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateBtn: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: { fontSize: 16, color: '#333' },
  addBtn: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  addBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    elevation: 2,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxText: { fontSize: 16, color: '#4CAF50' },
  taskContent: { flex: 1, marginLeft: 12 },
  taskTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  completed: { textDecorationLine: 'line-through', color: '#888' },
  dueDate: { fontSize: 13, color: '#757575', marginTop: 4 },
  deleteBtn: { padding: 8 },
  deleteText: { fontSize: 20, color: '#e74c3c', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 100, fontSize: 18, color: '#999' },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  fabText: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
});