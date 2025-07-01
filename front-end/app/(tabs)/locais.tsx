import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  Image,
  Dimensions
} from 'react-native';
import { ArrowLeft, MapPin, Search } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const deliveryLocations = [
  { id: '1', name: 'Bloco P', description: 'Prédio Principal - Térreo' },
  { id: '2', name: 'Bloco Q', description: 'Laboratórios - 2º Andar' },
  { id: '3', name: 'PPGCC', description: 'Pós-Graduação - Sala 101' },
  { id: '4', name: 'Bloco R', description: 'Biblioteca - Entrada Principal' },
];

export default function DeliveryLocationScreen() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
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
              source={{ uri: 'https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.mapImage}
              resizeMode="cover"
            />
            <View style={styles.mapOverlay}>
              {/* Location Pins */}
              <View style={[styles.locationPin, { top: '20%', left: '25%' }]}>
                <MapPin size={16} color="#4ADE80" />
              </View>
              <View style={[styles.locationPin, { top: '35%', right: '30%' }]}>
                <MapPin size={16} color="#4ADE80" />
              </View>
              <View style={[styles.locationPin, { bottom: '25%', left: '20%' }]}>
                <MapPin size={16} color="#4ADE80" />
              </View>
              <View style={[styles.locationPin, { bottom: '30%', right: '25%' }]}>
                <MapPin size={16} color="#4ADE80" />
              </View>
            </View>
          </View>
          <Text style={styles.mapInstruction}>
            CLIQUE PARA NAVEGAR E{'\n'}PROCURAR O LOCAL DE ENTREGA
          </Text>
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
                <Search size={20} color={selectedLocation === location.id ? '#4ADE80' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
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
  sectionHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80',
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
  mapOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  locationPin: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  mapInstruction: {
    fontSize: 12,
    color: '#4ADE80',
    textAlign: 'center',
    marginTop: 12,
    fontWeight: '500',
    lineHeight: 16,
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80',
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
    borderColor: '#4ADE80',
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
    color: '#4ADE80',
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
});