import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, Plus, Edit3, Trash2, ImagePlus, X } from 'lucide-react-native';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Tapioca com Queijo',
    description: 'Descrição...',
    price: 5.00,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Tapiocas'
  },
  {
    id: '2',
    name: 'Tapioca com Frango',
    description: 'Descrição...',
    price: 8.00,
    image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Tapiocas'
  },
  {
    id: '3',
    name: 'Suco de Cajá 300ml',
    description: 'Descrição...',
    price: 3.50,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=300',
    category: 'Sucos'
  }
];

export default function EditarCardapioScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Tapiocas');
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categories, setCategories] = useState(['Tapiocas', 'Sucos']);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleBack = () => {
    router.back();
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddItem = () => {
    router.push('/(vendedor)/detalhes/add_produto');
  };

  const handleEditItem = (itemId: string) => {
    router.push({
      pathname: '/(vendedor)/detalhes/edit_produto',
      params: { id: itemId }
    });
  };

  const handleDeleteItem = (itemId: string) => {
    Alert.alert(
      'Excluir Item',
      'Tem certeza que deseja excluir este item?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
          }
        }
      ]
    );
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
    if (categories.length <= 1) {
      Alert.alert('Erro', 'Deve existir pelo menos uma categoria!');
      return;
    }

    Alert.alert(
      'Excluir Categoria',
      `Tem certeza que deseja excluir a categoria "${categoryToDelete}"? Todos os itens desta categoria também serão removidos.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: () => {
            // Remove category
            setCategories(prev => prev.filter(cat => cat !== categoryToDelete));
            // Remove all items from this category
            setMenuItems(prev => prev.filter(item => item.category !== categoryToDelete));
            // Switch to first remaining category
            const remainingCategories = categories.filter(cat => cat !== categoryToDelete);
            if (remainingCategories.length > 0) {
              setSelectedCategory(remainingCategories[0]);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Cardápio</Text>
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
                {categories.length > 1 && (
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
          <Text style={styles.sectionTitle}>{selectedCategory}</Text>
          
          {filteredItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.menuItemImage}
                resizeMode="cover"
              />
              <View style={styles.menuItemContent}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <Text style={styles.menuItemPrice}>{item.price.toFixed(2)} R$</Text>
              </View>
              <View style={styles.menuItemActions}>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => handleEditItem(item.id)}
                >
                  <Text style={styles.editButtonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.deleteButton}
                  onPress={() => handleDeleteItem(item.id)}
                >
                  <Trash2 size={16} color="#EF4444" />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {/* Add New Item Button */}
          <TouchableOpacity style={styles.addItemButton} onPress={handleAddItem}>
            <Plus size={32} color='#3cb378' />
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
    height:60,
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
    marginTop:10,
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
    marginLeft:10,
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
    marginLeft:50,
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
    alignItems: 'center',
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuItemImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F59E0B',
  },
  menuItemContent: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  menuItemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  menuItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3cb378',
  },
  menuItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deleteButton: {
    backgroundColor: '#FEE2E2',
    padding: 8,
    borderRadius: 8,
  },
  addItemButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation:2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bottomSpacing: {
    height: 100,
  },
});