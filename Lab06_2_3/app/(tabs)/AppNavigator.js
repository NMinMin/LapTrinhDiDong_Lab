import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FavoritesScreen from '../screens/FavoritesScreen';
import HistoryScreen from '../screens/HistoryScreen';
import HomeScreen from '../screens/HomeScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true, // Có thể đổi thành false nếu không muốn header
        drawerStyle: {
          backgroundColor: '#1E1E1E', // Nền drawer tối
          width: 280,
        },
        drawerActiveBackgroundColor: '#26A69A', // Nền item active (teal)
        drawerActiveTintColor: '#FFFFFF',       // Chữ + icon active: trắng
        drawerInactiveTintColor: '#B0BEC5',     // Chữ + icon inactive: xám nhạt
        drawerLabelStyle: {
          marginLeft: -8,
          fontSize: 15,
          fontWeight: '500',
        },
        drawerItemStyle: {
          marginHorizontal: 10,
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: 'Favorites',
          drawerIcon: ({ color, size }) => (
            <Icon name="heart" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          drawerLabel: 'History',
          drawerIcon: ({ color, size }) => (
            <Icon name="clock-time-outline" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          drawerLabel: 'Đăng xuất',
          drawerIcon: ({ size }) => (
            <Icon name="logout" color="#EF5350" size={size} />
          ),
          drawerLabelStyle: { color: '#EF5350' }, // Logout màu đỏ
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;