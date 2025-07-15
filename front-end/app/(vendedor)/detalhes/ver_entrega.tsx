import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MapPin, User, Package, Map } from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

export default function VerEntrega() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const orderDetails = {
    id: '#301',
    origin: 'Ueceana',
    destination: 'Bloco P',
    client: 'Gustavo',
    deliveryDescription: 'Bloco P: Sala 02. Andar Superior.',
    items: '1x Suco de Uva 300ml.',
  };

  const handleBack = () => {
    router.back();
  };

  const handleVoltar = () => {
    router.back();
  };

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>DETALHES DO PEDIDO</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* Order Details Card */}
        <View style={styles.orderCard}>
          <View style={styles.orderContent}>
            {/* Order Number */}
            <Text style={styles.orderNumber}>Pedido {orderDetails.id}</Text>

            {/* Location Info */}
            <View style={styles.locationSection}>
              <View style={styles.locationRow}>
                <MapPin size={16} color='#3cb378' />
                <Text style={styles.locationText}>De: {orderDetails.origin}</Text>
              </View>
              <View style={styles.locationRow}>
                <MapPin size={16} color='#3cb378' />
                <Text style={styles.locationText}>Para: {orderDetails.destination}</Text>
              </View>
            </View>

            {/* Client Info */}
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Cliente:</Text>
              <Text style={styles.infoText}>{orderDetails.client}</Text>
            </View>

            {/* Delivery Description */}
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Descrição do Local de Entrega:</Text>
              <Text style={styles.infoText}>{orderDetails.deliveryDescription}</Text>
            </View>

            {/* Order Items */}
            <View style={styles.infoSection}>
              <Text style={styles.infoLabel}>Itens do Pedido:</Text>
              <Text style={styles.infoText}>{orderDetails.items}</Text>
            </View>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Image
              source={require('@/assets/images/Mapa UECEfood.png')}
              style={styles.mapImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity style={styles.zoomButton} onPress={openModal}>
            <Text style={styles.zoomButtonText}>Ampliar Mapa</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Modal for Enlarged Map */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              onPress={closeModal} 
              style={[styles.closeButton, { zIndex: 10 }]}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Image
              source={require('@/assets/images/Mapa UECEfood.png')}
              style={styles.modalImage}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#3cb378',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
    height: 60,
  },
  backButton: {
    padding: 8,
    marginRight: 12,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    marginLeft:15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3cb378',
    letterSpacing: 0.5,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 24,
    marginTop:30,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderContent: {
    padding: 24,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  orderNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 16,
  },
  locationSection: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 8,
  },
  infoSection: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  mapContainer: {
    marginBottom: 24,
  },
  mapPlaceholder: {
    height: 256,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  zoomButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  zoomButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  voltarButton: {
    backgroundColor: '#3cb378',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  voltarButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#EF4444',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  modalImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});