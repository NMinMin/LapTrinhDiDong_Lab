// App.js
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { 
  createDrawerNavigator, 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerItem 
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const itemWidth = (width - 60) / 2; // 2 cột

// ────────────────────────────────────────────────
// DANH SÁCH MÓN ĂN (HomeScreen)
// ────────────────────────────────────────────────
const foodData = [
  { id: 1, name: 'Pizza Margherita', price: '180.000đ', image: 'https://images.unsplash.com/photo-1600028068383-ea11a7a101f3?w=500' },
  { id: 2, name: 'Burger Bò Phô Mai', price: '95.000đ', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
  { id: 3, name: 'Sushi Cá Hồi', price: '220.000đ', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500' },
  { id: 4, name: 'Phở Bò Truyền Thống', price: '85.000đ', image: 'https://images.unsplash.com/photo-1617098900591-3cecff1e6d7d?w=500' },
  { id: 5, name: 'Bún Bò Huế', price: '75.000đ', image: 'https://images.unsplash.com/photo-1555126634-00d8097c5b5d?w=500' },
  { id: 6, name: 'Cơm Tấm Sườn Nướng', price: '65.000đ', image: 'https://images.unsplash.com/photo-1563245372-f217cd3f99b3?w=500' },
  { id: 7, name: 'Gà Rán KFC Style', price: '120.000đ', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500' },
  { id: 8, name: 'Mì Ý Carbonara', price: '145.000đ', image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500' },
  { id: 9, name: 'Trà Sữa Trân Châu', price: '45.000đ', image: 'https://images.unsplash.com/photo-1559591937-9a11655c2e3c?w=500' },
  { id: 10, name: 'Bánh Mì Thịt Nướng', price: '40.000đ', image: 'https://images.unsplash.com/photo-1559054663-e8d23213f55c?w=500' },
  { id: 11, name: 'Salad Trộn Caesar', price: '110.000đ', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500' },
  { id: 12, name: 'Chè Thái', price: '35.000đ', image: 'https://images.unsplash.com/photo-1563729783412-159409d089b2?w=500' },
];

function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Thực Đơn - 12 Món Ngon</Text>

      <View style={styles.grid}>
        {foodData.map(item => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

// ────────────────────────────────────────────────
// MÀN HÌNH KHÁC (Favorites, History, Login)
// ────────────────────────────────────────────────
function FavoritesScreen() {
  return (
    <View style={centerStyle}>
      <Text>Món yêu thích của bạn</Text>
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={centerStyle}>
      <Text>Lịch sử đơn hàng</Text>
    </View>
  );
}

function LoginScreen({ navigation }) {
  const handleLogin = async () => {
    const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.jwt.token.example';
    await AsyncStorage.setItem('userToken', fakeToken);
    navigation.replace('Home');
  };

  return (
    <View style={centerStyle}>
      <Text style={{ fontSize: 26, marginBottom: 30, fontWeight: 'bold' }}>Đăng Nhập</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={{ color: 'white', fontSize: 18 }}>Đăng nhập (Demo)</Text>
      </TouchableOpacity>
    </View>
  );
}

// ────────────────────────────────────────────────
// CUSTOM DRAWER CONTENT
// ────────────────────────────────────────────────
function CustomDrawerContent(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsLoggedIn(!!token);
    };
    checkToken();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    props.navigation.replace('Login');
  };

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: '#1e3a8a' }}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerHeaderText}>Nhạc Food</Text>
      </View>

      <DrawerItemList {...props} />

      {isLoggedIn && (
        <DrawerItem
          label="Đăng xuất"
          onPress={handleLogout}
          icon={({ size }) => <Icon name="logout" color="#ff6b6b" size={size} />}
          labelStyle={{ color: '#ff6b6b', fontWeight: 'bold' }}
        />
      )}
    </DrawerContentScrollView>
  );
}

// ────────────────────────────────────────────────
// NAVIGATOR
// ────────────────────────────────────────────────
const Drawer = createDrawerNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) setInitialRoute('Home');
    };
    checkToken();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={initialRoute}
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: '#1e3a8a' },
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: '#d1d5db',
          drawerLabelStyle: { fontSize: 16, marginLeft: -15 },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            drawerLabel: 'Trang chủ',
            drawerIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
          }}
        />

        <Drawer.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            drawerLabel: 'Yêu thích',
            drawerIcon: ({ color, size }) => <Icon name="heart" color={color} size={size} />,
          }}
        />

        <Drawer.Screen
          name="History"
          component={HistoryScreen}
          options={{
            drawerLabel: 'Lịch sử',
            drawerIcon: ({ color, size }) => <Icon name="history" color={color} size={size} />,
          }}
        />

        <Drawer.Screen
          name="Login"
          component={LoginScreen}
          options={{ drawerItemStyle: { display: 'none' } }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

// ────────────────────────────────────────────────
// STYLES
// ────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#d32f2f',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: itemWidth,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 15,
    color: '#e91e63',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 12,
  },
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  drawerHeaderText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  loginBtn: {
    backgroundColor: '#d32f2f',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
});

const centerStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f8f9fa',
};