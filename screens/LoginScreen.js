import React, { useState } from 'react';
import {
    View,
    Button,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

export default function LoginScreen({ navigation }) {
    const [loginError, setLoginError] = useState('');

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={KEYBOARD_BEHAVIOR}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={async (values) => {
                        const savedUser = JSON.parse(await AsyncStorage.getItem('registeredUser'));

                        if (
                            savedUser?.email === values.email &&
                            savedUser?.password === values.password
                        ) {
                            navigation.navigate('Home');
                        } else {
                            Alert.alert('Login Failed', 'Invalid email or password');
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <FormInput
                                label="Email"
                                placeholder="Enter email"
                                autoCapitalize="none"
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                error={errors.email || loginError}
                                touched={touched.email || !!loginError}
                            />

                            <FormInput
                                label="Password"
                                placeholder="Enter password"
                                secureTextEntry
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                error={errors.password}
                                touched={touched.password}
                            />

                            <Button title="Login" onPress={handleSubmit} />
                        </>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flexGrow: 1,
        justifyContent: 'center',
    },
});