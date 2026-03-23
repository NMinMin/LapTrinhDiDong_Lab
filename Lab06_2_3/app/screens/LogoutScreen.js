import { Alert, Button, StyleSheet, Text, View } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    Alert.alert(
      'Xác nhận',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đăng xuất',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Thông báo', 'Bạn đã đăng xuất!');
            // Reset về Home (hoặc về Login nếu có màn login)
            navigation.reset({
              index: 0,
              routes: [{ name: 'Home' }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Đăng xuất</Text>
      <Button title="Xác nhận đăng xuất" onPress={handleLogout} color="#EF5350" />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20 },
});

export default LogoutScreen;