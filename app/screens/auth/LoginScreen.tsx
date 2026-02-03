import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }: any) {
    const theme = useTheme();
    const { signInWithGoogle, isLoading } = useAuth();

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <View style={styles.header}>
                    <Text variant="displayMedium" style={{ color: theme.colors.primary, fontWeight: 'bold' }}>
                        Welcome Back
                    </Text>
                    <Text variant="bodyLarge" style={{ color: theme.colors.onSurfaceVariant, marginTop: 8 }}>
                        Sign in to manage your classes
                    </Text>
                </View>

                <Surface elevation={2} style={[styles.formContainer, { backgroundColor: theme.colors.surface, borderRadius: theme.roundness }]}>
                    <Button
                        mode="contained"
                        onPress={() => signInWithGoogle()}
                        loading={isLoading}
                        icon="google"
                        contentStyle={{ height: 50 }}
                        style={{ marginTop: 16, backgroundColor: theme.colors.primary }}
                    >
                        Sign in with Google
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
