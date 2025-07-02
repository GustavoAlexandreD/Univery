import React from 'react';
import {View, StyleSheet, Image} from 'react-native';


export default function NavegationEsablishmentView() {
  return (
    <View style={styles.navegationEstablishmentView}>
        <Image 
            source={require('../assets/images/cardapio.png')}
            style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
            resizeMode="contain"
        />

        <Image 
            source={require('../assets/images/pedidos.png')}
            style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
            resizeMode="contain"
        />

        <Image 
            source={require('../assets/images/organizacao.png')}
            style={{ width: 100, height: 50, alignSelf: 'center', marginTop: 10, marginHorizontal: 13}}
            resizeMode="contain"
        />

    </View>
  );
}

const styles = StyleSheet.create({
  navegationEstablishmentView: {height: 50, width: '100%', backgroundColor: 'white', borderTopWidth: 1, borderColor:'#8f8e8e', position: 'fixed', bottom: 0, display: 'flex', flexDirection: 'row', justifyContent: 'center'},
});