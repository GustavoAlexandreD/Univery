import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ShoppingBag, Clock, MapPin, Phone } from 'lucide-react-native';

interface Order {
  id: string;
  restaurantName: string;
  items: string[];
  total: number;
  status: 'active' | 'completed' | 'cancelled';
  date: string;
  time: string;
  address: string;
  phone: string;
}

export default function ClienteOrdersScreen() {
  // Mock data - replace with actual data from your API
  const [orders] = useState<Order[]>([
    {
      id: '1',
      restaurantName: 'Restaurante do João',
      items: ['Pizza Margherita', 'Refrigerante 2L'],
      total: 45.90,
      status: 'active',
      date: '15/01/2024',
      time: '19:30',
      address: 'Rua das Flores, 123',
      phone: '(11) 99999-9999'
    },
    {
      id: '2',
      restaurantName: 'Burger House',
      items: ['X-Bacon', 'Batata Frita', 'Coca-Cola'],
      total: 32.50,
      status: 'completed',
      date: '14/01/2024',
      time: '20:15',
      address: 'Av. Principal, 456',
      phone: '(11) 88888-8888'
    },
    {
      id: '3',
      restaurantName: 'Sushi Express',
      items: ['Combo 1', 'Hot Roll'],
      total: 68.00,
      status: 'completed',
      date: '13/01/2024',
      time: '18:45',
      address: 'Rua do Sushi, 789',
      phone: '(11) 77777-7777'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return '#3cb378';
      case 'completed':
        return '#6B7280';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'PEDIDO ATIVO';
      case 'completed':
        return 'ENTREGUE';
      case 'cancelled':
        return 'CANCELADO';
      default:
        return 'DESCONHECIDO';
    }
  };

  const renderOrderCard = (order: Order) => (
    <View key={order.id} style={[
      styles.orderCard,
      order.status === 'active' && styles.activeOrderCard
    ]}>
      {order.status === 'active' && (
        <View style={styles.activeHeader}>
          <Text style={styles.activeHeaderText}>PEDIDO ATIVO</Text>
        </View>
      )}
      
      <View style={styles.orderHeader}>
        <Text style={styles.restaurantName}>{order.restaurantName}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(order.status) }]} />
          <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Clock size={16} color="#6B7280" />
          <Text style={styles.infoText}>{order.date} às {order.time}</Text>
        </View>
        <View style={styles.infoRow}>
          <MapPin size={16} color="#6B7280" />
          <Text style={styles.infoText}>{order.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Phone size={16} color="#6B7280" />
          <Text style={styles.infoText}>{order.phone}</Text>
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <Text style={styles.itemsTitle}>Itens do pedido:</Text>
        {order.items.map((item, index) => (
          <Text key={index} style={styles.itemText}>• {item}</Text>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.totalText}>Total: R$ {order.total.toFixed(2)}</Text>
        <View style={styles.actionButtons}>
          {order.status === 'active' ? (
            <>
              <TouchableOpacity style={styles.trackButton}>
                <Text style={styles.trackButtonText}>ACOMPANHAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>CANCELAR</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.reorderButton}>
              <Text style={styles.reorderButtonText}>PEDIR NOVAMENTE</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  if (orders.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MEUS PEDIDOS</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.emptyState}>
            <ShoppingBag size={64} color="#E5E7EB" />
            <Text style={styles.emptyTitle}>Nenhum pedido ainda</Text>
            <Text style={styles.emptyDescription}>
              Seus pedidos aparecerão aqui quando você fizer um pedido
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MEUS PEDIDOS</Text>
      </View>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersContainer}>
          {orders.map(renderOrderCard)}
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollContainer: {
    flex: 1,
  },
  ordersContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  activeOrderCard: {
    borderWidth: 2,
    borderColor: '#3cb378',
  },
  activeHeader: {
    backgroundColor: '#3cb378',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  activeHeaderText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 12,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    flex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderInfo: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  itemsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  itemsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  itemText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  trackButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  trackButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  reorderButton: {
    backgroundColor: '#3cb378',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});