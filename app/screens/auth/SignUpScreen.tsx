import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUpScreen({ navigation }: any) {
    const theme = useTheme();
    const { signUp, isLoading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        signUp(name, email);
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <Text variant="displayMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        Create Account
                    </Text>
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
                        Join to start tracking attendance
                    </Text>
                </View>

                <Surface elevation={2} style={[styles.formContainer, { backgroundColor: theme.colors.surface, borderRadius: theme.roundness }]}>
                    <TextInput
                        mode="outlined"
                        label="Full Name"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={handleSignUp}
                        loading={isLoading}
                        contentStyle={{ height: 50 }}
                        style={{ marginTop: 16 }}
                    >
                        Sign Up
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 8 }}
                    >
                        Already have an account? Login
                    </Button>
                </Surface>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    formContainer: {
        padding: 24,
    },
    input: {
        marginBottom: 16,
    }
});
