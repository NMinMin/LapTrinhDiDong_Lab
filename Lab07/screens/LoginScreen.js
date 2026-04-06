import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    StyleSheet, Alert, KeyboardAvoidingView,
    Platform, ActivityIndicator, ScrollView,
    Dimensions
} from 'react-native';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');
const API_BASE = 'http://10.0.14.251:3000';

// Tự vẽ Icon Con Mắt bằng View để tránh lỗi thư viện
const EyeIcon = ({ slashed, color }) => (
    <View style={styles.eyeContainer}>
        {/* Vỏ ngoài con mắt */}
        <View style={[styles.eyeOuter, { borderColor: color }]}>
            {/* Tròng mắt */}
            <View style={[styles.eyeIris, { backgroundColor: color }]} />
        </View>
        {/* Dấu gạch chéo */}
        {slashed && <View style={[styles.eyeSlash, { backgroundColor: color }]} />}
    </View>
);

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE}/login`, { username, password }, { timeout: 10000 });
            setLoading(false);
            Alert.alert('Thành công', `Chào mừng, ${response.data.username}!`, [
                { text: 'Tiếp tục', onPress: () => navigation.replace('ItemList') }
            ]);
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || 'Không thể kết nối đến server.';
            Alert.alert('Đăng nhập thất bại', msg);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <StatusBar style="light" />
            
            <View style={styles.circle1} />
            <View style={styles.circle2} />

            <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Text style={styles.logoEmoji}>🛡️</Text>
                    </View>
                    <Text style={styles.welcomeText}>Welcome Back</Text>
                    <Text style={styles.brandText}>LHU PORTAL</Text>
                </View>

                <View style={styles.glassCard}>
                    <Text style={styles.cardTitle}>Sign In</Text>
                    
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your username"
                            placeholderTextColor="#A0A0A0"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={[styles.inputWrapper, { marginBottom: 30 }]}>
                        <Text style={styles.label}>PASSWORD</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Type your password"
                                placeholderTextColor="#A0A0A0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                                <EyeIcon slashed={showPassword} color="#6366F1" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.loginBtn, loading && styles.disabledBtn]}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginBtnText}>LOGIN ACCESS</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>New member?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={styles.registerLink}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A',
    },
    circle1: {
        position: 'absolute',
        top: -50,
        right: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
    },
    circle2: {
        position: 'absolute',
        bottom: -20,
        left: -50,
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
    },
    inner: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoContainer: {
        width: 90,
        height: 90,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 20,
    },
    logoEmoji: {
        fontSize: 45,
    },
    welcomeText: {
        fontSize: 16,
        color: '#6366F1',
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    brandText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: 5,
    },
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 30,
        padding: 30,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#6366F1',
        marginBottom: 10,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        height: 55,
        borderRadius: 15,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    passwordInput: {
        flex: 1,
        height: 55,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFFFFF',
    },
    eyeBtn: {
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // CSS Vẽ Icon
    eyeContainer: {
        width: 30,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeOuter: {
        width: 22,
        height: 12,
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeIris: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    eyeSlash: {
        position: 'absolute',
        width: 26,
        height: 2,
        transform: [{ rotate: '45deg' }],
    },
    loginBtn: {
        height: 60,
        backgroundColor: '#6366F1',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366F1',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    disabledBtn: {
        backgroundColor: '#475569',
    },
    loginBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 14,
    },
    registerLink: {
        color: '#6366F1',
        fontWeight: 'bold',
        fontSize: 14,
        marginLeft: 8,
    },
});

export default LoginScreen;
