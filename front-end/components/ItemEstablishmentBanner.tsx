import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BackButton from '@/components/BackButton';


export default function ItemEstablishmentBanner() {
  return (
    <View style={styles.divBackgroundItem}>
      <BackButton />
      <Image
          source={require('../assets/images/bebida_icone.webp')}
          style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 10}}
          resizeMode="contain"
      />
    </View>  
  );
}

const styles = StyleSheet.create({
  divBackgroundItem: {backgroundColor: '#2cbfae', 'height': 140},
});