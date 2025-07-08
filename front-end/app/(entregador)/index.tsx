import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Phone, MapPin, Info } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';

interface Order {
  id: string;
  orderNumber: string;
  restaurant: string;
  location: string;
  destination: string;
  status: 'Em Mãos' | 'available';
  timeRemaining?: string;
}

export default function EntregadorHomeScreen() {
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const [availableRestaurants, setAvailableRestaurants] = useState(['Ueceana']);
  
  const activeOrder: Order = {
    id: '1',
    orderNumber: 'N°301',
    restaurant: 'Ueceana',
    location: 'Bloco P',
    destination: 'Bloco P',
    status: 'Em Mãos',
    timeRemaining: '15 min'
  };

  // Simulate order detection
  useEffect(() => {
    const timer = setTimeout(() => {
      // Uncomment the line below to simulate an active order
      // setHasActiveOrder(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleOrderStatus = () => {
    setHasActiveOrder(!hasActiveOrder);
  };

  const handleVerDetalhes = () => {
    router.push('/(entregador)/detalhes/ver_entrega');
  };

  const handleGoToCliente = () => {
    router.push('/(cliente)');
  };

  if (hasActiveOrder) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Active Deliveries Header */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Entregas Ativas</Text>
          </View>

          {/* Active Order Card */}
          <View style={styles.activeOrderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderIconContainer}>
                <Phone size={24} color="#FFFFFF" />
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>Pedido {activeOrder.orderNumber}</Text>
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#4ADE80" />
                  <Text style={styles.locationText}>De: {activeOrder.restaurant}</Text>
                </View>
                <View style={styles.locationRow}>
                  <MapPin size={16} color="#4ADE80" />
                  <Text style={styles.locationText}>Para: {activeOrder.destination}</Text>
                </View>
              </View>
              <View style={styles.statusContainer}>
                <TouchableOpacity style={styles.infoButton} onPress={handleVerDetalhes}>
                  <Info size={20} color="#6B7280" />
                </TouchableOpacity>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{activeOrder.status}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Live Section */}
          <View style={styles.liveSection}>
            <Text style={styles.liveSectionTitle}>Ao Vivo – Entrega Agora!</Text>
            <Text style={styles.liveSectionDescription}>
              Para alterar informações de restaurantes disponíveis a seu atendimento selecione "Parar Entregas" e selecione os restaurantes novamente.
            </Text>

            <View style={styles.restaurantSection}>
              <Text style={styles.restaurantSectionTitle}>Restaurantes em Atendimento</Text>
              <View style={styles.restaurantList}>
                {availableRestaurants.map((restaurant, index) => (
                  <View key={index} style={styles.restaurantItem}>
                    <Text style={styles.restaurantName}>{restaurant}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          {/* Test Button - Remove in production */}
          <TouchableOpacity 
            style={styles.testButton} 
            onPress={handleToggleOrderStatus}
          >
            <Text style={styles.testButtonText}>
              {hasActiveOrder ? 'Simular: Sem Pedidos' : 'Simular: Com Pedido'}
            </Text>
          </TouchableOpacity>

          {/* Navigation Button to Cliente */}
          <TouchableOpacity 
            style={styles.clienteButton} 
            onPress={handleGoToCliente}
          >
            <Text style={styles.clienteButtonText}>Ir para Área do Cliente</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Default state - No active orders
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Active Deliveries Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Entregas Ativas</Text>
        </View>

        {/* Live Section */}
        <View style={styles.liveSection}>
          <Text style={styles.liveSectionTitle}>Ao Vivo – Entrega Agora!</Text>
          <Text style={styles.liveSectionDescription}>
            Para alterar informações de restaurantes disponíveis a seu atendimento selecione "Parar Entregas" e selecione os restaurantes novamente.
          </Text>

          <View style={styles.restaurantSection}>
            <Text style={styles.restaurantSectionTitle}>Restaurantes em Atendimento</Text>
            <View style={styles.restaurantList}>
              <View style={styles.emptyRestaurantItem}>
                <Text style={styles.emptyRestaurantText}>Nenhum</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Test Button - Remove in production */}
        <TouchableOpacity 
          style={styles.testButton} 
          onPress={handleToggleOrderStatus}
        >
          <Text style={styles.testButtonText}>
            {hasActiveOrder ? 'Simular: Sem Pedidos' : 'Simular: Com Pedido'}
          </Text>
        </TouchableOpacity>

        {/* Navigation Button to Cliente */}
        <TouchableOpacity 
          style={styles.clienteButton} 
          onPress={handleGoToCliente}
        >
          <Text style={styles.clienteButtonText}>Ir para Área do Cliente</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  activeOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4ADE80',
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  orderIconContainer: {
    backgroundColor: '#EF4444',
    borderRadius: 25,
    padding: 12,
    marginRight: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  infoButton: {
    padding: 4,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  liveSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  liveSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
  },
  liveSectionDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 20,
  },
  restaurantSection: {
    marginTop: 8,
  },
  restaurantSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    backgroundColor: '#4ADE80',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 12,
    textAlign: 'center',
  },
  restaurantList: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  restaurantItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  restaurantName: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  emptyRestaurantItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  emptyRestaurantText: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  testButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  testButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  clienteButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  clienteButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});