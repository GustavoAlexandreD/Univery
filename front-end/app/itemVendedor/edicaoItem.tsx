import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from '@expo-google-fonts/dm-sans';
import { Checkbox } from 'react-native-paper'

import NavegationEstablismentView from '@/components/NavegationEstablishmentView';
import ItemEstablishmentBanner from '@/components/ItemEstablishmentBanner';

export default function edicaoItem() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [checked, setChecked] = useState(false);

  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  });

  return (
    <SafeAreaView style={styles.safeArea} >

      {/* Fundo verde no topo com ícone de bebida */}
      <ItemEstablishmentBanner />

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

        <View style = {styles.viewDisponivel}>
          <Text style = {styles.textDisponivel}>
            Disponível
          </Text>
          <Checkbox 
            status={checked ? 'checked':'unchecked'}
            onPress={() => setChecked(!checked)}
          />
        </View>

        <TextInput
          style={styles.priceOfProductTextInput}
          placeholder="Insira o preço do produto"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity style={[styles.button, {backgroundColor: '#3cb378'}]}>
          <Text style={styles.buttonText} >Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, {marginTop: 10, backgroundColor: '#ff3131'}]}>
          <Text style={[styles.buttonText]}>Apagar Produto</Text>
        </TouchableOpacity>
      </View>

      <NavegationEstablismentView />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 24 },
  nameOfProductTextInput: {height: 56, borderColor: '#ccc', borderWidth: 4, marginBottom: 22, paddingHorizontal: 13, borderRadius: 10, fontFamily: 'DMSans-Bold', fontSize:20},
  descriptionOfProductTextInput: {height: 225, borderColor: '#ccc', borderWidth: 4, paddingTop:14 ,paddingHorizontal: 13, borderRadius: 10, fontFamily: 'DMSans-Medium', fontSize:15, color: '#696660', textAlignVertical: 'top'},
  viewDisponivel: {flexDirection: 'row', marginTop: 30},
  textDisponivel: { textAlign: 'left', fontFamily: 'DMSans-Bold', fontSize:25},
  priceOfProductTextInput: {height: 50, borderColor: '#24a637', borderWidth: 4, marginTop: 30, paddingHorizontal: 13, textAlignVertical: 'top', paddingTop: 10, borderRadius: 10, fontFamily: 'DMSans-Bold', fontSize:15, color: '#24a637'},
  button: {width: 200, alignSelf: 'center', backgroundColor: '#8f8e8e', borderRadius: 3, paddingVertical: 9, marginTop: 20},
  buttonText: {fontFamily: 'DMSans-Medium', fontSize:15, color: 'white', alignSelf: 'center'},
  safeArea: {flex: 1, backgroundColor: '#fff'},
});