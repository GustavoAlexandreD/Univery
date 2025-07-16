import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Search, Heart, Plus, Minus, ShoppingCart } from 'lucide-react-native';

import { currentItemStore } from '@/stores/currentItemStore'; 
import Api from '@/config/Api';

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  image?: string;
  categoria?: string;
  disponibilidade: 'disponivel' | 'esgotado';
  id_estabelecimento: string;
}

interface Estabelecimento {
  id: string;
  nome: string;
  telefone?: string;
  email?: string;
  ativo: boolean;
}

export default function CardapioClienteScreen() {
  const { restaurantId, restaurantName } = useLocalSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Estados para dados do backend
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { currentItem, setCurrentItem } = currentItemStore();

  useEffect(() => {
    if (!restaurantId) {
      setError('ID do restaurante não fornecido');
      setLoading(false);
      return;
    }
    
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Buscar dados do estabelecimento
        const estabelecimentoResponse = await Api.get(`/estabelecimentos/${restaurantId}`);
        if (estabelecimentoResponse.data) {
          setEstabelecimento(estabelecimentoResponse.data);
        }

        // Buscar itens do estabelecimento
        const itensResponse = await Api.get('/itens');
        
        if (itensResponse.data && Array.isArray(itensResponse.data)) {
          // Filtrar itens apenas do estabelecimento atual
          const itensDoEstabelecimento = itensResponse.data.filter(
            (item: any) => item.id_estabelecimento?.toString() === restaurantId?.toString()
          );

          // Mapear os dados para o formato esperado pelo frontend
          const itensFormatados: MenuItem[] = itensDoEstabelecimento.map((item: any) => ({
            id: item.id?.toString() || '',
            nome: item.nome || 'Item sem nome',
            descricao: item.descricao || 'Descrição não disponível',
            preco: parseFloat(item.preco) || 0,
            image: item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
            categoria: item.categoria || 'Outros',
            disponibilidade: item.disponibilidade || 'disponivel',
            id_estabelecimento: item.id_estabelecimento?.toString() || ''
          }));

          setMenuItems(itensFormatados);

          // Extrair categorias únicas dos itens
          const categoriasUnicas = ['Todos', ...new Set(
            itensFormatados.map(item => item.categoria).filter(Boolean)
          )];
          setCategories(categoriasUnicas);

          // Se não há categoria selecionada ou a categoria não existe, selecionar a primeira disponível
          if (!categoriasUnicas.includes(selectedCategory)) {
            setSelectedCategory(categoriasUnicas[0] || 'Todos');
          }
        } else {
          setMenuItems([]);
          setCategories(['Todos']);
        }
        
      } catch (error: any) {
        console.error('Erro ao buscar dados:', error);
        
        if (error.response) {
          setError(`Erro do servidor: ${error.response.status}`);
        } else if (error.request) {
          setError('Erro de conexão. Verifique sua internet e se o servidor está rodando.');
        } else {
          setError('Erro inesperado ao carregar cardápio');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

  const handleBack = () => {
    router.back();
  };

  const handleItemClick = (item: MenuItem) => {
    console.log('Item selecionado:', item);
    setCurrentItem(item);
    router.push("../../itemCliente/item");
  };

  const handleOrder = () => {
    const orderItems = Object.entries(cart).map(([itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      if (!item) return null;
      return {
        id: item.id,
        name: item.nome,
        price: item.preco,
        quantity,
        total: item.preco * quantity,
      };
    }).filter(Boolean); 

    router.push({
      pathname: '/(cliente)/cardapio/finalizar-pedido',
      params: {
        order: JSON.stringify(orderItems),
      },
    });
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    const matchesSearch = item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    const isAvailable = item.disponibilidade === 'disponivel';
    return matchesCategory && matchesSearch && isAvailable;
  });

  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(item => item.id === itemId);
      return total + (item ? item.preco * quantity : 0);
    }, 0);
  };

  const handleRetry = () => {
    if (restaurantId) {
      setError(null);
      // Re-executar o useEffect
      const fetchData = async () => {
        try {
          setLoading(true);
          setError(null);
          
          const estabelecimentoResponse = await Api.get(`/estabelecimentos/${restaurantId}`);
          if (estabelecimentoResponse.data) {
            setEstabelecimento(estabelecimentoResponse.data);
          }

          const itensResponse = await Api.get('/itens');
          
          if (itensResponse.data && Array.isArray(itensResponse.data)) {
            const itensDoEstabelecimento = itensResponse.data.filter(
              (item: any) => item.id_estabelecimento?.toString() === restaurantId?.toString()
            );

            const itensFormatados: MenuItem[] = itensDoEstabelecimento.map((item: any) => ({
              id: item.id?.toString() || '',
              nome: item.nome || 'Item sem nome',
              descricao: item.descricao || 'Descrição não disponível',
              preco: parseFloat(item.preco) || 0,
              image: item.image || 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
              categoria: item.categoria || 'Outros',
              disponibilidade: item.disponibilidade || 'disponivel',
              id_estabelecimento: item.id_estabelecimento?.toString() || ''
            }));

            setMenuItems(itensFormatados);

            const categoriasUnicas = ['Todos', ...new Set(
              itensFormatados.map(item => item.categoria).filter(Boolean)
            )];
            setCategories(categoriasUnicas);

            if (!categoriasUnicas.includes(selectedCategory)) {
              setSelectedCategory(categoriasUnicas[0] || 'Todos');
            }
          } else {
            setMenuItems([]);
            setCategories(['Todos']);
          }
          
        } catch (error: any) {
          console.error('Erro ao buscar dados:', error);
          
          if (error.response) {
            setError(`Erro do servidor: ${error.response.status}`);
          } else if (error.request) {
            setError('Erro de conexão. Verifique sua internet e se o servidor está rodando.');
          } else {
            setError('Erro inesperado ao carregar cardápio');
          }
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  };

  // Loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Carregando...</Text>
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3cb378" />
          <Text style={styles.loadingText}>Carregando cardápio...</Text>
        </View>
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Erro</Text>
          </View>
        </View>
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
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              {estabelecimento?.nome || restaurantName || 'Restaurante'}
            </Text>
          </View>
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
            resizeMode="cover"
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>
              {estabelecimento?.nome || restaurantName || 'Restaurante'}
            </Text>
            <Text style={styles.heroSubtitle}>
              Descubra sabores únicos feitos especialmente para você!
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#9CA3AF" />
            <TextInput
              style={styles.searchInput}
              placeholder="Pesquise por item do cardápio"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Category Filter */}
        <View style={styles.categoryContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScrollContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.selectedCategoryButtonText
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <TouchableOpacity key={item.id} onPress={() => handleItemClick(item)}>
                <View style={styles.menuItemCompact}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.menuItemCompactImage}
                    resizeMode="cover"
                  />
                  <View style={styles.menuItemCompactContent}>
                    <View style={styles.menuItemCompactHeader}>
                      <Text style={styles.menuItemName}>{item.nome}</Text>
                    </View>
                    <Text style={styles.menuItemPrice}>R$ {item.preco.toFixed(2)}</Text>
                    <Text style={styles.menuItemDescription} numberOfLines={1}>
                      {item.descricao}
                    </Text>
                  </View>

                  <View style={styles.quantityControlsCompact}>
                    {cart[item.id] ? (
                      <>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => removeFromCart(item.id)}
                        >
                          <Minus size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{cart[item.id]}</Text>
                        <TouchableOpacity
                          style={styles.quantityButton}
                          onPress={() => addToCart(item.id)}
                        >
                          <Plus size={16} color="#FFFFFF" />
                        </TouchableOpacity>
                      </>
                    ) : (
                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => addToCart(item.id)}
                      >
                        <Text style={styles.addButtonText}>Adicionar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Nenhum item encontrado</Text>
              <Text style={styles.emptyMessage}>
                {searchQuery 
                  ? 'Tente pesquisar por outro termo'
                  : 'Não há itens disponíveis nesta categoria no momento'
                }
              </Text>
            </View>
          )}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Cart Footer */}
      {getTotalItems() > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.cartInfo}>
            <View style={styles.cartIcon}>
              <ShoppingCart size={20} color="#FFFFFF" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
              </View>
            </View>
            <View style={styles.cartDetails}>
              <Text style={styles.cartItemsText}>{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'}</Text>
              <Text style={styles.cartTotalText}>R$ {getTotalPrice().toFixed(2)}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.checkoutButton} onPress={() => handleOrder()}>
            <Text style={styles.checkoutButtonText}>Ver Carrinho</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
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
  },
  heroContainer: {
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 20,
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
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  selectedCategoryButton: {
    backgroundColor: '#3cb378',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedCategoryButtonText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 20,
  },
  menuItemCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    gap: 12,
  },
  menuItemCompactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
  },
  menuItemCompactContent: {
    flex: 1,
  },
  menuItemCompactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#24a637',
  },
  quantityControlsCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    backgroundColor: '#3cb378',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    minWidth: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cartFooter: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  cartIcon: {
    backgroundColor: '#3cb378',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cartDetails: {
    gap: 2,
  },
  cartItemsText: {
    fontSize: 14,
    color: '#6B7280',
  },
  cartTotalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  checkoutButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
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
  },
});