import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // padding 6*2 + gap

// Danh sách 12 món ăn (tên + giá + ảnh từ HTML của bạn)
const menuItems = [
  { name: 'Margherita Pizza', price: '$14.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJazCtFC1mVVET-xWfPatvqd6-P46KdUnjrxn_oj6sohqtXYKgxlkHCQASeuZQ84X-4z76_DetvMbVviF5MNLTtBEjeCNp6gGaBYPKuTofw7sO5xqahzjR0-n_V9oxSEqrtmpiZJPj8XFfR07zmrEEaK88aKaqi8BToIure0wGL_RoOnacTYz2l82ofp-EU9wfVAIWbS09us4xhDec4tpq8ASCrsBVpR9-bVc3XgeFuD3fFJ1t_j9PyuBNxADjCYl8xpOw-pnCDFU', offset: false },
  { name: 'Truffle Burger', price: '$18.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOFkYV3w-2CsSHa94X1rX2AmjPUBJroK3UTKPLeXWEIr2UVVmGo2z_dU9j9NcUlkMpv58axmKBebomO1O-vvmL5m8tstVlSAth4inURUTuwZbYq9JFTzBfCjtrJeMCkworNEipQAWee6q_kxDRIQsh3r8uU0HG5HGaJXgZ0WtmJYPLYCwz6kts-8TN5yy1nlc3V0koHzN3dZc9NaBfvkHXxNZc5WXAQ-rVcJ3FYTUlzietfsNJRRMTdXd5eL78kgLBy0MIzIn8yVA', offset: true },
  { name: 'Dragon Roll', price: '$22.00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUKxCCpKI7mxn7SOPBVwfCNc3kv04Pa35X3LlWlyAJF-8zAf6HB-YQ9afXSOk7K8hjzZFENTgqu-1YJPePVHGDjgCF4NRg1zGex_-m6bdYunDGB5pbkFj1UYcydUSO5IbUMK-h44mTC30Ssj55zjyBePEgXteFSICF3cfN-eULTuASzYz7RI_QwEJyxPapeePvyhBmL25bKgPV3DCWXPBc6cn53fsM7gwPBOGPHrq4WSYYC1b4Qa3su4TUV1OD-Oi3C4bQyBqG8Y0', offset: false },
  { name: 'Garden Harvest', price: '$12.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIL9K3J3vYORobHHPAJyGtlelentea2U_INkXpElbtCks1xGdVxjAQYWwx-NPohpqMFYL1vvC4WA7OEIUQ42kZSK1D-wbzSAWMZKnJug8TSAYbgp_tixpOg1fV8vLA0mH352drVYjVkaMGfYRGA4V-ZnMWbxMO18NYU_Fkqw5l6E-ekee1c6TrZH8DzW3pg9dTqWzia8l9MdXXCVk_-tO7YqXbcMgfVCvnMGAYnZXNXng3rt8Ks8ResX8noG-TT2IEjS0RaCf1N80', offset: true },
  { name: 'Wild Mushroom', price: '$19.00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwIx9cIRtSjFmOwIIiKh8i5oqJhFbwVEsyj_cFJgNNsmF1cJ-tsYhBwhPMtu6Vv7-1oKqaPK3lgelrAvlvx8WX_p7NmRs4Ju7FzZ3EbLTdUGnPSqQg_65Pbio8bWlaGt44jHH3aC7q90PbKAvvi18nJEBk7kR4wO5Uxbjw5bCAtMMSElq7D2oHP2koYKA-Vhw8HOyA2JGlH86TEZM9bjiKrRFbcAa_TOdiiHVvdbTtaXiLF3y6jnLzYTUNK4tRPUeG9YxFsZg7q-4', offset: false },
  { name: 'Wagyu Prime', price: '$45.00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFCXyEXoUKJ4oUjQ4uFmZcaPGUQmyHAoHRvwiTQusfXElebCcL7Yo1P8gyvrVxZWCGTYgyO7Nr7i7nvHclZf_HMHjzn9dXqFET2tcuSLkd1aZl2jq2RV2Ud2mM0uUHOacM1SQ_1RcU9Y8FKvmAKkUzfRftX-wC0UPSKTshqI62ZbQ63pT9tUKJu4nJQ1oN_opdjTwedZigpE8Zqv16W_wHBJFeNgtm23O0kkY7ZZmu-okA7IPFP_1HwT3idt7PhGgqzqDewJvla-M', offset: true },
  { name: 'Tokyo Ramen', price: '$16.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPrPzsVmMwGI3W2GA3xCRsiXGRn05gP1mlaOGvOxrI5IN1l4Ztqga2Qxw3SQNkdu76iaukiL0HWAEo9GKexEfWf1Gsj8eDVNiGLxyJvViMv0E7A5G-mWOHvpinz_6p2GX58PKfwMd1q7R3bSZjravkHqJZnCPnr_3hxol5xQbmK15PvalnPpcnMNHBkmRrDGtCHX6g1aFdiYtj6WF7JNGyY7tj5HaoEaRDid56UfZqH6Q6W2NQokQZv6FRpMATdXUCBvLvTJFIP3o', offset: false },
  { name: 'Zen Poke Bowl', price: '$17.20', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKyNYx80u0jPe_hDzyrarBs9n0La3tZcpDltxQ_M2cV40dgoZP7M3TeCf7xT4GrKGqS17dr86c6agbqxPFNkSxLOFu97FoJR8QuoPu8l-4Fjb1cXIFtQDsbAyJt5msZT10WrBq30W--I22EwvMnJWfLk7C3ANUctpfJWxscallLN7FFoLNdGlMEYm1lkgNI31li9dIiCYXM-4MKtS6EYl0jOZ7zWRSIHAZinnUYr0t65YHPWe8ZTVcBUDCAAB6qCY3dsG1nxP013g', offset: true },
  { name: 'Carnitas Tacos', price: '$13.99', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBc8hAwdvcgrTzVAtCdh6mtagZxu5tgQRmq5ghRpbio7zHP76aA6HM1HqVsblk26NncjTYHKtSasL2xS3SYovmVzICafzaS-qUh1Em1sUY66yepQ1q4gcBLgj40ZNyRYDO5tz9omv0h0Th6L-d7w0EA-BEbHdZdct1oiQZPX5HL_BMVa9c96QO8m1iRZh0rOj9qZG2f6zo2k6EexYoKw26hmsM5SEcyzNj2d71P1kcFoReLC0VzwAUXScrh8iZjHtUBwIsFFTXaO2I', offset: false },
  { name: 'Honey Glazed', price: '$11.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaWeoTZg8wK1gswo1ewOH7_0pNBePGWMxETm2Rbf3f9UJx8kiGXhg1qK8-hEX-WwEu64uy-Q6riht4KOyYoRh0nOkn_bk4FYvjI97WKeHnK29BXouIk2M5yCpICVLOaMBNT1DfvaH9dxU61MIStEeF2vgODEaxIZNnJBIq9y1umOsa1PARqXK_DsKnQW7khM59A8VvY5m4DHQs7hnh7c17J_sFZhHSa3fEyNp5SyY4OtaZVanYw36__wQlT9fAZkrH9utQsMyLfQs', offset: true },
  { name: 'Maine Lobster', price: '$28.00', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4PDHe21LwJu5cDqUiY53D_qJ6Hq802Ah2RN4nlo5hgc1u8S1N_k8vkP7D4ZHgvQiUi3lyPewbkO0MZTnp-okJ9igAOXhIPeQfMBgrkW2R6-IelRercldRUNwtIuorTbJp3jJEGNuXN3xNoI8B1fYk_sYA_IPNwh3eAJZMfqYJ-JBHOuUn4U9ABQcN89Zl7wZgN6lXZPXBSUo7AzziInnooBIu9-dpLypskRQRgQuUrbdiF-OBH1tVAVYrf-XZspTlErAivNzTr_s', offset: false },
  { name: 'Berry Velvet', price: '$9.50', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJAdcIugSdjlirALxt_qhnjjayb4uKS5HDDwwzQl_VV1EC0TpkOJynAnaCw8Q5sGOTkYzR463bjL1MeFst3Ip6kPAYw5k5j35t5f-hQUdWvOcr7Izs_Z0JZI1M0rKAd1jTgcziwLeXrNFhpqmIvb6NncTxwCLyydDW-hRpVBdhz6yr_aRS7_udAyf2GEwziwuabY3cUDL4YbbkczMdvKMNZVzrP33bs-HQEV_288AgtJa6JH7mke--4Kkwu_Y4yVokZYO1enyLaZI', offset: true },
];

const FoodMenuScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff4f3" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity>
            <MaterialIcons name="menu" size={28} color="#a33800" />
          </TouchableOpacity>
          <Text style={styles.logo}>The Culinary Editorial</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="search" size={28} color="#a33800" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search & Filter */}
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.gridItem,
                item.offset && styles.gridItemOffset,
              ]}
            >
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>

                  <Text style={styles.itemPrice}>{item.price}</Text>

                  <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#a33800', '#ff7941']}
                      style={styles.addButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                      <MaterialCommunityIcons name="plus" size={16} color="#ffefeb" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.sectionTitle}>The Daily Selection</Text>
          <Text style={styles.sectionSubtitle}>
            Twelve masterpieces crafted for the discerning palate.
          </Text>
        </View>

        {/* Grid Items */}
        <View style={styles.grid}>
          {menuItems.map((item, index) => (
            <View
              key={index}
              style={[
                styles.gridItem,
                item.offset && styles.gridItemOffset,
              ]}
            >
              <View style={styles.card}>
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <TouchableOpacity activeOpacity={0.8}>
                    <LinearGradient
                      colors={['#a33800', '#ff7941']}
                      style={styles.addButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                      <MaterialCommunityIcons name="plus" size={16} color="#ffefeb" />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Khoảng trống cho bottom nav */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {[
          { icon: 'grid-view', label: 'Gallery' },
          { icon: 'shopping-bag', label: 'Orders' },
          { icon: 'favorite', label: 'Favorites' },
          { icon: 'person', label: 'Profile' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem}>
            <MaterialIcons name={item.icon as any} size={28} color="#4e212060" />
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff4f3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 80,
    backgroundColor: '#fff4f3',
    position: 'absolute',
    top: StatusBar.currentHeight || 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logo: {
    fontFamily: 'Epilogue', // cần load font Epilogue & Manrope trước (dùng expo-font hoặc link)
    fontWeight: '900',
    fontStyle: 'italic',
    fontSize: 24,
    color: '#a33800',
    letterSpacing: -0.5,
  },
  scrollView: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 24,
  },
  searchContainer: {
    marginBottom: 40,
    gap: 24,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffedeb',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#4e2120',
    fontFamily: 'Manrope',
  },
  chipScroll: {
    marginHorizontal: -24,
  },
  chipContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
  },
  chip: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#ffe1e0',
  },
  chipActive: {
    backgroundColor: '#9df197',
  },
  chipText: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 14,
    color: '#4e2120',
  },
  chipTextActive: {
    color: '#176a21',
  },
  titleSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: 'Epilogue',
    fontWeight: 'bold',
    fontSize: 32,
    color: '#4e2120',
    letterSpacing: -0.5,
  },
  sectionSubtitle: {
    fontFamily: 'Manrope',
    fontSize: 14,
    color: '#834c4b',
    marginTop: 4,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -12,
  },
  gridItem: {
    width: '50%',
    paddingHorizontal: 12,
    marginBottom: 32,
  },
  gridItemOffset: {
    transform: [{ translateY: 24 }],
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#4e2120',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 20,
    elevation: 8,
    flexGrow: 1,          
    flexShrink: 1,
  },
  imageWrapper: {
    aspectRatio: 1,
    overflow: 'hidden',
    backgroundColor: '#ffe1e0',
    flexGrow: 1,
    flexShrink: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  cardContent: {
    padding: 16,
    flex: 1,
  },
  itemName: {
    fontFamily: 'Epilogue',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#4e2120',
    lineHeight: 22,
    marginBottom: 8,
  },
  itemPrice: {
    fontFamily: 'Manrope',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#a33800',
    marginTop: 'auto',
  },
  addButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 999,
    gap: 8,
  },
  addButtonText: {
    fontFamily: 'Manrope',
    fontWeight: '600',
    fontSize: 12,
    color: '#ffefeb',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    paddingBottom: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: '#4e2120',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.06,
    shadowRadius: 40,
    elevation: 20,
    backdropFilter: 'blur(20px)', // chỉ iOS, RN không hỗ trợ native → có thể dùng expo-blur nếu cần
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  navLabel: {
    fontFamily: 'Manrope',
    fontWeight: '500',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    color: '#4e212060',
  },
});

export default FoodMenuScreen;