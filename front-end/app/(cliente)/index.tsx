import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bike, Bookmark } from 'lucide-react-native';
import { router, useLocalSearchParams  } from 'expo-router';
import HeaderCliente from '@/components/HeaderCliente';
import Api from '@/config/Api';

const { width } = Dimensions.get('window');

interface Restaurant {
  id: string;
  nome: string;
  email?: string;
  telefone?: string;
  ativo?: boolean;
  cnpj?: string;
}

export default function ClienteHomeScreen() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await Api.get('/estabelecimentos');
        
        if (response.data && Array.isArray(response.data)) {
          // Filtrar apenas estabelecimentos ativos
          const activeRestaurants = response.data.filter((restaurant: Restaurant) => 
            restaurant.ativo !== false
          );
          setRestaurants(activeRestaurants);
        } else {
          setError('Formato de dados inválido recebido do servidor');
        }
      } catch (error: any) {
        console.error('Erro ao buscar restaurantes:', error);
        
        if (error.response) {
          // Erro de resposta do servidor
          setError(`Erro do servidor: ${error.response.status}`);
        } else if (error.request) {
          // Erro de rede
          setError('Erro de conexão. Verifique sua internet e se o servidor está rodando.');
        } else {
          // Outro tipo de erro
          setError('Erro inesperado ao carregar restaurantes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);
  
  const handleRestaurantSelect = (restaurantId: string) => {
    setSelectedRestaurant(restaurantId);

    const restaurant = restaurants.find(r => r.id === restaurantId);
    
    if (restaurant) {
      router.push({
        pathname: `/(cliente)/cardapio/cardapio-cliente`,
        params: {
          restaurantId: restaurant.id,
          restaurantName: restaurant.nome,
        }
      });
    }
  };

  const getRestaurantDescription = (restaurant: Restaurant) => {
    // Gerar descrição baseada nos dados disponíveis
    if (restaurant.email && restaurant.telefone) {
      return 'Estabelecimento verificado';
    } else if (restaurant.telefone) {
      return 'Contato disponível';
    }
    return 'Estabelecimento cadastrado';
  };

  const getRestaurantTags = (restaurant: Restaurant) => {
    // Gerar tags baseadas nos dados disponíveis
    const tags = ['Comida'];
    
    if (restaurant.telefone) {
      tags.push('Delivery');
    }
    if (restaurant.ativo) {
      tags.push('Aberto');
    }
    
    return tags;
  };

  const handleRetry = () => {
    setError(null);
    // Recarregar a página executando o useEffect novamente
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await Api.get('/estabelecimentos');
        
        if (response.data && Array.isArray(response.data)) {
          const activeRestaurants = response.data.filter((restaurant: Restaurant) => 
            restaurant.ativo !== false
          );
          setRestaurants(activeRestaurants);
        } else {
          setError('Formato de dados inválido recebido do servidor');
        }
      } catch (error: any) {
        console.error('Erro ao buscar restaurantes:', error);
        
        if (error.response) {
          setError(`Erro do servidor: ${error.response.status}`);
        } else if (error.request) {
          setError('Erro de conexão. Verifique sua internet e se o servidor está rodando.');
        } else {
          setError('Erro inesperado ao carregar restaurantes');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <HeaderCliente />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3cb378" />
          <Text style={styles.loadingText}>Carregando restaurantes...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <HeaderCliente />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
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
                  {restaurant.nome}
                </Text>
                <Text style={styles.restaurantDescription}>
                  {getRestaurantDescription(restaurant)}
                </Text>
                <View style={styles.tagContainer}>
                  {getRestaurantTags(restaurant).map((tag, index) => (
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
                <Bookmark size={20} color={selectedRestaurant === restaurant.id ? '#3cb378' : '#9CA3AF'} />
              </View>
            </TouchableOpacity>
          ))}
          
          {restaurants.length === 0 && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhum restaurante encontrado</Text>
              <Text style={styles.emptyMessage}>
                Não há restaurantes disponíveis no momento. Tente novamente mais tarde.
              </Text>
              <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
                <Text style={styles.retryButtonText}>Atualizar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: '#3cb378',
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
    borderColor: '#3cb378',
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
    color: '#3cb378',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#EF4444',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
});