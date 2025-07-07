import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bike, Bookmark } from 'lucide-react-native';
import { router } from 'expo-router';
import Header from '@/components/Header';
import HeaderCliente from '@/components/HeaderCliente';

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

    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (restaurant) {
      // Navigate to the menu screen
      router.push({
        pathname: '/(cliente)/cardapio/cardapio-cliente',
        params: {
          restaurantId: restaurant.id,
          restaurantName: restaurant.name,
        }
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderCliente />

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
              <Image
                source={require('@/assets/images/UECE_icone.png')}
                style={styles.restaurantImage}
                resizeMode='contain'
              />
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
                <View style={styles.tagContainer}>
                  {restaurant.tags.map((tag, index) => (
                    <View key={index} style={styles.tagBox}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
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
      </ScrollView>
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
  },
  sectionHeader:{
    alignItems: 'center',
  },
  sectionTitle:{
    paddingVertical: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#24a637',
    fontFamily: '',
    letterSpacing: 1,
  },
  listFilters:{
    height: 40, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
  },
  filterButton:{
    alignItems: 'center',
    backgroundColor:'#24a637',
  },
  filterButtonText:{
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: '',
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
    backgroundColor: '#24a637',
    borderRadius: 5,
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
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRestaurantItem: {
    borderColor: '#4ADE80',
    backgroundColor: '#F0FDF4',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantImage:{
    width: 75,
    height: 75,
    borderRadius: 100,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#737373',
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
  tagContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 8,
  gap: 4, 
  },

  tagBox: {
  backgroundColor: '#3cb378',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 2,
  marginRight: 4,
  marginBottom: 4,
  },

  tagText: {
  color: '#FFFFFF',
  fontSize: 10,
  fontWeight: '700',
  },
});