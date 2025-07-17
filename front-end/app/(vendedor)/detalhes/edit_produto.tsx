import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Check, X, Utensils } from 'lucide-react-native';
import Api from '@/config/Api';

interface MenuItem {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  disponibilidade: 'disponivel' | 'esgotado';
  id_estabelecimento: string;
}

export default function EditProductScreen() {
  const params = useLocalSearchParams();
  const itemId = params.id as string;
  
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface IconOption {
    id: string;
    name: string;
    category: string;
    backgroundColor: string;
    component: React.ReactNode;
  }

  const iconOptions: IconOption[] = [
    {
      id: 'ice-cream',
      name: 'Sorvete',
      category: 'Sobremesas',
      backgroundColor: '#A7C7C7',
      component: (
        <View style={styles.iceCreamIcon}>
          <View style={[styles.iceCreamScoop, { backgroundColor: '#FFB6C1' }]} />
          <View style={[styles.iceCreamScoop, { backgroundColor: '#FFD700', marginTop: -8 }]} />
          <View style={[styles.iceCreamScoop, { backgroundColor: '#98FB98', marginTop: -8 }]} />
          <View style={styles.iceCreamCone} />
        </View>
      )
    },
    {
      id: 'juice',
      name: 'Suco',
      category: 'Bebidas',
      backgroundColor: '#3cb378',
      component: (
        <View style={styles.juiceIcon}>
          <View style={styles.juiceContainer}>
            <View style={styles.juiceTop} />
            <View style={styles.juiceBottom} />
          </View>
          <View style={styles.straw} />
        </View>
      )
    },
    {
      id: 'salad',
      name: 'Salada',
      category: 'Salgados',
      backgroundColor: '#FFA500',
      component: (
        <View style={styles.saladIcon}>
          <View style={[styles.leafShape, { backgroundColor: '#228B22', transform: [{ rotate: '15deg' }] }]} />
          <View style={[styles.leafShape, { backgroundColor: '#32CD32', transform: [{ rotate: '-15deg' }], marginTop: -12 }]} />
          <View style={[styles.leafShape, { backgroundColor: '#90EE90', marginTop: -8 }]} />
        </View>
      )
    },
    {
      id: 'utensils',
      name: 'Prato',
      category: 'Pratos',
      backgroundColor: '#EF4444',
      component: <Utensils size={32} color="#FFFFFF" />
    }
  ];

  const [selectedIcon, setSelectedIcon] = useState<IconOption>(iconOptions[1]); // Default to juice
  const [showIconModal, setShowIconModal] = useState(false);

  useEffect(() => {
    if (itemId) {
      fetchItemData();
    } else {
      setError('ID do item não fornecido');
      setLoading(false);
    }
  }, [itemId]);

  const fetchItemData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await Api.get(`/itens/${itemId}`);
      
      if (response.data) {
        const item = response.data;
        setProductName(item.nome || '');
        setProductDescription(item.descricao || '');
        setProductPrice(item.preco?.toString() || '');
        setProductCategory(item.categoria || '');
        setIsAvailable(item.disponibilidade === 'disponivel');
      }
    } catch (error: any) {
      console.error('Erro ao buscar item:', error);
      
      if (error.response?.status === 404) {
        setError('Item não encontrado');
      } else if (error.response?.status === 403) {
        setError('Você não tem permissão para editar este item');
      } else {
        setError('Erro ao carregar dados do item');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  const validateForm = () => {
    if (!productName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do produto.');
      return false;
    }
    
    if (!productPrice.trim()) {
      Alert.alert('Erro', 'Por favor, insira o preço do produto.');
      return false;
    }

    const price = parseFloat(productPrice.replace(',', '.'));
    if (isNaN(price) || price <= 0) {
      Alert.alert('Erro', 'Por favor, insira um preço válido.');
      return false;
    }

    if (!productCategory.trim()) {
      Alert.alert('Erro', 'Por favor, insira a categoria do produto.');
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const updatedProduct = {
        nome: productName.trim(),
        descricao: productDescription.trim() || 'Descrição não informada',
        preco: parseFloat(productPrice.replace(',', '.')),
        categoria: productCategory.trim(),
        disponibilidade: isAvailable ? 'disponivel' : 'esgotado'
      };

      await Api.put(`/itens/${itemId}`, updatedProduct);

      Alert.alert(
        'Sucesso',
        'Produto atualizado com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error: any) {
      console.error('Erro ao atualizar produto:', error);
      
      if (error.response?.status === 400) {
        Alert.alert('Erro', 'Dados inválidos. Verifique as informações e tente novamente.');
      } else if (error.response?.status === 401) {
        Alert.alert('Erro', 'Você não tem permissão para editar este produto.');
      } else if (error.response?.status === 404) {
        Alert.alert('Erro', 'Produto não encontrado.');
      } else {
        Alert.alert('Erro', 'Não foi possível atualizar o produto. Tente novamente.');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Excluir Produto',
      `Tem certeza que deseja excluir "${productName}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await Api.delete(`/itens/${itemId}`);
              
              Alert.alert(
                'Produto Excluído',
                'O produto foi excluído com sucesso.',
                [
                  {
                    text: 'OK',
                    onPress: () => router.back()
                  }
                ]
              );
            } catch (error: any) {
              console.error('Erro ao excluir produto:', error);
              
              if (error.response?.status === 404) {
                Alert.alert('Erro', 'Produto não encontrado');
              } else if (error.response?.status === 403) {
                Alert.alert('Erro', 'Você não tem permissão para excluir este produto');
              } else {
                Alert.alert('Erro', 'Não foi possível excluir o produto. Tente novamente.');
              }
            }
          }
        }
      ]
    );
  };

  const toggleAvailability = () => {
    setIsAvailable(!isAvailable);
  };

  const handleIconPress = () => {
    setShowIconModal(true);
  };

  const handleIconSelect = (icon: IconOption) => {
    setSelectedIcon(icon);
    setShowIconModal(false);
  };

  const handleCloseModal = () => {
    setShowIconModal(false);
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
          <Text style={styles.loadingText}>Carregando dados do produto...</Text>
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
          <TouchableOpacity style={styles.retryButton} onPress={fetchItemData}>
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
        <Text style={styles.headerTitle}>Editar Produto</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Icon */}
        <View style={styles.iconContainer}>
          <TouchableOpacity 
            style={[styles.iconBackground, { backgroundColor: selectedIcon.backgroundColor }]} 
            onPress={handleIconPress}
          >
            {selectedIcon.component}
          </TouchableOpacity>
          <Text style={styles.iconHint}>Toque para alterar o ícone</Text>
        </View>

        {/* Product Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Nome do Produto *</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Nome do produto"
            placeholderTextColor="#9CA3AF"
            value={productName}
            onChangeText={setProductName}
            maxLength={100}
          />
        </View>

        {/* Product Category Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Categoria *</Text>
          <TextInput
            style={styles.categoryInput}
            placeholder="Categoria do produto"
            placeholderTextColor="#9CA3AF"
            value={productCategory}
            onChangeText={setProductCategory}
            maxLength={50}
          />
        </View>

        {/* Product Description Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Descrição</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Descrição do produto"
            placeholderTextColor="#9CA3AF"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            textAlignVertical="top"
            maxLength={500}
          />
        </View>

        {/* Availability Toggle */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.availabilityLabel}>Disponível</Text>
          <TouchableOpacity 
            style={[styles.checkbox, isAvailable && styles.checkboxChecked]}
            onPress={toggleAvailability}
          >
            {isAvailable && <Check size={16} color="#FFFFFF" />}
          </TouchableOpacity>
        </View>

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Preço *</Text>
          <TextInput
            style={styles.priceInput}
            placeholder="0,00"
            placeholderTextColor='#3cb378'
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="decimal-pad"
            maxLength={10}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          style={[styles.saveButton, saving && styles.saveButtonDisabled]} 
          onPress={handleSave}
          disabled={saving}
        >
          <Text style={styles.saveButtonText}>
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Excluir Produto</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Icon Selection Modal */}
      <Modal
        visible={showIconModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Escolha um ícone</Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.iconGrid}>
              {['Sobremesas', 'Bebidas', 'Salgados', 'Pratos'].map((category) => (
                <View key={category} style={styles.categorySection}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <View style={styles.iconRow}>
                    {iconOptions
                      .filter(icon => icon.category === category)
                      .map((icon) => (
                        <TouchableOpacity
                          key={icon.id}
                          style={[styles.iconOption, { backgroundColor: icon.backgroundColor }]}
                          onPress={() => handleIconSelect(icon)}
                        >
                          {icon.component}
                        </TouchableOpacity>
                      ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconHint: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
    fontStyle: 'italic',
  },
  juiceIcon: {
    position: 'relative',
    alignItems: 'center',
  },
  juiceContainer: {
    width: 40,
    height: 50,
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    overflow: 'hidden',
  },
  juiceTop: {
    height: 15,
    backgroundColor: '#F59E0B',
  },
  juiceBottom: {
    flex: 1,
    backgroundColor: '#F59E0B',
  },
  straw: {
    position: 'absolute',
    top: -10,
    right: 8,
    width: 3,
    height: 25,
    backgroundColor: '#E5E7EB',
    borderRadius: 1.5,
  },
  inputContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  nameInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 120,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  availabilityLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#3cb378',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3cb378',
  },
  priceInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 18,
    color: '#3cb378',
    borderWidth: 2,
    borderColor: '#3cb378',
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3cb378',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#EF4444',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    maxWidth: 400,
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  iconGrid: {
    gap: 20,
  },
  categorySection: {
    gap: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 16,
  },
  iconOption: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iceCreamIcon: {
    alignItems: 'center',
  },
  iceCreamScoop: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  iceCreamCone: {
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#D2691E',
    marginTop: -4,
  },
  saladIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  leafShape: {
    width: 16,
    height: 24,
    borderRadius: 12,
  },
});