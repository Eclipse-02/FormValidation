import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const saved = await AsyncStorage.getItem('registeredUser');
            if (saved) {
                setUser(JSON.parse(saved));
            }
        };

        loadUser();
    }, []);

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>No account data found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {user.profilePhoto && (
                <Image source={{ uri: user.profilePhoto }} style={styles.avatar} />
            )}

            <Text style={styles.title}>Welcome, {user.name}</Text>
            <Text style={styles.info}>Email: {user.email}</Text>
            <Text style={styles.info}>Phone: {user.phone}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    info: {
        fontSize: 16,
        marginBottom: 6,
    },
});