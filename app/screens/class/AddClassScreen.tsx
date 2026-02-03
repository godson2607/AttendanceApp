import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Text, TextInput, Button, useTheme, Surface, Appbar } from 'react-native-paper';
import { ClassService } from '../../services/ClassService';
import { useAuth } from '../../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

export default function AddClassScreen({ navigation }: Props) {
    const theme = useTheme();
    const [className, setClassName] = useState('');
    const [schedule, setSchedule] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();

    const handleCreate = async () => {
        if (!user) {
            alert('You must be logged in to create a class.');
            return;
        }
        if (!className.trim()) {
            alert('Class name is required.');
            return;
        }

        setLoading(true);
        try {
            await ClassService.addClass(className, schedule, user.uid);
            navigation.goBack();
        } catch (error) {
            console.error('Error creating class:', error);
            alert('Failed to create class. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Appbar.Content title="New Class" />
            </Appbar.Header>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <Text variant="titleMedium" style={{ color: theme.colors.onSurfaceVariant, marginBottom: 16 }}>
                    Enter class details to start tracking attendance.
                </Text>

                <Surface elevation={0} style={[styles.form, { backgroundColor: 'transparent' }]}>
                    <TextInput
                        mode="outlined"
                        label="Class Name"
                        placeholder="e.g. Mathematics 101"
                        value={className}
                        onChangeText={setClassName}
                        style={styles.input}
                    />
                    <TextInput
                        mode="outlined"
                        label="Schedule / Time"
                        placeholder="e.g. Mon, Wed 10:00 AM"
                        value={schedule}
                        onChangeText={setSchedule}
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={handleCreate}
                        loading={loading}
                        disabled={!className}
                        style={{ marginTop: 24 }}
                        contentStyle={{ height: 48 }}
                    >
                        Create Class
                    </Button>
                </Surface>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    form: {
        marginTop: 10,
    },
    input: {
        marginBottom: 16,
    }
});
