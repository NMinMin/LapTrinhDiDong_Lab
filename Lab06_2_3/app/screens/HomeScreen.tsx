// screens/HomeScreen.tsx  hoặc app/(tabs)/index.tsx
import React, { useEffect, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getToken, removeToken } from '../utils/auth'; // điều chỉnh path
import LoginScreen from './LoginScreen'; // nếu cùng folder

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const storedToken = await getToken();
      setToken(storedToken);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: async () => {
            await removeToken();
            setToken(null);
            Alert.alert('Thành công', 'Đã đăng xuất!');
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Đang tải...</Text>
      </View>
    );
  }

  // Nếu chưa đăng nhập → hiển thị Login
  if (!token) {
    return <LoginScreen onLoginSuccess={() => setToken('logged_in')} />;
  }

  // Đã đăng nhập → hiển thị Home
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.tokenText}>
        JWT Token: {token ? token.substring(0, 20) + '...' : 'your_jwt_token_here'}
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Các nút khác nếu cần */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.buttonText}>Đi đến Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  tokenText: {
    fontSize: 16,
    color: '#a0a0c0',
    marginBottom: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3a3a5c',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 12,
    marginTop: 40,
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;