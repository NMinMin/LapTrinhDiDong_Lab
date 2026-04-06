import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ItemList from './components/ItemList';

export default function App() {
  // 'login' | 'register' | 'items'
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('');

  const navigation = {
    navigate: (name, params) => {
      setScreen(name.toLowerCase());
      if (params?.username) setUsername(params.username);
    },
    replace: (name, params) => {
      setScreen(name.toLowerCase());
      if (params?.username) setUsername(params.username);
    },
    goBack: () => setScreen('login'),
  };

  return (
    <SafeAreaView style={styles.container}>
      {screen === 'login' && (
        <LoginScreen navigation={navigation} />
      )}
      {screen === 'register' && (
        <RegisterScreen navigation={navigation} />
      )}
      {screen === 'itemlist' && (
        <ItemList navigation={navigation} username={username} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
  },
});
