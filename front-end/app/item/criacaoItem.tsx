import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackButton from '@/components/BackButton';
import { useFonts } from '@expo-google-fonts/dm-sans';

export default function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');

  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState(''); 
  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  });

  return (
    <SafeAreaView style={styles.safeArea} >
      {/* Fundo verde no topo com ícone de bebida */}
      <View style={styles.divBackgroundItem}>
        <BackButton />
        <Image
          source={require('../../assets/images/bebida_icone.webp')}
          style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 10}}
          resizeMode="contain"
        />
      </View>  

      <View style={styles.container}>

        <TextInput
          style={styles.nameOfProductTextInput}
          placeholder="Insira nome do produto"
          value={nome}
          onChangeText={setNome}
        />

        <TextInput
          multiline
          style={styles.descriptionOfProductTextInput}
          placeholder="Insira a descrição do produto"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          multiline
          style={styles.priceOfProductTextInput}
          placeholder="Insira o preço do produto"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Image 
          source={require('../../assets/images/cardapio.png')}
          style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
          resizeMode="contain"
        />

        <Image 
          source={require('../../assets/images/pedidos.png')}
          style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
          resizeMode="contain"
        />

        <Image 
          source={require('../../assets/images/organizacao.png')}
          style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
          resizeMode="contain"
        />

      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  divBackgroundItem: {backgroundColor: '#2cbfae', 'height': 140},
  container: {flex: 1, backgroundColor: '#fff', padding: 24 },
  nameOfProductTextInput: {height: 56, borderColor: '#ccc', borderWidth: 4, marginBottom: 22, paddingHorizontal: 13, borderRadius: 10, fontFamily: 'DMSans-Bold', fontSize:20},
  descriptionOfProductTextInput: {height: 225, borderColor: '#ccc', borderWidth: 4, marginBottom: 100, paddingTop:14 ,paddingHorizontal: 13, borderRadius: 10, fontFamily: 'DMSans-Medium', fontSize:15, color: '#696660', textAlignVertical: 'top'},
  priceOfProductTextInput: {height: 50, borderColor: '#24a637', borderWidth: 4, marginBottom: 40, paddingHorizontal: 13, textAlignVertical: 'top', paddingTop: 10, borderRadius: 10, fontFamily: 'DMSans-Bold', fontSize:15, color: '#24a637'},
  button: {width: 200, alignSelf: 'center', backgroundColor: '#8f8e8e', borderRadius: 3, paddingVertical: 9},
  buttonText: {fontFamily: 'DMSans-Medium', fontSize:15, color: 'white', alignSelf: 'center'},
  footer: {height: 65, backgroundColor: 'white', borderTopWidth: 1, borderColor:'#8f8e8e', position: 'fixed', bottom: 0, display: 'flex', flexDirection: 'row'},
  safeArea: {flex: 1, backgroundColor: '#fff'},
});