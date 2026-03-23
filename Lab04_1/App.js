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
  { id: '1', name: 'Apple', image: 'https://img.icons8.com/color/96/apple.png' },
  { id: '2', name: 'Banana', image: 'https://img.icons8.com/color/96/banana.png' },
  { id: '3', name: 'Cherry', image: 'https://img.icons8.com/color/96/cherry.png' },
  { id: '4', name: 'Grapes', image: 'https://img.icons8.com/color/96/grapes.png' },
  { id: '5', name: 'Kiwi', image: 'https://img.icons8.com/color/96/kiwi.png' },
  { id: '6', name: 'Lemon', image: 'https://img.icons8.com/color/96/lemon.png' },
  { id: '7', name: 'Mango', image: 'https://img.icons8.com/color/96/mango.png' },
  { id: '8', name: 'Orange', image: 'https://img.icons8.com/color/96/orange.png' },
  { id: '9', name: 'Papaya', image: 'https://img.icons8.com/color/96/papaya.png' },
  { id: '10', name: 'Pineapple', image: 'https://img.icons8.com/color/96/pineapple.png' },
  { id: '11', name: 'Strawberry', image: 'https://img.icons8.com/color/96/strawberry.png' },
  { id: '12', name: 'Watermelon', image: 'https://img.icons8.com/color/96/watermelon.png' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [selectedFruit, setSelectedFruit] = useState('Apple');
  const [filteredFruits, setFilteredFruits] = useState(fruits);
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = (text) => {
    setSearch(text);

    if (text === '') {
      setFilteredFruits(fruits);
      setSuggestions([]);
      return;
    }

    const filtered = fruits.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredFruits(filtered);
    setSuggestions(filtered);
  };

  const handlePickerChange = (value) => {
    setSelectedFruit(value);
    setSearch(value);

    const filtered = fruits.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredFruits(filtered);
    setSuggestions([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.gridItem}
      onPress={() => {
        setSelectedFruit(item.name);
        setSearch(item.name);
        setSuggestions([]);
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

      {/* Spinner */}
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Chọn trái cây (Spinner)</Text>
        <Picker
          selectedValue={selectedFruit}
          onValueChange={handlePickerChange}
          style={styles.picker}
        >
          {fruits.map(fruit => (
            <Picker.Item
              key={fruit.id}
              label={fruit.name}
              value={fruit.name}
            />
          ))}
        </Picker>
      </View>

      {/* Search + AutoComplete */}
      <View style={styles.searchContainer}>
        <Text style={styles.label}>Tìm kiếm trái cây</Text>

        <TextInput
          style={styles.input}
          placeholder="Nhập tên trái cây..."
          value={search}
          onChangeText={handleSearch}
        />

        {suggestions.length > 0 && (
          <View style={styles.suggestionBox}>
            {suggestions.map(item => (
              <TouchableOpacity
                key={item.id}
                style={styles.suggestionItem}
                onPress={() => {
                  setSearch(item.name);
                  setSelectedFruit(item.name);
                  setSuggestions([]);
                }}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* GridView */}
      <FlatList
        data={filteredFruits}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không tìm thấy trái cây</Text>
        }
        contentContainerStyle={styles.listContent}
      />

      {/* Selected */}
      <View style={styles.selectedContainer}>
        <Text style={styles.selectedText}>
          Bạn đã chọn: <Text style={{ fontWeight: 'bold' }}>{selectedFruit}</Text>
        </Text>
      </View>

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
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },

  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },

  pickerContainer: {
    paddingHorizontal: 20,
  },

  picker: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },

  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  suggestionBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 4,
  },

  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  listContent: {
    paddingHorizontal: 10,
    marginTop: 10,
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
    elevation: 3,
  },

  fruitImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },

  fruitName: {
    fontSize: 16,
    fontWeight: '600',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 18,
    color: '#888',
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