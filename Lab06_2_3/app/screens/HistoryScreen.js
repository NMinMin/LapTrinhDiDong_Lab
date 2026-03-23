import { StyleSheet, Text, View } from 'react-native';

const HistoryScreen = () => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Lịch sử đặt phòng</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
});

export default HistoryScreen;