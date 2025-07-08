import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import BackButton from '@/components/BackButton';


export default function ItemEstablishmentBanner() {
  return (
    <View style={styles.divBackgroundItem}>
      <BackButton />
      <Image
          src={'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300'}
          style={{ width: 120, height: 120, alignSelf: 'center', marginTop: 10, borderRadius: 100}}
          resizeMode="cover"
      />
    </View>  
  );
}

const styles = StyleSheet.create({
  divBackgroundItem: {backgroundColor: '#3bb17b', 'height': 140},
});