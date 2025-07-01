import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { Clock, CircleCheck as CheckCircle, Package, CircleAlert as AlertCircle } from 'lucide-react-native';

const orderStatuses = [
  { id: 'pending', label: 'Pendentes', icon: Clock, color: '#F59E0B' },
  { id: 'preparing', label: 'Preparando', icon: Package, color: '#3B82F6' },
  { id: 'ready', label: 'Prontos', icon: CheckCircle, color: '#10B981' },
  { id: 'delivered', label: 'Entregues', icon: CheckCircle, color: '#6B7280' },
];

const mockOrders = {
  pending: [
    { id: '#302', time: '10:15', items: '2x Hambúrguer + 1x Refrigerante', location: 'Bloco P', value: 'R$ 25,00' },
    { id: '#303', time: '10:20', items: '1x Pizza Margherita', location: 'PPGCC', value: 'R$ 18,00' },
  ],
  preparing: [
    { id: '#301', time: '09:45', items: '1x Suco de Uva 300ml', location: 'Bloco Q', value: 'R$ 8,00' },
  ],
  ready: [
    { id: '#300', time: '09:30', items: '1x Sanduíche Natural', location: 'Bloco R', value: 'R$ 12,00' },
  ],
  delivered: [
    { id: '#299', time: '09:00', items: '1x Açaí 500ml', location: 'Biblioteca', value: 'R$ 15,00' },
    { id: '#298', time: '08:45', items: '2x Pastel + 1x Suco', location: 'Bloco P', value: 'R$ 14,00' },
  ],
};

export default function VendedorOrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState('pending');

  const getStatusColor = (status: string) => {
    const statusObj = orderStatuses.find(s => s.id === status);
    return statusObj?.color || '#6B7280';
  };

  const getStatusIcon = (status: string) => {
    const statusObj = orderStatuses.find(s => s.id === status);
    return statusObj?.icon || AlertCircle;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>GERENCIAR PEDIDOS</Text>
      </View>

      {/* Status Filter */}
      <View style={styles.statusFilter}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statusScrollContainer}>
          {orderStatuses.map((status) => {
            const IconComponent = status.icon;
            const isSelected = selectedStatus === status.id;
            return (
              <TouchableOpacity
                key={status.id}
                style={[
                  styles.statusButton,
                  isSelected && { backgroundColor: status.color }
                ]}
                onPress={() => setSelectedStatus(status.id)}
              >
                <IconComponent 
                  size={16} 
                  color={isSelected ? '#FFFFFF' : status.color} 
                />
                <Text style={[
                  styles.statusButtonText,
                  isSelected && { color: '#FFFFFF' },
                  !isSelected && { color: status.color }
                ]}>
                  {status.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersContainer}>
          {mockOrders[selectedStatus as keyof typeof mockOrders]?.map((order) => {
            const IconComponent = getStatusIcon(selectedStatus);
            const statusColor = getStatusColor(selectedStatus);
            
            return (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.orderIdContainer}>
                    <Text style={styles.orderId}>Pedido {order.id}</Text>
                    <Text style={styles.orderTime}>{order.time}</Text>
                  </View>
                  <View style={[styles.statusIndicator, { backgroundColor: statusColor }]}>
                    <IconComponent size={16} color="#FFFFFF" />
                  </View>
                </View>

                <View style={styles.orderDetails}>
                  <Text style={styles.orderItems}>{order.items}</Text>
                  <Text style={styles.orderLocation}>📍 {order.location}</Text>
                  <Text style={styles.orderValue}>{order.value}</Text>
                </View>

                <View style={styles.orderActions}>
                  {selectedStatus === 'pending' && (
                    <>
                      <TouchableOpacity style={styles.acceptButton}>
                        <Text style={styles.acceptButtonText}>Aceitar Pedido</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.rejectButton}>
                        <Text style={styles.rejectButtonText}>Recusar</Text>
                      </TouchableOpacity>
                    </>
                  )}
                  
                  {selectedStatus === 'preparing' && (
                    <TouchableOpacity style={styles.readyButton}>
                      <Text style={styles.readyButtonText}>Marcar como Pronto</Text>
                    </TouchableOpacity>
                  )}
                  
                  {selectedStatus === 'ready' && (
                    <TouchableOpacity style={styles.deliveredButton}>
                      <Text style={styles.deliveredButtonText}>Marcar como Entregue</Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity style={styles.detailsButton}>
                    <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

          {mockOrders[selectedStatus as keyof typeof mockOrders]?.length === 0 && (
            <View style={styles.emptyState}>
              <AlertCircle size={48} color="#E5E7EB" />
              <Text style={styles.emptyTitle}>Nenhum pedido {orderStatuses.find(s => s.id === selectedStatus)?.label.toLowerCase()}</Text>
              <Text style={styles.emptyDescription}>
                Os pedidos aparecerão aqui quando houver novos pedidos neste status
              </Text>
            </View>
          )}
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
    backgroundColor: '#F59E0B',
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
  statusFilter: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  statusScrollContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    gap: 6,
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  ordersContainer: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderIdContainer: {
    flex: 1,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  orderTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  statusIndicator: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderDetails: {
    marginBottom: 20,
  },
  orderItems: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 8,
  },
  orderLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  orderValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F59E0B',
  },
  orderActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  acceptButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    minWidth: 120,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rejectButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rejectButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  readyButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  readyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  deliveredButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
  },
  deliveredButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  detailsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  bottomSpacing: {
    height: 20,
  },
});