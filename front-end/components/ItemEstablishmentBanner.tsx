import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BackButton from '@/components/BackButton';


export default function ItemEstablishmentBanner({urlImagem}) {
  return (
    <View style={styles.divBackgroundItem}>
      <BackButton />
      <Image
          source={{uri: urlImagem}}
          style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 10, borderRadius: 100}}
          resizeMode="cover"
      />
    </View>  
  );
}

const styles = StyleSheet.create({
  divBackgroundItem: {backgroundColor: '#3bb17b', 'height': 140},
});