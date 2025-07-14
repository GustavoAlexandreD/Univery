import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, X, Utensils } from 'lucide-react-native';



export default function AddProdutoScreen() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [showIconModal, setShowIconModal] = useState(false);
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
        backgroundColor: '#4ADE80',
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
  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    if (!productName.trim()) {
      Alert.alert('Erro', 'Por favor, insira o nome do produto.');
      return;
    }
    
    if (!productPrice.trim()) {
      Alert.alert('Erro', 'Por favor, insira o preço do produto.');
      return;
    }

    // Create new product object
    const newProduct = {
      id: Date.now().toString(), // Simple ID generation
      name: productName,
      description: productDescription || 'Descrição...',
      price: parseFloat(productPrice.replace(',', '.')),
      image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=300', // Default image
      category: 'Tapiocas', // Default category - in a real app, this would be selectable
      icon: selectedIcon
    };

    // Navigate back with the new product data
    router.back();
    
    // Show success message
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
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
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter} />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Product Icon */}
        <View style={styles.iconContainer}>
          <TouchableOpacity style={[styles.iconBackground, { backgroundColor: selectedIcon.backgroundColor }]} onPress={handleIconPress}>
            {selectedIcon.component}
          </TouchableOpacity>
        </View>

        {/* Product Name Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.nameInput}
            placeholder="Insira nome do produto."
            placeholderTextColor="#9CA3AF"
            value={productName}
            onChangeText={setProductName}
          />
        </View>

        {/* Product Description Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Insira a descrição do produto"
            placeholderTextColor="#9CA3AF"
            value={productDescription}
            onChangeText={setProductDescription}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />

        {/* Price Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.priceInput}
            placeholder="Digite o preço do produto"
            placeholderTextColor="#4ADE80"
            value={productPrice}
            onChangeText={setProductPrice}
            keyboardType="numeric"
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar</Text>
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
              <Text style={styles.modalTitle}>Adicione um ícone</Text>
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
  headerCenter: {
    flex: 1,
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
    marginBottom: 16,
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
  descriptionInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 150,
  },
  spacer: {
    height: 80,
  },
  priceInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#4ADE80',
    borderWidth: 2,
    borderColor: '#4ADE80',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#9CA3AF',
    marginHorizontal: 20,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#D1D5DB',
    borderRadius: 4,
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