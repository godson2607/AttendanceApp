import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// App Screens
import DashboardScreen from '../screens/DashboardScreen';
import AddClassScreen from '../screens/class/AddClassScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
    const theme = useTheme();
    const { user, isLoading } = useAuth(); // Assuming isLoading is part of AuthContext

    if (isLoading) {
        // Maybe return a splash screen here
        return null;
    }

    return (
        <NavigationContainer theme={theme as any}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: theme.colors.background,
                    },
                    headerTintColor: theme.colors.onBackground,
                    contentStyle: {
                        backgroundColor: theme.colors.background,
                    },
                }}
            >
                {!user ? (
                    // Auth Stack
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
                    </>
                ) : (
                    // App Stack
                    <>
                        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerTitle: 'Classroom' }} />
                        <Stack.Screen name="AddClass" component={AddClassScreen} options={{ headerShown: false }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
