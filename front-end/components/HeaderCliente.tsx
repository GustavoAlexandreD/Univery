import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Bike } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from './Header';

const HeaderCliente = () => {
  const handleBikePress = () => {
    router.push('/(entregador)');
  };

  return (
    <View>
      <Header />
      <TouchableOpacity style={styles.headerIcon} onPress={handleBikePress}>
        <Bike size={30} color="#FFFFFF" />
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    right: 15,
    padding: 8,
    top: 10,
    position: 'absolute'
  },
});

export default HeaderCliente;