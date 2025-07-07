import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Dimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ShoppingBag, Store, Bell } from 'lucide-react-native';
import Header from '@/components/Header';

const { width } = Dimensions.get('window');

export default function UserTypeSelection() {
  const handleClientePress = () => {
    router.push('/(cliente)');
  };

  const handleVendedorPress = () => {
    router.push('/(vendedor)');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header />

      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Bem-vindo ao UECERY</Text>
          <Text style={styles.welcomeSubtitle}>
            Escolha como você deseja acessar a plataforma
          </Text>
        </View>

        {/* User Type Cards */}
        <View style={styles.cardContainer}>
          <TouchableOpacity 
            style={styles.userTypeCard}
            onPress={handleClientePress}
            activeOpacity={0.8}
          >
            <View style={styles.cardIcon}>
              <ShoppingBag size={48} color="#4ADE80" />
            </View>
            <Text style={styles.cardTitle}>CLIENTE</Text>
            <Text style={styles.cardDescription}>
              Faça pedidos e receba suas refeições no campus
            </Text>
            <View style={styles.cardButton}>
              <Text style={styles.cardButtonText}>Continuar como Cliente</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.userTypeCard}
            onPress={handleVendedorPress}
            activeOpacity={0.8}
          >
            <View style={styles.cardIcon}>
              <Store size={48} color="#F59E0B" />
            </View>
            <Text style={styles.cardTitle}>VENDEDOR</Text>
            <Text style={styles.cardDescription}>
              Gerencie seu negócio e atenda pedidos
            </Text>
            <View style={[styles.cardButton, styles.vendorButton]}>
              <Text style={[styles.cardButtonText, styles.vendorButtonText]}>Continuar como Vendedor</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Plataforma de delivery universitária
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    position: 'relative'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  userTypeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardIcon: {
    backgroundColor: '#F0FDF4',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  cardDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  cardButton: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
  },
  vendorButton: {
    backgroundColor: '#F59E0B',
  },
  cardButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  vendorButtonText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});