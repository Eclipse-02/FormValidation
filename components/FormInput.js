import React, { forwardRef } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const FormInput = forwardRef(({ label, error, touched, ...props }, ref) => {
    const hasError = touched && error;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                ref={ref}
                style={[styles.input, hasError && styles.inputError]}
                {...props}
            />
            {hasError ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
});

const styles = StyleSheet.create({
    container: { marginBottom: 14 },
    label: { marginBottom: 6, fontWeight: '600' },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
    },
    inputError: {
        borderColor: 'red',
    },
    error: {
        color: 'red',
        marginTop: 4,
        fontSize: 12,
    },
});

export default FormInput;