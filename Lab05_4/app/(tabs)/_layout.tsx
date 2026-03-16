// app/(tabs)/_layout.tsx
import Ionicons from '@expo/vector-icons/Ionicons'; // ← Import Ionicons
import { Tabs } from 'expo-router';
import { StatusBar } from 'react-native';

export default function TabsLayout() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: '#1a1a2e', 
            borderTopWidth: 0,
            elevation: 0,  // Xóa bóng Android nếu cần
          },
          tabBarActiveTintColor: '#00d4ff',
          tabBarInactiveTintColor: '#a0a0c0',
          tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        }}
      >
        <Tabs.Screen
          name="index"  // Real Time Clock
          options={{
            title: 'Thời gian thực',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "time" : "time-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="alarm"
          options={{
            title: 'Báo thức',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "alarm" : "alarm-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="stopwatch"
          options={{
            title: 'Bấm giờ',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "stopwatch" : "stopwatch-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
        
        <Tabs.Screen
          name="countdown"
          options={{
            title: 'Đếm ngược',
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons 
                name={focused ? "hourglass" : "hourglass-outline"} 
                size={size} 
                color={color} 
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}