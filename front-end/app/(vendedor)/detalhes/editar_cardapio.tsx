import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Plus, Edit3, Trash2, ImagePlus, X } from 'lucide-react-native';
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

export default function EditarCardapioScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['Todos']);
  const [estabelecimento, setEstabelecimento] = useState<Estabelecimento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Simulando ID do estabelecimento logado - em produção viria do contexto de autenticação
  const estabelecimentoId = "1"; // Você pode pegar isso do AsyncStorage ou contexto de auth

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Buscar dados do estabelecimento
      const estabelecimentoResponse = await Api.get(`/estabelecimentos/${estabelecimentoId}`);
      if (estabelecimentoResponse.data) {
        setEstabelecimento(estabelecimentoResponse.data);
      }

      // Buscar itens do estabelecimento
      const itensResponse = await Api.get('/itens');
      
      if (itensResponse.data && Array.isArray(itensResponse.data)) {
        // Filtrar itens apenas do estabelecimento atual
        const itensDoEstabelecimento = itensResponse.data.filter(
          (item: any) => item.id_estabelecimento?.toString() === estabelecimentoId?.toString()
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

  const handleBack = () => {
    router.back();
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'Todos' || item.categoria === selectedCategory;
    const matchesSearch = item.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = () => {
    router.push('/(vendedor)/detalhes/add_produto');
  };

  const handleEditItem = async (itemId: string) => {
    try {
      // Buscar dados completos do item
      const response = await Api.get(`/itens/${itemId}`);
      
      router.push({
        pathname: '/(vendedor)/detalhes/edit_produto',
        params: { 
          id: itemId,
          itemData: JSON.stringify(response.data)
        }
      });
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do item');
    }
  };

  const handleDeleteItem = async (itemId: string, itemName: string) => {
    Alert.alert(
      'Excluir Item',
      `Tem certeza que deseja excluir "${itemName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await Api.delete(`/itens/${itemId}`);
              
              // Atualizar lista local
              setMenuItems(prev => prev.filter(item => item.id !== itemId));
              
              Alert.alert('Sucesso', 'Item excluído com sucesso!');
            } catch (error: any) {
              console.error('Erro ao excluir item:', error);
              
              if (error.response?.status === 404) {
                Alert.alert('Erro', 'Item não encontrado');
              } else if (error.response?.status === 403) {
                Alert.alert('Erro', 'Você não tem permissão para excluir este item');
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o item. Tente novamente.');
              }
            }
          }
        }
      ]
    );
  };

  const handleToggleAvailability = async (itemId: string, currentAvailability: string) => {
    try {
      const newAvailability = currentAvailability === 'disponivel' ? 'esgotado' : 'disponivel';
      
      await Api.patch(`/itens/${itemId}/disponibilidade`, {
        disponibilidade: newAvailability
      });

      // Atualizar lista local
      setMenuItems(prev => prev.map(item => 
        item.id === itemId 
          ? { ...item, disponibilidade: newAvailability as 'disponivel' | 'esgotado' }
          : item
      ));

      Alert.alert(
        'Sucesso', 
        `Item marcado como ${newAvailability === 'disponivel' ? 'disponível' : 'esgotado'}`
      );
    } catch (error: any) {
      console.error('Erro ao alterar disponibilidade:', error);
      Alert.alert('Erro', 'Não foi possível alterar a disponibilidade do item');
    }
  };

  const handleAddImage = () => {
    Alert.alert(
      'Adicionar Imagem',
      'Funcionalidade para adicionar imagem será implementada',
      [{ text: 'OK' }]
    );
  };

  const handleAddNewCategory = () => {
    setShowNewCategoryInput(true);
  };

  const handleCreateCategory = () => {
    if (newCategoryName.trim() && !categories.includes(newCategoryName.trim())) {
      const newCategory = newCategoryName.trim();
      setCategories(prev => [...prev, newCategory]);
      setSelectedCategory(newCategory);
      setNewCategoryName('');
      setShowNewCategoryInput(false);
    } else if (categories.includes(newCategoryName.trim())) {
      Alert.alert('Erro', 'Esta categoria já existe!');
    } else {
      Alert.alert('Erro', 'Nome da categoria não pode estar vazio!');
    }
  };

  const handleCancelNewCategory = () => {
    setNewCategoryName('');
    setShowNewCategoryInput(false);
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    if (categories.length <= 2) { // 'Todos' + pelo menos 1 categoria
      Alert.alert('Erro', 'Deve existir pelo menos uma categoria!');
      return;
    }

    const itemsInCategory = menuItems.filter(item => item.categoria === categoryToDelete);
    
    if (itemsInCategory.length > 0) {
      Alert.alert(
        'Categoria não vazia',
        `A categoria "${categoryToDelete}" possui ${itemsInCategory.length} item(ns). Mova ou exclua os itens antes de deletar a categoria.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Excluir Categoria',
      `Tem certeza que deseja excluir a categoria "${categoryToDelete}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // Remove category
            setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
            // Switch to 'Todos' category
            setSelectedCategory('Todos');
          }
        }
      ]
    );
  };

  const handleRetry = () => {
    fetchData();
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carregando...</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3cb378" />
          <Text style={styles.loadingText}>Carregando cardápio...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Erro</Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Ops! Algo deu errado</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {estabelecimento?.nome ? `${estabelecimento.nome} - Cardápio` : 'Editar Cardápio'}
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Add Image Section */}
        <View style={styles.addImageSection}>
          <Text style={styles.addImageTitle}>ADICIONE UMA IMAGEM</Text>
          <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
            <View style={styles.addImageIcon}>
              <ImagePlus size={32} color="#FFFFFF" />
            </View>
            <View style={styles.addImagePlus}>
              <Plus size={20} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color='#3cb378' />
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
              <View key={category} style={styles.categoryWrapper}>
                <TouchableOpacity
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
                {categories.length > 2 && category !== 'Todos' && (
                  <TouchableOpacity
                    style={styles.deleteCategoryButton}
                    onPress={() => handleDeleteCategory(category)}
                  >
                    <X size={14} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </ScrollView>

          <View>
            {/* Add New Category Button */}
            {!showNewCategoryInput ? (
              <TouchableOpacity
                style={styles.addCategoryButton}
                onPress={handleAddNewCategory}
              >
                <Plus size={16} color='#3cb378' />
                <Text style={styles.addCategoryText}>Nova Categoria</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.newCategoryInputContainer}>
                <TextInput
                  style={styles.newCategoryInput}
                  placeholder="Nome da categoria"
                  placeholderTextColor="#9CA3AF"
                  value={newCategoryName}
                  onChangeText={setNewCategoryName}
                  autoFocus
                />
                <TouchableOpacity
                  style={styles.confirmCategoryButton}
                  onPress={handleCreateCategory}
                >
                  <Text style={styles.confirmCategoryText}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelCategoryButton}
                  onPress={handleCancelNewCategory}
                >
                  <Text style={styles.cancelCategoryText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Menu Items Section */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory} ({filteredItems.length} {filteredItems.length === 1 ? 'item' : 'itens'})
          </Text>
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                  resizeMode="cover"
                />
                <View style={styles.menuItemContent}>
                  <View style={styles.menuItemHeader}>
                    <Text style={styles.menuItemName}>{item.nome}</Text>
                    <View style={[
                      styles.availabilityBadge,
                      item.disponibilidade === 'disponivel' ? styles.availableBadge : styles.unavailableBadge
                    ]}>
                      <Text style={[
                        styles.availabilityText,
                        item.disponibilidade === 'disponivel' ? styles.availableText : styles.unavailableText
                      ]}>
                        {item.disponibilidade === 'disponivel' ? 'Disponível' : 'Esgotado'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.menuItemDescription} numberOfLines={2}>{item.descricao}</Text>
                  <Text style={styles.menuItemPrice}>R$ {item.preco.toFixed(2)}</Text>
                  <Text style={styles.menuItemCategory}>Categoria: {item.categoria}</Text>
                </View>
                <View style={styles.menuItemActions}>
                  <TouchableOpacity 
                    style={[
                      styles.toggleButton,
                      item.disponibilidade === 'disponivel' ? styles.disableButton : styles.enableButton
                    ]}
                    onPress={() => handleToggleAvailability(item.id, item.disponibilidade)}
                  >
                    <Text style={styles.toggleButtonText}>
                      {item.disponibilidade === 'disponivel' ? 'Esgotar' : 'Disponibilizar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditItem(item.id)}
                  >
                    <Edit3 size={16} color="#FFFFFF" />
                    <Text style={styles.editButtonText}>Editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteItem(item.id, item.nome)}
                  >
                    <Trash2 size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>
                {searchQuery 
                  ? 'Nenhum item encontrado' 
                  : selectedCategory === 'Todos' 
                    ? 'Nenhum item cadastrado'
                    : `Nenhum item na categoria "${selectedCategory}"`
                }
              </Text>
              <Text style={styles.emptyMessage}>
                {searchQuery 
                  ? 'Tente pesquisar por outro termo'
                  : 'Adicione novos itens ao seu cardápio'
                }
              </Text>
            </View>
          )}

          {/* Add New Item Button */}
          <TouchableOpacity style={styles.addItemButton} onPress={handleAddItem}>
            <Plus size={32} color='#3cb378' />
            <Text style={styles.addItemText}>Adicionar Novo Item</Text>
          </TouchableOpacity>
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
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  addImageSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#E5E7EB',
  },
  addImageTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  addImageButton: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageIcon: {
    width: 80,
    height: 80,
    backgroundColor: '#9CA3AF',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImagePlus: {
    position: 'absolute',
    bottom: -8,
    right: -8,
    width: 32,
    height: 32,
    backgroundColor: '#3cb378',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderWidth: 1,
    borderColor: '#3cb378',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  categoryScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'center',
  },
  categoryWrapper: {
    position: 'relative',
    marginTop: 10,
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
  deleteCategoryButton: {
    position: 'absolute',
    top: -6,
    right: -6,
    width: 20,
    height: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#3cb378',
    gap: 6,
    width: 150,
    alignSelf: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  addCategoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#3cb378',
  },
  newCategoryInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'center',
    marginLeft: 50,
    marginTop: 10,
  },
  newCategoryInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#3cb378',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 14,
    color: '#1F2937',
    minWidth: 120,
  },
  confirmCategoryButton: {
    backgroundColor: '#3cb378',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmCategoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  cancelCategoryButton: {
    backgroundColor: '#EF4444',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelCategoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  menuContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F59E0B',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  availabilityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: '#DCFCE7',
  },
  unavailableBadge: {
    backgroundColor: '#FEE2E2',
  },
  availabilityText: {
    fontSize: 10,
    fontWeight: '600',
  },
  availableText: {
    color: '#16A34A',
  },
  unavailableText: {
    color: '#DC2626',
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 16,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3cb378',
    marginBottom: 4,
  },
  menuItemCategory: {
    fontSize: 11,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  menuItemActions: {
    alignItems: 'flex-end',
    gap: 6,
    minWidth: 80,
  },
  toggleButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 70,
  },
  enableButton: {
    backgroundColor: '#16A34A',
  },
  disableButton: {
    backgroundColor: '#F59E0B',
  },
  toggleButtonText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  editButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    minWidth: 70,
  },
  editButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    minWidth: 32,
  },
  addItemButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginTop: 16,
    borderWidth: 2,
    borderColor: '#3cb378',
    borderStyle: 'dashed',
  },
  addItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3cb378',
    marginTop: 8,
  },
  bottomSpacing: {
    height: 100,
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