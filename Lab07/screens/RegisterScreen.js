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

const RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Lỗi', 'Mật khẩu xác nhận không khớp.');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API_BASE}/register`, { username, password }, { timeout: 10000 });
            setLoading(false);
            Alert.alert('Đăng ký thành công!', 'Tài khoản của bạn đã được tạo. Hãy đăng nhập để tiếp tục.', [
                { text: 'Đăng nhập ngay', onPress: () => navigation.navigate('Login') }
            ]);
        } catch (error) {
            setLoading(false);
            const msg = error.response?.data?.message || 'Không thể kết nối đến server.';
            Alert.alert('Đăng ký thất bại', msg);
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
                        <Text style={styles.logoEmoji}>✨</Text>
                    </View>
                    <Text style={styles.welcomeText}>Join Community</Text>
                    <Text style={styles.brandText}>REGISTRATION</Text>
                </View>

                <View style={styles.glassCard}>
                    <Text style={styles.cardTitle}>Create Account</Text>
                    
                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>CHOOSE USERNAME</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Unique username"
                            placeholderTextColor="#A0A0A0"
                            value={username}
                            onChangeText={setUsername}
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.label}>PASSWORD</Text>
                        <View style={styles.passwordContainer}>
                            <TextInput
                                style={styles.passwordInput}
                                placeholder="Min. 6 characters"
                                placeholderTextColor="#A0A0A0"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={!showPassword}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                                <EyeIcon slashed={showPassword} color="#06B6D4" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.inputWrapper, { marginBottom: 30 }]}>
                        <Text style={styles.label}>CONFIRM PASSWORD</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Repeat password"
                            placeholderTextColor="#A0A0A0"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={!showPassword}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.registerBtn, loading && styles.disabledBtn]}
                        onPress={handleRegister}
                        activeOpacity={0.8}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.registerBtnText}>GET STARTED</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.footerSection}>
                    <Text style={styles.footerText}>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.loginLink}>LOGIN HERE</Text>
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
        top: -30,
        left: -40,
        width: 180,
        height: 180,
        borderRadius: 90,
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
    },
    circle2: {
        position: 'absolute',
        bottom: 50,
        right: -30,
        width: 130,
        height: 130,
        borderRadius: 65,
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
    },
    inner: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 24,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 35,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 15,
    },
    logoEmoji: {
        fontSize: 40,
    },
    welcomeText: {
        fontSize: 14,
        color: '#06B6D4',
        fontWeight: 'bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    brandText: {
        fontSize: 28,
        fontWeight: '900',
        color: '#FFFFFF',
        marginTop: 5,
    },
    glassCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 30,
        padding: 25,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 25,
        textAlign: 'center',
    },
    inputWrapper: {
        marginBottom: 15,
    },
    label: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#06B6D4',
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        height: 52,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    passwordInput: {
        flex: 1,
        height: 52,
        paddingHorizontal: 16,
        fontSize: 15,
        color: '#FFFFFF',
    },
    eyeBtn: {
        paddingHorizontal: 12,
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
        width: 20,
        height: 10,
        borderWidth: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    eyeIris: {
        width: 5,
        height: 5,
        borderRadius: 2.5,
    },
    eyeSlash: {
        position: 'absolute',
        width: 24,
        height: 2,
        transform: [{ rotate: '45deg' }],
    },
    registerBtn: {
        height: 55,
        backgroundColor: '#06B6D4',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#06B6D4',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
    },
    disabledBtn: {
        backgroundColor: '#475569',
    },
    registerBtnText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    footerSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35,
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 13,
    },
    loginLink: {
        color: '#06B6D4',
        fontWeight: 'bold',
        fontSize: 13,
        marginLeft: 8,
    },
});

export default RegisterScreen;
