import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    Alert, 
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

// Cấu hình API URL với IP mới nhất
const API_URL = 'http://10.0.14.251:3000/items';

const ItemList = ({ navigation, username }) => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchItems = useCallback(async () => {
        try {
            const response = await axios.get(API_URL, { timeout: 10000 }); // Thêm timeout 10s
            setItems(response.data);
        } catch (error) {
            console.error('Fetch error:', error);
            Alert.alert('Lỗi Kết Nối', `Không thể lấy dữ liệu từ server. \nĐịa chỉ: ${API_URL}\nLỗi: ${error.message}\n\nHãy đảm bảo điện thoại và máy tính cùng dùng chung Wi-Fi.`);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchItems();
        setRefreshing(false);
    }, [fetchItems]);

    const handleSave = async () => {
        if (!name.trim() || !description.trim()) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ Tên và Mô tả.');
            return;
        }

        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, { name, description });
                Alert.alert('Thành công', 'Đã cập nhật thông tin item.');
            } else {
                await axios.post(API_URL, { name, description });
                Alert.alert('Thành công', 'Đã thêm item mới vào danh sách.');
            }
            
            setName('');
            setDescription('');
            setEditingId(null);
            fetchItems();
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể lưu dữ liệu. Lỗi: ' + error.message);
        }
    };

    const handleEdit = (item) => {
        setName(item.name);
        setDescription(item.description);
        setEditingId(item._id);
    };

    const handleDelete = async (id) => {
        Alert.alert(
            'Xác nhận',
            'Bạn có chắc chắn muốn xoá item này không?',
            [
                { text: 'Huỷ', style: 'cancel' },
                { 
                    text: 'Xoá', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(`${API_URL}/${id}`);
                            fetchItems();
                        } catch (error) {
                            Alert.alert('Lỗi', 'Không thể xoá item này.');
                        }
                    }
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardContent}>
                <View style={styles.itemHeader}>
                    <View style={styles.itemIconContainer}>
                        <Text style={styles.itemIconText}>{item.name.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={styles.itemInfo}>
                        <Text style={styles.itemName}>{item.name}</Text>
                        <Text style={styles.itemDesc} numberOfLines={2}>{item.description}</Text>
                    </View>
                </View>
                <View style={styles.cardActions}>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.editBtn]} 
                        onPress={() => handleEdit(item)}
                    >
                        <Text style={styles.actionButtonText}>Sửa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.actionButton, styles.deleteBtn]} 
                        onPress={() => handleDelete(item._id)}
                    >
                        <Text style={styles.actionButtonText}>Xoá</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style="dark" />
            <View style={styles.headerContainer}>
                <View style={styles.headerTop}>
                    <View>
                        <Text style={styles.headerSubtitle}>QUẢN LÝ KHO</Text>
                        <Text style={styles.headerTitle}>Sản Phẩm</Text>
                    </View>
                    <TouchableOpacity 
                        style={styles.logoutBtn} 
                        onPress={() => navigation.replace('Login')}
                    >
                        <Text style={styles.logoutEmoji}>🚪</Text>
                    </TouchableOpacity>
                </View>
                {username && (
                    <Text style={styles.welcomeText}>Chào, <Text style={styles.usernameText}>{username}</Text> 👋</Text>
                )}
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Tên sản phẩm..."
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mô tả chi tiết..."
                    placeholderTextColor="#999"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity 
                    style={[styles.saveButton, editingId ? styles.updateButton : styles.addButton]} 
                    onPress={handleSave}
                    activeOpacity={0.8}
                >
                    <Text style={styles.saveButtonText}>
                        {editingId ? "CẬP NHẬT THÔNG TIN" : "THÊM MỚI SẢN PHẨM"}
                    </Text>
                </TouchableOpacity>
                
                {editingId && (
                    <TouchableOpacity 
                        style={styles.cancelButton}
                        onPress={() => {
                            setEditingId(null);
                            setName('');
                            setDescription('');
                        }}
                    >
                        <Text style={styles.cancelButtonText}>Huỷ chỉnh sửa</Text>
                    </TouchableOpacity>
                )}
            </View>

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#6200EE" />
                    <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    refreshControl={
                        <RefreshControl 
                            refreshing={refreshing} 
                            onRefresh={onRefresh} 
                            colors={['#6200EE']}
                            tintColor="#6200EE"
                        />
                    }
                    ListEmptyComponent={
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>Chưa có sản phẩm nào trong kho.</Text>
                            <TouchableOpacity onPress={fetchItems}>
                                <Text style={styles.retryText}>Thử tải lại</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />
            )}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FD',
    },
    headerContainer: {
        paddingHorizontal: 25,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
        zIndex: 10,
    },
    headerSubtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6200EE',
        letterSpacing: 1.5,
        marginBottom: 4,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '900',
        color: '#1A1A1A',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logoutBtn: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#FFEAEA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutEmoji: {
        fontSize: 20,
    },
    welcomeText: {
        fontSize: 14,
        color: '#666',
        marginTop: 8,
    },
    usernameText: {
        fontWeight: 'bold',
        color: '#6200EE',
    },
    formContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#FFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    input: {
        backgroundColor: '#F1F3F9',
        height: 55,
        borderRadius: 12,
        paddingHorizontal: 15,
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    saveButton: {
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        shadowColor: '#6200EE',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    addButton: {
        backgroundColor: '#6200EE',
    },
    updateButton: {
        backgroundColor: '#03DAC6',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    cancelButton: {
        marginTop: 15,
        alignItems: 'center',
    },
    cancelButtonText: {
        color: '#F44336',
        fontWeight: '600',
    },
    listContent: {
        padding: 20,
        paddingTop: 5,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 2,
        overflow: 'hidden',
    },
    cardContent: {
        padding: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    itemIconContainer: {
        width: 45,
        height: 45,
        borderRadius: 12,
        backgroundColor: '#F1E9FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemIconText: {
        color: '#6200EE',
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    itemDesc: {
        fontSize: 14,
        color: '#666',
        lineHeight: 18,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopWidth: 1,
        borderTopColor: '#F1F1F1',
        paddingTop: 12,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 18,
        borderRadius: 8,
        marginLeft: 10,
    },
    editBtn: {
        backgroundColor: '#F1F3F9',
    },
    deleteBtn: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#FFEAEA',
    },
    actionButtonText: {
        fontWeight: 'bold',
        fontSize: 13,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    loadingText: {
        marginTop: 15,
        color: '#666',
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    retryText: {
        marginTop: 10,
        color: '#6200EE',
        fontWeight: 'bold',
    }
});

export default ItemList;
