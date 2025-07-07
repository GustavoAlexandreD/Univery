// components/ui/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bike } from 'lucide-react-native';
import Header from './Header';

const HeaderCliente = () => {
  return (
    <View >
      <Header />
      <TouchableOpacity style={styles.headerIcon}>
        <Bike size={30} color="#FFFFFF" />
      </TouchableOpacity>      
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon:{
    right: 15,
    padding: 8,
    top: 10,
    position: 'absolute'
  },
});

export default HeaderCliente;
