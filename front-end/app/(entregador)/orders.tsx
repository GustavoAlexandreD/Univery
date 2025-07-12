import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Bookmark } from 'lucide-react-native';
import Header from '@/components/Header';

interface Restaurant {
  id: string;
  name: string;
  description: string;
  tags: string[];
  rating: number;
  selected: boolean;
}

export default function EntregadorRestaurantsScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    { 
      id: '1', 
      name: 'Ueceana', 
      description: 'Tipo de comida...', 
      tags: ['Entrega', 'Lanche'], 
      rating: 4.5,
      selected: true
    },
    { 
      id: '2', 
      name: 'Restaurante 2', 
      description: 'Tipo de comida...', 
      tags: ['Lanche', 'Doce'], 
      rating: 4.5,
      selected: false
    },
    { 
      id: '3', 
      name: 'Restaurante 3', 
      description: 'Tipo de comida...', 
      tags: ['Marmita', 'Lanche'], 
      rating: 4.5,
      selected: false
    },
    { 
      id: '4', 
      name: 'Restaurante 4', 
      description: 'Tipo de comida...', 
      tags: ['Marmita'], 
      rating: 4.5,
      selected: false
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isDeliveryActive, setIsDeliveryActive] = useState(false);

  const toggleRestaurantSelection = (restaurantId: string) => {
    setRestaurants(prev => 
      prev.map(restaurant => 
        restaurant.id === restaurantId 
          ? { ...restaurant, selected: !restaurant.selected }
          : restaurant
      )
    );
  };

  const toggleFavorite = (restaurantId: string) => {
    // Handle favorite toggle logic here
    console.log('Toggle favorite for:', restaurantId);
  };

  const handleDeliveryToggle = () => {
    setIsDeliveryActive(!isDeliveryActive);
  };

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = restaurants.filter(r => r.selected).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise por restaurante ou item"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Selecione os restaurantes para fazer entregas!</Text>
        </View>

        {/* Restaurant List */}
        <View style={styles.restaurantList}>
          {filteredRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantItem}>
              <TouchableOpacity
                style={[
                  styles.selectionCircle,
                  restaurant.selected && styles.selectedCircle
                ]}
                onPress={() => toggleRestaurantSelection(restaurant.id)}
              >
                {restaurant.selected && (
                  <View style={styles.checkmark} />
                )}
              </TouchableOpacity>

              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantDescription}>{restaurant.description}</Text>
                
                <View style={styles.tagsContainer}>
                  {restaurant.tags.map((tag, index) => (
                    <View key={index} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.restaurantActions}>
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(restaurant.id)}
                >
                  <Bookmark size={20} color="#9CA3AF" />
                </TouchableOpacity>
                
                <View style={styles.ratingContainer}>
                  <Text style={styles.rating}>{restaurant.rating}</Text>
                  <Text style={styles.ratingStar}>★</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.deliveryButton,
            isDeliveryActive ? styles.activeDeliveryButton : styles.inactiveDeliveryButton
          ]}
          onPress={handleDeliveryToggle}
        >
          <Text style={[
            styles.deliveryButtonText,
            isDeliveryActive ? styles.activeDeliveryButtonText : styles.inactiveDeliveryButtonText
          ]}>
            {isDeliveryActive ? 'Parar Entregas!' : 'Entregar Agora!'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'left',
  },
  restaurantList: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  restaurantItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  selectionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    backgroundColor: '#4ADE80',
    borderColor: '#4ADE80',
  },
  checkmark: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  restaurantActions: {
    alignItems: 'center',
    gap: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  ratingStar: {
    fontSize: 14,
    color: '#FCD34D',
  },
  bottomSpacing: {
    height: 100,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  deliveryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  activeDeliveryButton: {
    backgroundColor: '#6B7280',
  },
  inactiveDeliveryButton: {
    backgroundColor: '#4ADE80',
  },
  deliveryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeDeliveryButtonText: {
    color: '#FFFFFF',
  },
  inactiveDeliveryButtonText: {
    color: '#FFFFFF',
  },
});