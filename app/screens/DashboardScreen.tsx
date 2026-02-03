import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, useTheme, Button, FAB } from 'react-native-paper';
import { useAuth } from '../context/AuthContext';

import { useIsFocused } from '@react-navigation/native';
import { ClassService } from '../services/ClassService';
export default function DashboardScreen({ navigation }: any) {
    const theme = useTheme();
    const { user } = useAuth();
    const [classes, setClasses] = React.useState<any[]>([]);
    const isFocused = useIsFocused(); // Re-fetch when screen is focused (e.g., coming back from AddClass)

    React.useEffect(() => {
        if (user?.uid) {
            loadClasses();
        }
    }, [user, isFocused]);

    const loadClasses = async () => {
        if (!user) return;
        try {
            const data = await ClassService.getClasses(user.uid);
            setClasses(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text variant="headlineMedium" style={{ color: theme.colors.onBackground, fontWeight: 'bold' }}>
                        Hello, {user?.displayName || 'Teacher'}
                    </Text>
                    <Text variant="titleMedium" style={{ color: theme.colors.primary }}>
                        Today's Overview
                    </Text>
                </View>

                <View style={styles.statsContainer}>
                    <Card style={[styles.statCard, { backgroundColor: theme.colors.secondaryContainer }]}>
                        <Card.Content>
                            <Text variant="headlineLarge" style={{ color: theme.colors.onSecondaryContainer, fontWeight: 'bold' }}>{classes.length}</Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.onSecondaryContainer }}>Classes</Text>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.statCard, { backgroundColor: theme.colors.primaryContainer }]}>
                        <Card.Content>
                            <Text variant="headlineLarge" style={{ color: theme.colors.onPrimaryContainer, fontWeight: 'bold' }}>--</Text>
                            <Text variant="bodyMedium" style={{ color: theme.colors.onPrimaryContainer }}>Avg Attendance</Text>
                        </Card.Content>
                    </Card>
                </View>

                <Text variant="titleLarge" style={{ color: theme.colors.onBackground, marginBottom: 12, marginTop: 24 }}>
                    Your Classes
                </Text>

                {classes.length === 0 ? (
                    <Text style={{ color: theme.colors.onSurfaceVariant }}>No classes added yet. Tap + to add one.</Text>
                ) : (
                    classes.map((cls, index) => (
                        <Card key={index} style={[styles.classCard, { backgroundColor: theme.colors.surface }]} onPress={() => { }}>
                            <Card.Title
                                title={cls.name}
                                subtitle={cls.schedule}
                                titleStyle={{ color: theme.colors.onSurface, fontWeight: 'bold' }}
                                subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
                                right={(props) => <Button {...props} onPress={() => { }}>Mark</Button>}
                            />
                        </Card>
                    ))
                )}

            </ScrollView>

            <FAB
                icon="plus"
                style={[styles.fab, { backgroundColor: theme.colors.primary }]}
                color={theme.colors.onPrimary}
                onPress={() => navigation.navigate('AddClass')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 80,
    },
    header: {
        marginBottom: 24,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    statCard: {
        flex: 1,
    },
    classCard: {
        marginBottom: 12,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});
