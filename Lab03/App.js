import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  // State cho Checkbox (có thể chọn nhiều)
  const [check1, setCheck1] = useState(false);

  // State cho RadioButton (chỉ chọn 1)
  const [selectedRadio, setSelectedRadio] = useState('1'); // '1' hoặc '2'

  // State cho ImageButton (nhấn thì đổi ảnh hoặc hiện thông báo, ở đây đổi màu viền)
  const [imagePressed, setImagePressed] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lab 03</Text>
      <Text style={styles.sectionTitle}>Checkbox và RadioButton</Text>

      {/* Phần Checkbox & Radio giống Android native */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>Checkbox và RadioButton</Text>

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.optionRow}
          onPress={() => setCheck1(!check1)}
          activeOpacity={0.7}
        >
          <MaterialCommunityIcons
            name={check1 ? 'checkbox-marked' : 'checkbox-blank-outline'}
            size={28}
            color={check1 ? '#0066ff' : '#757575'}
          />
          <Text style={styles.optionText}>Chọn tùy chọn này</Text>
        </TouchableOpacity>

        {/* RadioGroup */}
        <View style={{ marginTop: 16 }}>
          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedRadio('1')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={selectedRadio === '1' ? 'radiobox-marked' : 'radiobox-blank'}
              size={28}
              color={selectedRadio === '1' ? '#0066ff' : '#757575'}
            />
            <Text style={styles.optionText}>Tùy chọn 1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionRow}
            onPress={() => setSelectedRadio('2')}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons
              name={selectedRadio === '2' ? 'radiobox-marked' : 'radiobox-blank'}
              size={28}
              color={selectedRadio === '2' ? '#0066ff' : '#757575'}
            />
            <Text style={styles.optionText}>Tùy chọn 2</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Phần ImageButton và ImageView */}
      <View style={styles.group}>
        <Text style={styles.groupTitle}>ImageButton và ImageView</Text>

        <TouchableOpacity
          style={[
            styles.imageButton,
            imagePressed && { borderColor: '#ff5722', borderWidth: 3 },
          ]}
          onPress={() => setImagePressed(!imagePressed)}
          activeOpacity={0.8}
        >
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            }}
            style={styles.astronautImage}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <Text style={styles.imageCaption}>
          {imagePressed ? 'Đã nhấn ImageButton!' : 'Nhấn vào ảnh astronaut để thử'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  group: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  groupTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#0066ff',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
  imageButton: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  astronautImage: {
    width: '100%',
    height: 280,
  },
  imageCaption: {
    marginTop: 12,
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
});