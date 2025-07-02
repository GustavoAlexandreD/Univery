import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions, ScrollView } from 'react-native';
import { Bike, Bookmark } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ClienteHomeScreen() {
  const restaurants = [
    { id: '1', name: 'Ueceana', description: 'Marmitas por ótimos preços', tags: ['Marmitas', 'bebidas'] },
    { id: '2', name: 'Billy', description: 'Vendo tapioca', tags: ['lanche', 'bebidas'] },
    { id: '3', name: 'Gaiola', description: 'Salgados e marmitas', tags: ['Salgados', 'Marmitas', 'bebidas'] },
    { id: '4', name: 'Tia do Dindin', description: 'Dindins gourmet', tags: ['doces'] },
  ];
  
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  
  const handleRestaurantSelect = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('@/assets/images/UECE_icone.png')}
            style={styles.logo}
            resizeMode="cover"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>UNIVERY</Text>
        </View>
        <TouchableOpacity style={styles.headerIcon}>
          <Bike size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurantes</Text>
        </View>
        
        <View style={styles.gridContainer}>
          {[
            'Salgados', 'Doces', 'Bebidas', 'Lanches',
            'Marmitas', 'Saudáveis', 'Favoritos',
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridButton}>
              <Text style={styles.gridButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.restaurantList}>
          {restaurants.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={[
                styles.restaurantItem,
                selectedRestaurant === restaurant.id && styles.selectedRestaurantItem
              ]}
              onPress={() => handleRestaurantSelect(restaurant.id)}
              activeOpacity={0.7}
            >
              <View style={styles.restaurantInfo}>
                <Text style={[
                  styles.restaurantName,
                  selectedRestaurant === restaurant.id && styles.selectedRestaurantName
                ]}>
                  {restaurant.name}
                </Text>
                <Text style={styles.restaurantDescription}>
                  {restaurant.description}
                </Text>
              </View>
              <View style={[
                styles.restaurantIcon,
                selectedRestaurant === restaurant.id && styles.selectedRestaurantIcon
              ]}>
                <Bookmark size={20} color={selectedRestaurant === restaurant.id ? '#4ADE80' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
    height: 80,
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerIcon: {
    padding: 8,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
  },
  sectionHeader: {
    alignItems: 'center',
  },
  sectionTitle: {
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#4ADE80',
    letterSpacing: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  gridButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#4ADE80',
    borderRadius: 20,
    margin: 4,
  },
  gridButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  restaurantList: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  restaurantItem: {
    backgroundColor: 'rgba(115, 115, 115, 0.15)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  selectedRestaurantItem: {
    borderColor: '#4ADE80',
    backgroundColor: '#F0FDF4',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedRestaurantName: {
    color: '#4ADE80',
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  restaurantIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 8,
  },
  selectedRestaurantIcon: {
    backgroundColor: '#DCFCE7',
  },
  bottomSpacing: {
    height: 20,
  },
});