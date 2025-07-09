import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Eye, CircleCheck as CheckCircle, RefreshCw } from 'lucide-react-native';
import HeaderEstablishment from '@/components/HeaderEstablishment';
import { router } from 'expo-router';

const activeOrders = [
  {
    id: '#301',
    date: '09:30 20/05/2025',
    items: '1x Suco de Uva 300ml',
    location: 'Para Entrega',
    value: 'R$ 8,00',
    status: 'active'
  }
];

const orderHistory = [
  {
    id: '1',
    title: 'Pedido 1',
    subtitle: 'Hora que foi realizado',
    items: 'Itens do Pedido',
    location: 'Local de Entrega',
    status: 'Status'
  },
  {
    id: '2',
    title: 'Pedido 1',
    subtitle: 'Hora que foi realizado',
    items: 'Itens do Pedido',
    location: 'Local de Entrega',
    status: 'Status'
  },
  {
    id: '3',
    title: 'Pedido 1',
    subtitle: 'Hora que foi realizado',
    items: 'Itens do Pedido',
    location: 'Local de Entrega',
    status: 'Status'
  }
];

export default function VendedorDashboard() {
  const handleVerDetalhes = () => {
    router.push('/(vendedor)/detalhes/ver_entrega');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderEstablishment />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Dashboard Title */}
        <View style={styles.dashboardHeader}>
          <Text style={styles.dashboardTitle}>PAINEL DO VENDEDOR</Text>
        </View>

        {/* Active Orders Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PEDIDOS ATIVOS</Text>
          
          {activeOrders.map((order) => (
            <View key={order.id} style={styles.activeOrderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>Pedido {order.id}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.orderLabel}>Itens do Pedido</Text>
                <Text style={styles.orderItems}>{order.items}</Text>
                <Text style={styles.orderLocation}>{order.location}</Text>
                <Text style={styles.orderValue}>Valor: {order.value}</Text>
              </View>

              <View style={styles.orderActions}>
                <TouchableOpacity style={styles.refundButton}>
                  <Text style={styles.refundButtonText}>Reembolsar cliente</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.viewButton} onPress={handleVerDetalhes}>
                  <Eye size={16} color="#FFFFFF" />
                  <Text style={styles.viewButtonText}>Ver Pedido</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.readyButton}>
                  <Text style={styles.readyButtonText}>Pronto para entrega</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Order History Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HISTÓRICO DE PEDIDOS</Text>
          
          {orderHistory.map((order) => (
            <View key={order.id} style={styles.historyOrderCard}>
              <View style={styles.historyOrderContent}>
                <View style={styles.historyOrderInfo}>
                  <Text style={styles.historyOrderTitle}>{order.title}</Text>
                  <Text style={styles.historyOrderSubtitle}>{order.subtitle}</Text>
                  <Text style={styles.historyOrderItems}>{order.items}</Text>
                  <Text style={styles.historyOrderLocation}>{order.location}</Text>
                </View>
                
                <View style={styles.historyOrderActions}>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                  
                  <TouchableOpacity style={styles.historyRefundButton}>
                    <Text style={styles.historyRefundButtonText}>Reembolsar cliente</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
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
  content: {
    flex: 1,
  },
  dashboardHeader: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 16,
  },
  dashboardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4ADE80',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4ADE80',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  activeOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  orderDate: {
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  orderItems: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  orderLocation: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
    marginBottom: 4,
  },
  orderValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  orderActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  refundButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  refundButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  viewButton: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  readyButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  readyButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  historyOrderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  historyOrderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  historyOrderInfo: {
    flex: 1,
  },
  historyOrderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  historyOrderSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  historyOrderItems: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  historyOrderLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  historyOrderActions: {
    alignItems: 'flex-end',
    gap: 8,
  },
  statusBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  historyRefundButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  historyRefundButtonText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 20,
  },
});