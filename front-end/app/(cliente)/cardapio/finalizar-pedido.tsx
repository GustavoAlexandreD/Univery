import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, Plus } from 'lucide-react-native';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

interface DeliveryLocation {
  id: string;
  name: string;
  description: string;
  deliveryNote?: string;
}

const mockCartItems: CartItem[] = [
  {
    id: '3',
    name: 'Suco de Uva 300ml',
    description: 'Descrição...',
    price: 4.00,
    quantity: 1,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

export default function FinalizarPedidoScreen() {
  const params = useLocalSearchParams();
  const [deliveryOption, setDeliveryOption] = useState<'now' | 'later'>('now');
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [selectedLocation, setSelectedLocation] = useState<DeliveryLocation | null>(null);

  // Handle location data from navigation params
  useEffect(() => {
    if (params.locationId && params.locationName && params.locationDescription) {
      setSelectedLocation({
        id: params.locationId as string,
        name: params.locationName as string,
        description: params.locationDescription as string,
        deliveryNote: params.deliveryNote as string || '',
      });
    }
  }, [params]);

  const handleBack = () => {
    router.back();
  };

  const handleSelectLocation = () => {
    router.push('/cliente/local/local-home');
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addItem = (itemId: string) => {
    // This would typically add the item back or increase quantity
    console.log('Add item:', itemId);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDeliveryFee = () => {
    return 2.00;
  };

  const getTotal = () => {
    return getSubtotal() + getDeliveryFee();
  };

  const handleContinue = () => {
    // Navigate to payment or confirmation screen
    console.log('Continue with order');
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const clearLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>UECEANA</Text>
          <Text style={styles.headerSubtitle}>Come in and discover your new favorite comfort food - made just for you!</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Added Items Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Itens adicionados</Text>
            <TouchableOpacity onPress={clearCart}>
              <Text style={styles.clearButton}>Limpar</Text>
            </TouchableOpacity>
          </View>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.itemDetails}>
                  <Text style={styles.itemQuantity}>{item.quantity}x {item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
                </View>
                <View style={styles.itemActions}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => addItem(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Adicionar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.actionButton, styles.removeButton]}
                    onPress={() => removeItem(item.id)}
                  >
                    <Text style={styles.actionButtonText}>Remover</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyCartText}>Seu carrinho está vazio</Text>
            </View>
          )}

          <TouchableOpacity style={styles.addMoreButton}>
            <Plus size={20} color="#4ADE80" />
            <Text style={styles.addMoreText}>Adicionar mais itens</Text>
          </TouchableOpacity>
        </View>

        {/* Delivery Location Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Local de entrega</Text>
            {selectedLocation && (
              <TouchableOpacity onPress={clearLocation}>
                <Text style={styles.clearButton}>Limpar</Text>
              </TouchableOpacity>
            )}
          </View>

          {selectedLocation ? (
            <View style={styles.selectedLocationContainer}>
              <View style={styles.selectedLocationHeader}>
                <MapPin size={20} color="#4ADE80" />
                <View style={styles.selectedLocationInfo}>
                  <Text style={styles.selectedLocationName}>{selectedLocation.name}</Text>
                  <Text style={styles.selectedLocationDescription}>{selectedLocation.description}</Text>
                  {selectedLocation.deliveryNote && (
                    <Text style={styles.selectedLocationNote}>
                      Observação: {selectedLocation.deliveryNote}
                    </Text>
                  )}
                </View>
              </View>
              <TouchableOpacity style={styles.changeLocationButton} onPress={handleSelectLocation}>
                <Text style={styles.changeLocationText}>Alterar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.locationButton} onPress={handleSelectLocation}>
              <MapPin size={20} color="#4ADE80" />
              <Text style={styles.locationText}>Selecionar local de entrega</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Delivery Options Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opções de entrega</Text>

          <View style={styles.deliveryOptions}>
            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryOption === 'now' && styles.selectedDeliveryOption
              ]}
              onPress={() => setDeliveryOption('now')}
            >
              <View style={styles.deliveryOptionContent}>
                <Text style={styles.deliveryOptionTitle}>Pedir agora</Text>
                <Text style={styles.deliveryOptionPrice}>R$ 2,00</Text>
              </View>
              <View style={[
                styles.radioButton,
                deliveryOption === 'now' && styles.selectedRadioButton
              ]} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliveryOption,
                deliveryOption === 'later' && styles.selectedDeliveryOption
              ]}
              onPress={() => setDeliveryOption('later')}
            >
              <View style={styles.deliveryOptionContent}>
                <Text style={styles.deliveryOptionTitle}>Agendar retirada</Text>
                <Text style={styles.deliveryOptionPrice}>R$ 2,00</Text>
              </View>
              <View style={[
                styles.radioButton,
                deliveryOption === 'later' && styles.selectedRadioButton
              ]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Summary Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumo de valores</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>R$ {getSubtotal().toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Taxa de entrega</Text>
            <Text style={styles.summaryValue}>R$ {getDeliveryFee().toFixed(2)}</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>R$ {getTotal().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.totalSection}>
            <Text style={styles.footerTotalLabel}>Total com entrega</Text>
            <Text style={styles.footerTotalValue}>
              {getTotal().toFixed(2)} <Text style={styles.currency}>R$</Text>
              <Text style={styles.itemCount}> / 1 item</Text>
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
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
  headerSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  clearButton: {
    fontSize: 14,
    color: '#4ADE80',
    fontWeight: '500',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  itemImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 12,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemDetails: {
    flex: 1,
    marginRight: 12,
  },
  itemQuantity: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  itemDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4ADE80',
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  actionButton: {
    backgroundColor: '#4ADE80',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#EF4444',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emptyCart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#6B7280',
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginTop: 8,
    gap: 8,
  },
  addMoreText: {
    fontSize: 16,
    color: '#4ADE80',
    fontWeight: '500',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#4ADE80',
    fontWeight: '500',
  },
  selectedLocationContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#4ADE80',
  },
  selectedLocationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  selectedLocationInfo: {
    flex: 1,
    marginLeft: 12,
  },
  selectedLocationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  selectedLocationDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  selectedLocationNote: {
    fontSize: 12,
    color: '#4ADE80',
    fontStyle: 'italic',
  },
  changeLocationButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#4ADE80',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  changeLocationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  deliveryOptions: {
    gap: 12,
  },
  deliveryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedDeliveryOption: {
    borderColor: '#4ADE80',
    backgroundColor: '#F0FDF4',
  },
  deliveryOptionContent: {
    flex: 1,
  },
  deliveryOptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  deliveryOptionPrice: {
    fontSize: 14,
    color: '#6B7280',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  selectedRadioButton: {
    borderColor: '#4ADE80',
    backgroundColor: '#4ADE80',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    marginTop: 8,
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
  },
  bottomSpacing: {
    height: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  totalSection: {
    flex: 1,
  },
  footerTotalLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  footerTotalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4ADE80',
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80',
  },
  itemCount: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '400',
  },
  continueButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 16,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});