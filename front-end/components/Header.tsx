// components/ui/Header.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Bike } from 'lucide-react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/UECE_icone.png')}
          style={styles.logo}
          resizeMode='contain'
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>UNIVERY</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
   header: {
    height: 60,
    backgroundColor: '#3cb378',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
    headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },

  logoContainer: {
    left: 15,
    width: 50,
    height: 45,
    borderRadius: 20,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginRight: 40
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: '',
    letterSpacing: 1,
  },
});

export default Header;
