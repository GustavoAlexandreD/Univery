import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../config/Api';

// Tipos do formulário
type LoginRestauranteFormValues = {
  email: string;
  senha: string;
};

export default function LoginRestauranteScreen() {
  const router = useRouter();

  async function realizarLogin(
    values: LoginRestauranteFormValues,
    { resetForm }: FormikHelpers<LoginRestauranteFormValues>
  ) {
    try {
      const response = await Api.post('/auth/login', values);

      if (response.data.token) {
        // Armazenar token com AsyncStorage
        await AsyncStorage.setItem('token', response.data.token);
        resetForm();
        router.push('/(vendedor)');
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Erro ao realizar login.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topGreen} />
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/UECE_icone.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      
      <View style={styles.curvedContent}>
        <Text style={styles.title}>Login Restaurante</Text>
        <Text style={styles.subtitle}>
          Acesse sua conta de estabelecimento
        </Text>

        <Formik<LoginRestauranteFormValues>
          initialValues={{ email: '', senha: '' }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Email inválido')
              .required('Email obrigatório'),
            senha: Yup.string().required('Senha obrigatória'),
          })}
          onSubmit={realizarLogin}
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
              <Text style={styles.label}>E-MAIL</Text>
              <TextInput
                style={styles.input}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                placeholder="Ex: lanchonete@campus.edu.br"
                placeholderTextColor="#888"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                value={values.senha}
                onChangeText={handleChange('senha')}
                onBlur={handleBlur('senha')}
                placeholder="********"
                placeholderTextColor="#888"
              />
              {touched.senha && errors.senha && (
                <Text style={styles.error}>{errors.senha}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                <Text style={styles.buttonText}>Entrar</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.link}>Esqueceu sua senha?</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/cadastro_restaurante')}>
                <Text style={styles.link}>Cadastrar meu restaurante</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push('/')}>
                <Text style={styles.link}>Sou cliente</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  topGreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280,
    backgroundColor: '#2CA94F', // Cor diferente para restaurantes
    zIndex: 0,
  },
  logoContainer: {
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  logo: { width: 120, height: 120 },
  curvedContent: {
    flex: 1,
    marginTop: 200,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    paddingHorizontal: 32,
    alignItems: 'center',
    paddingTop: 40,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 12,
    color: '#888',
    marginTop: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  input: {
    width: '100%',
    height: 44,
    borderRadius: 8,
    backgroundColor: '#E5E5E5',
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 4,
    color: '#222',
  },
  error: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  button: {
    width: '100%',
    height: 44,
    backgroundColor: '#2CA94F', // Cor diferente para restaurantes
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  link: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
}); 