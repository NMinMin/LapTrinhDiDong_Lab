import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const FavoritesScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Danh sách yêu thích</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
});

export default FavoritesScreen;