import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Fundo verde no topo */}
      <View style={styles.topGreen} />

      {/* Logo sobre o fundo verde */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/UECE_icone.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Painel branco com topo curvado */}
      <View style={styles.curvedContent}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Informe seu nome de usuário e senha da UECE</Text>

        <Text style={styles.label}>USUÁRIO</Text>
        <TextInput
          style={styles.input}
          placeholder="Ueceana@gmail.com"
          placeholderTextColor="#888"
          value={usuario}
          onChangeText={setUsuario}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="*****"
          placeholderTextColor="#888"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/cadastro/cliente')}>
          <Text style={styles.link}>Cadastrar-se e peça comida já!</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/cadastro/restaurante')}>
          <Text style={styles.link}>Cadastrar meu restaurante</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topGreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 280, // altura do topo verde
    backgroundColor: '#2CA94F',
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
  logo: {
    width: 120,
    height: 120,
    
  },
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
  button: {
    width: '100%',
    height: 44,
    backgroundColor: '#2CA94F',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#888',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
});
