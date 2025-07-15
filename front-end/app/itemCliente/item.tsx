import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from '@expo-google-fonts/dm-sans';
import { Ionicons } from '@expo/vector-icons';

import ItemEstablishmentBanner from '@/components/ItemEstablishmentBanner';
import NavegationEstablismentView from '@/components/NavegationEstablishmentView';
import PhoneButton from '@/components/PhoneButton';
import MailButton from '@/components/MailButton';

import { currentItemStore } from '@/stores/currentItemStore'; 


export default function item() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [observacao, setObservacao] = useState('');
  const [quantity, setQuantity] = useState(0)

  const {currentItem, setCurrentItem} = currentItemStore()


  const [fontsLoaded] = useFonts({
    'DMSans-Regular': require('../../assets/fonts/DMSans-Regular.ttf'),
    'DMSans-Medium': require('../../assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Bold': require('../../assets/fonts/DMSans-Bold.ttf'),
  });

  return (
    <SafeAreaView style={styles.safeArea} >

      {/* Fundo verde no topo com ícone de bebida */}

      <ItemEstablishmentBanner urlImagem={currentItem.image}/>

      <PhoneButton />
      <MailButton />

      <View style={styles.container}>

        <Text style={styles.nameOfProductText}>{currentItem.name}</Text>

        <Text style={styles.descriptionOfProductText}>{currentItem.description}</Text>

        <Text style={styles.observationText}> Observações </Text>  
        
        <TextInput
        multiline
        style={styles.observationTextInput}
        placeholder=""
        value={observacao}
        onChangeText={setObservacao}
        />
      </View>

      <View style={styles.addProductView}>

        <TouchableOpacity style={styles.iconButton} onPress={() => quantity > 0 ? setQuantity(quantity - 1) : () => {}} >
          <Ionicons name="remove" size={30} color="white" />
        </TouchableOpacity>


        <Text style={styles.addProductQuantityText}>
            {quantity}
        </Text>

        {/* Ícone de mais */}
        <TouchableOpacity style={styles.iconButton} onPress={() => setQuantity(quantity + 1)}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} >Adicionar</Text>
        </TouchableOpacity>
      </View>

      
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff', padding: 24 },
  
  nameOfProductText: {height: 56, paddingHorizontal: 13, fontFamily: 'DMSans-Bold', fontSize:20},
  descriptionOfProductText: {height: 100, paddingHorizontal: 13, fontFamily: 'DMSans-Medium', fontSize:15, color: '#696660', textAlignVertical: 'top'},
  observationText: {height: 28, paddingHorizontal: 13, fontFamily: 'DMSans-Bold', fontSize:20, marginTop:10, color:"#8f8e8e"},

  observationTextInput: {height: 200, backgroundColor: "#73737333", borderColor: '#00000033', borderWidth: 4, paddingHorizontal: 13, textAlignVertical: 'top', paddingTop: 30, borderRadius: 10, marginTop: 20, marginLeft:12, fontFamily: 'DMSans-Bold', fontSize:20},
  addProductView: {height: 100, width: '100%', backgroundColor: 'white', borderTopWidth: 1, borderColor:'#8f8e8e', position: 'fixed', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center' },
  addProductQuantityText: {height: 56, width: 40, fontFamily: 'DMSans-Bold', fontSize:25, marginTop: 40, marginHorizontal: 10, textAlign: 'center'},
  iconButton: { marginHorizontal: 10, marginTop: 30, borderRadius: 3, justifyContent: 'center', paddingHorizontal: 10, backgroundColor: '#3bb17b', height: 50, width: 50},


  button: {height: 50 ,width: 150, backgroundColor: '#3bb17b', borderRadius: 15, paddingVertical: 12, marginLeft: 30, marginTop: 30},
  buttonText: {fontFamily: 'DMSans-Medium', fontSize:18, color: 'white', alignSelf: 'center'},
  safeArea: {flex: 1, backgroundColor: '#fff', position: 'relative'},
});