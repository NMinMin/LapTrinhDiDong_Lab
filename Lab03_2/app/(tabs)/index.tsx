import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// Dữ liệu giữ nguyên
const menuData = [
  {
    title: 'Món chính',
    icon: 'restaurant',
    data: [
      { name: 'Phở bò', price: '65.000đ', image: 'https://bizweb.dktcdn.net/100/477/987/products/pho-bo-ha-noi-jpeg.jpg?v=1712628941747' },
      { name: 'Bún chả', price: '55.000đ', image: 'https://cdn.shopify.com/s/files/1/0725/3911/1726/files/20250617054400-andy-20cooks-20-20pork-20veg-20and-20noodles-20recipe.jpg?v=1750139042&width=800&height=600' },
      { name: 'Cơm tấm sườn nướng', price: '60.000đ', image: 'https://img.apmcdn.org/066c1884a970d8646fb61986892d38bd2c886f1d/uncropped/59621e-20220422-tst-com-tam-vietnamese-broken-rice-with-grilled-pork-chop-stock-photo-2000.jpg' },
      { name: 'Bánh cuốn nóng', price: '45.000đ', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNlHzL43qeOt2iKJaeI-3e_3buvX_4mNQa2w&s' },
      { name: 'Gỏi cuốn tôm thịt', price: '40.000đ', image: 'https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:format(webp):quality(75)/2023_10_23_638336957766719361_cach-lam-goi-cuon.jpg' },
    ],
  },
  {
    title: 'Món tráng miệng',
    icon: 'ice-cream',
    data: [
      { name: 'Chè thập cẩm', price: '30.000đ', image: 'https://vlstudies.com/wp-content/uploads/2024/03/che.jpg' },
      { name: 'Bánh flan caramel', price: '25.000đ', image: 'https://www.vietnamesefoodrecipes.com/wp-content/uploads/2024/10/IMG_7797-1.jpg' },
      { name: 'Kem dừa', price: '35.000đ', image: 'https://file.hstatic.net/200000721249/file/cach_lam_kem_dua_matcha_92c03c90fe6c4e22806e1126feedc319.jpg' },
    ],
  },
];

// Item món ăn - BỎ Animated scale, thay bằng opacity khi nhấn (fix sticky Android)
const MenuItem = ({ item }: { item: { name: string; price: string; image: string } }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.itemCard,
        pressed && { opacity: 0.8 }, // Hiệu ứng nhấn đơn giản, không dùng Animated
      ]}
      onPress={() => alert(`Bạn chọn: ${item.name}`)}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
      <Ionicons name="heart-outline" size={22} color="#EF4444" />
    </Pressable>
  );
};

// Header section đứng yên
const SectionHeader = ({ title, icon }: { title: string; icon: string }) => (
  <View style={styles.sectionHeader}>
    <Ionicons name={icon as any} size={24} color="#ffffff" style={styles.sectionIcon} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// Item FlatList ngang
const FlatItem = ({ item }: { item: string }) => (
  <View style={styles.flatItem}>
    <Text style={styles.flatItemText}>• {item}</Text>
  </View>
);

const MenuScreen = () => {
  const shortFlatData = ['Phở bò', 'Bún chả', 'Cơm tấm', 'Bánh cuốn', 'Gỏi cuốn', 'Chè thập cẩm'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      <View style={styles.appHeader}>
        <Text style={styles.appTitle}>Menu Ẩm Thực Việt</Text>
        <Text style={styles.appSubtitle}>Khám phá hương vị quen thuộc</Text>
      </View>

      <SectionList
        sections={menuData}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => <MenuItem item={item} />}
        renderSectionHeader={({ section }) => (
          <SectionHeader title={section.title} icon={section.icon} />
        )}
        stickySectionHeadersEnabled={true}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.sectionContent}
        
        // Fix sticky header trên Android
        overScrollMode="never"
        removeClippedSubviews={false}
        windowSize={21}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
      />

      <View style={styles.flatContainer}>
        <Text style={styles.flatTitle}>Các món phổ biến</Text>
        <FlatList
          data={shortFlatData}
          renderItem={({ item }) => <FlatItem item={item} />}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatContent}
        />
        <Text style={styles.moreText}>+ Xem thêm món...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  appHeader: {
    backgroundColor: '#3B82F6',
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  appSubtitle: {
    fontSize: 14,
    color: '#E0F2FE',
    marginTop: 4,
  },
  sectionContent: {
    paddingHorizontal: 12,
    paddingBottom: 120,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginVertical: 8,
    elevation: Platform.OS === 'android' ? 6 : 0,
    zIndex: 10,
  },
  sectionIcon: {
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemPrice: {
    fontSize: 15,
    color: '#3B82F6',
    marginTop: 4,
    fontWeight: '500',
  },
  separator: {
    height: 8,
    backgroundColor: 'transparent',
  },
  flatContainer: {
    backgroundColor: '#ffffff',
    margin: 16,
    padding: 16,
    borderRadius: 16,
    elevation: 4,
  },
  flatTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  flatContent: {
    paddingVertical: 8,
  },
  flatItem: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  flatItemText: {
    fontSize: 15,
    color: '#2563EB',
    fontWeight: '500',
  },
  moreText: {
    textAlign: 'center',
    color: '#3B82F6',
    marginTop: 12,
    fontWeight: '600',
  },
});

export default MenuScreen;