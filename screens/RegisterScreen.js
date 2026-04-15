import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    Button,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Animated,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormInput from '../components/FormInput';

const KEYBOARD_BEHAVIOR = Platform.OS === 'ios' ? 'padding' : 'height';

const fullSchema = Yup.object({
    name: Yup.string().min(3).required('Required'),
    email: Yup.string().email().required('Required'),
    phone: Yup.string().required('Required'),
    password: Yup.string().min(6).required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
});

const stepSchemas = [
    fullSchema.pick(['name', 'email', 'phone']),
    fullSchema.pick(['password', 'confirmPassword']),
    fullSchema,
];

export default function RegisterScreen({ navigation }) {
    const [step, setStep] = useState(0);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const fadeAnim = useState(new Animated.Value(1))[0];

    const emailRef = useRef();
    const phoneRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();

    const animateStep = (nextStep) => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 180,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
            }),
        ]).start();
        setStep(nextStep);
    };

    const getPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (password.length < 10) return 'Medium';
        return 'Strong';
    };

    const pickImage = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Permission is required to access gallery');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setProfilePhoto(result.assets[0].uri);
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1, paddingTop: 28 }}
            behavior={KEYBOARD_BEHAVIOR}
        >
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={stepSchemas[step]}
                    onSubmit={async (values) => {
                        if (step < 2) {
                            animateStep(step + 1);
                            return;
                        }

                        const payload = { ...values, profilePhoto };
                        await AsyncStorage.setItem('registeredUser', JSON.stringify(payload));
                        navigation.navigate('Login');
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
                        <Animated.View style={{ opacity: fadeAnim }}>
                            {step === 0 && (
                                <>
                                    <Text style={styles.stepTitle}>Step 1: Personal Data</Text>

                                    <FormInput
                                        label="Name"
                                        returnKeyType="next"
                                        onSubmitEditing={() => emailRef.current.focus()}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        error={errors.name}
                                        touched={touched.name}
                                    />

                                    <FormInput
                                        label="Email"
                                        ref={emailRef}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        onSubmitEditing={() => phoneRef.current.focus()}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        error={errors.email}
                                        touched={touched.email}
                                    />

                                    <FormInput
                                        label="Phone"
                                        ref={phoneRef}
                                        returnKeyType="done"
                                        value={values.phone}
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        error={errors.phone}
                                        touched={touched.phone}
                                    />
                                </>
                            )}

                            {step === 1 && (
                                <>
                                    <Text style={styles.stepTitle}>Step 2: Account</Text>

                                    <FormInput
                                        label="Password"
                                        ref={passwordRef}
                                        secureTextEntry
                                        returnKeyType="next"
                                        onSubmitEditing={() => confirmRef.current.focus()}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        error={errors.password}
                                        touched={touched.password}
                                    />

                                    <Text style={styles.strength}>
                                        Strength: {getPasswordStrength(values.password)}
                                    </Text>

                                    <FormInput
                                        label="Confirm Password"
                                        ref={confirmRef}
                                        secureTextEntry
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        error={errors.confirmPassword}
                                        touched={touched.confirmPassword}
                                    />
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <Text style={styles.stepTitle}>Step 3: Review</Text>
                                    <Text>Name: {values.name}</Text>
                                    <Text>Email: {values.email}</Text>
                                    <Text>Phone: {values.phone}</Text>

                                    <Button style={styles.button} title="Pick Profile Photo" onPress={pickImage} />
                                    {profilePhoto && (
                                        <Image source={{ uri: profilePhoto }} style={styles.image} />
                                    )}
                                </>
                            )}

                            <View style={{ marginTop: 20 }}>
                                <Button
                                    title={step === 2 ? 'Submit & Save' : 'Next'}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </Animated.View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    stepTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    strength: {
        marginBottom: 12,
        fontWeight: '600',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 10,
        alignSelf: 'center',
    },
    button: {
        marginTop: 10,
    },
});