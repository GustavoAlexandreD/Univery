// components/ui/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bell } from 'lucide-react-native';
import Header from './Header';

const HeaderEstablishment = () => {
  return (
    <View >
      <Header />
        <TouchableOpacity style={styles.headerIcon}>
        <Bell size={24} color="#FFFFFF" />
        </TouchableOpacity>  
    </View>
  );
};

const styles = StyleSheet.create({
  headerIcon:{
    right: 15,
    padding: 8,
    top: 12,
    position: 'absolute'
  },
});

export default HeaderEstablishment;
