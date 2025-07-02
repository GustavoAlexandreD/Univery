import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Image, Dimensions,ScrollView} from 'react-native';
import { BikeIcon, Bookmark } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function ClienteHomeScreen(){
  const restaurants = [
      { id: '1', name: 'Ueceana', description: 'Marmitas por ótimos preços', tags:['Marmitas', 'bebidas'] },
      { id: '2', name: 'Billy', description: 'Vendo tapioca', tags: ['lanche', 'bebidas'] },
      { id: '3', name: 'Gaiola', description: 'Salgados e marmitas', tags: ['Salgados', 'Marmitas', 'bebidas'] },
      { id: '4', name: 'Tia do Dindin', description: 'Dindins gourmet', tags: ['doces'] },
  ];
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const handleRestaurantSelect = (locationId: string) => {
    setSelectedRestaurant(locationId);
  };

  return(

    /*conteiner responsável por evitar que tudo ultrapasse os limites do celular */
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/UECE_icone.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>UNIVERY</Text>
        </View>
        <TouchableOpacity style={styles.headericon}>
          <BikeIcon size={30} color="#FFFFFF" />
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
            'Marmitas', 'Saudaveis', 'Favoritos',
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.gridButton}>
              <Text style={styles.gridButtonText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.RestaurantList}>
          {restaurants.map((res) => (
            <TouchableOpacity
              key={res.id}
              style={[ 
                styles.RestaurantItem,
                selectedRestaurant === res.id && styles.selectedRestaurantItem 
              ]}
              onPress={() => handleRestaurantSelect(res.id)}
              activeOpacity={0.7}
            >
              <View style={styles.RestaurantInfo}>
                <Text style={[ 
                  styles.RestaurantName, 
                  selectedRestaurant === res.id && styles.selectedRestaurantName 
                ]}>
                  {res.name}
                </Text>
                <Text style={styles.RestaurantDescription}>
                  {res.description}
                </Text>
              </View>
              <View style={[ 
                styles.RestaurantIcon, 
                selectedRestaurant === res.id && styles.selectedRestaurantIcon 
              ]}>
                <Bookmark size={20} color={selectedRestaurant === res.id ? '#4ADE80' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>

)};

const styles = StyleSheet.create({
  container: {
    marginTop: 43,
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
   header: {
    height: 80,
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
  headericon:{
    right: 15,
    padding: 8,
  },
  logoContainer: {
    left: 15,
    width: 50,
    height: 50,
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: '',
    letterSpacing: 1,
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
    borderRadius: 20,
    margin: 4,
  },
  gridButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },

 RestaurantList: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  RestaurantItem: {
    backgroundColor: 'rgba(115, 115, 115, 0.15)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedRestaurantItem: {
    borderColor: '#4ADE80',
    backgroundColor: '#F0FDF4',
  },
  RestaurantInfo: {
    flex: 1,
  },
  RestaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedRestaurantName: {
    color: '#4ADE80',
  },
  RestaurantDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 18,
  },
  RestaurantIcon: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 8,
  },
  selectedRestaurantIcon: {
    backgroundColor: '#DCFCE7',
  },
});