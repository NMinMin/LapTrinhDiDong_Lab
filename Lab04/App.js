import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const fruits = [
  { id: '1', name: 'Apple', image: 'https://img.icons8.com/color/96/000000/apple.png' },
  { id: '2', name: 'Banana', image: 'https://img.icons8.com/color/96/000000/banana.png' },
  { id: '3', name: 'Cherry', image: 'https://img.icons8.com/color/96/000000/cherry.png' },
  { id: '4', name: 'Grapes', image: 'https://img.icons8.com/color/96/000000/grapes.png' },
  { id: '5', name: 'Kiwi', image: 'https://img.icons8.com/color/96/000000/kiwi.png' },
  { id: '6', name: 'Lemon', image: 'https://img.icons8.com/color/96/000000/lemon.png' },
  { id: '7', name: 'Mango', image: 'https://img.icons8.com/color/96/000000/mango.png' },
  { id: '8', name: 'Orange', image: 'https://img.icons8.com/color/96/000000/orange.png' },
  { id: '9', name: 'Papaya', image: 'https://img.icons8.com/color/96/000000/papaya.png' },
  { id: '10', name: 'Pineapple', image: 'https://img.icons8.com/color/96/000000/pineapple.png' },
  { id: '11', name: 'Strawberry', image: 'https://img.icons8.com/color/96/000000/strawberry.png' },
  { id: '12', name: 'Watermelon', image: 'https://img.icons8.com/color/96/000000/watermelon.png' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('Apple'); // Picker mặc định
  const [filteredFruits, setFilteredFruits] = useState(fruits);

  // Xử lý tìm kiếm (AutoComplete)
  const handleSearch = (text) => {
    setSearch(text);
    if (text === '') {
      setFilteredFruits(fruits);
    } else {
      const filtered = fruits.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredFruits(filtered);
    }
  };

  // Khi chọn từ Picker (Spinner)
  const handlePickerChange = (value) => {
    setSelectedFruit(value);
    setSearch(value);           // đồng bộ với ô tìm kiếm
    handleSearch(value);        // lọc lưới theo lựa chọn
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        setSelectedFruit(item.name);
        setSearch(item.name);
      }}
    >
      <Image source={{ uri: item.image }} style={styles.fruitImage} />
      <Text style={styles.fruitName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <Text style={styles.title}>Fruit Selector</Text>

      {/* Picker (Spinner) */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Chọn trái cây (Spinner):</Text>
        <Picker
          selectedValue={selectedFruit}
          onValueChange={handlePickerChange}
          style={styles.picker}
        >
          {fruits.map(fruit => (
            <Picker.Item key={fruit.id} label={fruit.name} value={fruit.name} />
          ))}
        </Picker>
      </View>

      {/* Ô tìm kiếm + AutoComplete */}
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Tìm kiếm trái cây:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên trái cây (ví dụ: Pine...)"
          value={search}
          onChangeText={handleSearch}
          autoCapitalize="words"
        />
      </View>

      {/* GridView - danh sách lưới */}
      <FlatList
        data={filteredFruits}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy trái cây nào 😔</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Hiển thị trái cây đã chọn */}
      {selectedFruit !== '' && (
        <View style={styles.selectedContainer}>
          <Text style={styles.selectedText}>
            Bạn đã chọn: <Text style={{ fontWeight: 'bold' }}>{selectedFruit}</Text>
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 6,
    fontWeight: '600',
  },
  pickerContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#bdc3c7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  listContent: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fruitImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  fruitName: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#95a5a6',
    marginTop: 40,
  },
  selectedContainer: {
    padding: 20,
    backgroundColor: '#e8f5e9',
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 18,
    color: '#27ae60',
  },
});