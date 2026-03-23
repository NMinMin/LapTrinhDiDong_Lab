// utils/auth.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = '@jwt_token';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (e) {
    console.error('Lỗi lưu token:', e);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (e) {
    console.error('Lỗi đọc token:', e);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    console.error('Lỗi xóa token:', e);
  }
};

export const isLoggedIn = async () => {
  const token = await getToken();
  return !!token; // true nếu có token
};