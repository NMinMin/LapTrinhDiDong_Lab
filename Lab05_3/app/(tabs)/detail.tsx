// app/(tabs)/detail.tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function DetailScreen() {
  const router = useRouter();
  const { productName, productDesc, productImage } = useLocalSearchParams<{
    productName: string;
    productDesc: string;
    productImage?: string;
  }>();

  return (
    <View style={[styles.container, { backgroundColor: '#ffffff' }]}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.detailTitle}>Chi tiết sản phẩm</Text>

      <View style={styles.detailCard}>
        {productImage && (
          <Image
            source={{ uri: productImage }}
            style={styles.detailProductImage}
            resizeMode="contain"
          />
        )}

        <Text style={styles.detailName}>
          {productName || 'Không có thông tin'}
        </Text>

        <Text style={styles.detailDesc}>
          {productDesc || 'Hello from Home!'}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>QUAY LẠI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  detailTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 40,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 32,
    marginHorizontal: 24,
    marginBottom: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    alignItems: 'center',
  },
  detailProductImage: {
    width: 220,
    height: 220,
    borderRadius: 16,
    marginBottom: 24,
  },
  detailName: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  detailDesc: {
    fontSize: 17,
    color: '#4b5563',
    lineHeight: 28,
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 18,
    borderRadius: 16,
    marginHorizontal: 40,
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});