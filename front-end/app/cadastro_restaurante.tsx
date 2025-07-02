import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroRestaurante() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={{ fontSize: 22, color: '#2CA94F' }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Cadastro do{'\n'}Estabelecimento</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>Informe os dados a seguir para cadastrar o estabelecimento</Text>

      <Text style={styles.label}>NOME</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Estabelecimento"
        placeholderTextColor="#888"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CNPJ</Text>
      <TextInput
        style={styles.input}
        placeholder="CNPJ do Estabelecimento"
        placeholderTextColor="#888"
        value={cnpj}
        onChangeText={setCnpj}
        keyboardType="numeric"
      />

      <Text style={styles.label}>TELEFONE</Text>
      <TextInput
        style={styles.input}
        placeholder="Telefone do Estabelecimento"
        placeholderTextColor="#888"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-MAIL</Text>
      <TextInput
        style={styles.input}
        placeholder="E-mail do Estabelecimento"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Text style={styles.label}>SENHA</Text>
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Text style={styles.label}>CONFIRMAR SENHA</Text>
      <TextInput
        style={styles.input}
        placeholder="Repita a Senha"
        placeholderTextColor="#888"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24 },
  backButton: { position: 'absolute', top: 40, left: 16, zIndex: 2 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginTop: 40 },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 12 },
  subtitle: { textAlign: 'center', color: '#888', marginBottom: 16 },
  label: { marginTop: 12, marginBottom: 4, color: '#888', fontWeight: 'bold', fontSize: 12, letterSpacing: 1 },
  input: { backgroundColor: '#E5E5E5', borderRadius: 12, padding: 12, fontSize: 16, marginBottom: 4 },
  button: { backgroundColor: '#2CA94F', borderRadius: 8, alignItems: 'center', justifyContent: 'center', height: 48, marginTop: 32 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});