import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions,
  Modal
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, MapPin, Search } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const deliveryLocations = [
  { id: '1', name: 'Bloco P', description: 'Prédio Principal - Térreo' },
  { id: '2', name: 'Bloco Q', description: 'Laboratórios - 2º Andar' },
  { id: '3', name: 'PPGCC', description: 'Pós-Graduação - Sala 101' },
  { id: '4', name: 'Bloco R', description: 'Biblioteca - Entrada Principal' },
];

export default function ClienteLocationHomeScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleBack = () => {
    router.back();
  };

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    
    // Find the selected location details
    const location = deliveryLocations.find(loc => loc.id === locationId);
    
    if (location) {
      // Navigate to location details page with parameters
      router.push({
        pathname: '/cliente/local/local-selecionado',
        params: {
          locationId: location.id,
          locationName: location.name,
          locationDescription: location.description,
        }
      });
    }
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
        {/* Location Selection Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>SELECIONE LOCAL DE ENTREGA</Text>
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

        {/* Location List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>SELECIONE O LOCAL DE ENTREGA</Text>
        </View>

        {/* Location List */}
        <View style={styles.locationList}>
          {deliveryLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={[
                styles.locationItem,
                selectedLocation === location.id && styles.selectedLocationItem
              ]}
              onPress={() => handleLocationSelect(location.id)}
              activeOpacity={0.7}
            >
              <View style={styles.locationInfo}>
                <Text style={[
                  styles.locationName,
                  selectedLocation === location.id && styles.selectedLocationName
                ]}>
                  {location.name}
                </Text>
                <Text style={styles.locationDescription}>
                  {location.description}
                </Text>
              </View>
              <View style={[
                styles.locationIcon,
                selectedLocation === location.id && styles.selectedLocationIcon
              ]}>
                <Search size={20} color={selectedLocation === location.id ? '#3cb378' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
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
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3cb378',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  mapContainer: {
    marginHorizontal: 20,
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
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3cb378',
    letterSpacing: 0.5,
  },
  locationList: {
    paddingHorizontal: 20,
  },
  locationItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedLocationItem: {
    borderColor: '#3cb378',
    backgroundColor: '#F0FDF4',
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedLocationName: {
    color: '#3cb378',
  },
  locationDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  locationIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 8,
  },
  selectedLocationIcon: {
    backgroundColor: '#DCFCE7',
  },
  bottomSpacing: {
    height: 20,
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