import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, MessageSquare } from 'lucide-react-native';

export default function LocationDetailsScreen() {
  const { locationId, locationName, locationDescription } = useLocalSearchParams();
  const [deliveryNote, setDeliveryNote] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleConfirm = () => {
    // Here you would typically save the location and delivery details
    Alert.alert(
      'Local Confirmado',
      `Local de entrega: ${locationName}\nObservações: ${deliveryNote || 'Nenhuma'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to next screen (e.g., menu or orders)
            router.push('/(cliente)/orders');
          }
        }
      ]
    );
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
        <Text style={styles.headerTitle}>UNIVERY</Text>
        <TouchableOpacity style={styles.headerIcon}>
          <MapPin size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
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

        {/* Selected Location Card */}
        <View style={styles.selectedLocationCard}>
          <View style={styles.locationHeader}>
            <View style={styles.locationIcon}>
              <MapPin size={24} color="#4ADE80" />
            </View>
            <View style={styles.locationInfo}>
              <Text style={styles.locationName}>{locationName}</Text>
              <Text style={styles.locationDescription}>{locationDescription}</Text>
            </View>
          </View>

          {/* Delivery Instructions */}
          <View style={styles.instructionsSection}>
            <View style={styles.instructionsHeader}>
              <MessageSquare size={20} color="#4ADE80" />
              <Text style={styles.instructionsTitle}>
                Digite um ponto para a entrega{'\n'}(salas, locais próximos...)
              </Text>
            </View>
            
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Sala 101, próximo à cantina, entrada principal..."
              placeholderTextColor="#9CA3AF"
              value={deliveryNote}
              onChangeText={setDeliveryNote}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Bottom Spacing for buttons */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.backActionButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmar</Text>
        </TouchableOpacity>
      </View>

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
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerIcon: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  mapContainer: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 32,
  },
  mapPlaceholder: {
    height: 200,
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
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLocationPin: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 3,
    borderColor: '#4ADE80',
  },
  zoomButton: {
    backgroundColor: '#4ADE80',
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
  selectedLocationCard: {
    backgroundColor: '#4ADE80',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationIcon: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  locationDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  instructionsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 80,
  },
  bottomSpacing: {
    height: 100,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  backActionButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#06B6D4',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flex: 1,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
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