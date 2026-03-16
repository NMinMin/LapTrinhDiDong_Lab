// app/(tabs)/index.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Dữ liệu sản phẩm với hình ảnh từ Unsplash (miễn phí, đẹp)
const products = [
    {
    id: '1',
    name: 'Phở bò',
    description: 'Phở bò truyền thống với nước dùng đậm đà, bánh phở mềm và thịt bò tươi ngon.',
    color: '#FF9F1C',
    image:
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '2',
    name: 'Bánh mì',
    description: 'Bánh mì giòn rụm kẹp thịt, pate, rau sống và nước sốt đặc trưng.',
    color: '#2EC4B6',
    image:
      'https://cdn.tcdulichtphcm.vn/upload/1-2025/images/2025-03-25/1742898009-1733822683-lpf---b--nh-m--23--1-.jpg',
  },
  {
    id: '3',
    name: 'Bún bò Huế',
    description: 'Bún bò Huế cay nhẹ, nước dùng thơm mùi sả, ăn kèm thịt bò và giò heo.',
    color: '#E71D36',
    image:
      'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '4',
    name: 'Cơm tấm',
    description: 'Cơm tấm sườn nướng thơm lừng, ăn kèm bì, chả trứng và nước mắm chua ngọt.',
    color: '#FFBF69',
    image:
      'https://images.unsplash.com/photo-1625943555419-56a2cb596640?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: '5',
    name: 'Gỏi cuốn',
    description: 'Gỏi cuốn tươi mát với tôm, thịt, rau sống và chấm nước mắm hoặc tương đậu.',
    color: '#70C1B3',
    image:
      'https://img.mservice.com.vn/common/u/05e07d15ed1a84ee51cdfe60756960e55412b5dcd748a2e496a53522eb6597fa/a92fad01-ebe5-47ea-b676-c882af21a5fdyeyx5mj6.jpg',
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <Text style={styles.title}>Danh sách món ăn</Text>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {products.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.card, { backgroundColor: item.color }]}
            activeOpacity={0.85}
            onPress={() => {
              router.push({
                pathname: '/(tabs)/detail', // hoặc '/detail' tùy cấu trúc folder
                params: {
                  productName: item.name,
                  productDesc: item.description,
                  productImage: item.image,
                },
              });
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardSubtitle}>Xem chi tiết →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2937',
    textAlign: 'center',
    marginBottom: 32,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
});