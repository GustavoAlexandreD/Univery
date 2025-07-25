import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Store, Clock, MapPin, Phone, Mail, Settings, ChartBar as BarChart3, Package, DollarSign, Users } from 'lucide-react-native';
import { router } from 'expo-router';

const businessData = {
  name: 'Lanchonete do Campus',
  category: 'Alimentação • Lanches',
  hours: 'Seg-Sex: 08:00 - 18:00',
  location: 'Campus Universitário - Bloco Central',
  phone: '(11) 99999-9999',
  email: 'lanchonete@campus.edu.br',
};

export default function VendedorBusinessScreen() {
  const handleManageProducts = () => {
    router.push('/(vendedor)/detalhes/editar_cardapio');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>MEU NEGÓCIO</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Business Info Card */}
        <View style={styles.businessCard}>
          <View style={styles.businessHeader}>
            <View style={styles.businessIcon}>
              <Store size={32} color="#F59E0B" />
            </View>
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{businessData.name}</Text>
              <Text style={styles.businessCategory}>{businessData.category}</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Settings size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View style={styles.businessDetails}>
            <View style={styles.detailRow}>
              <Clock size={16} color="#6B7280" />
              <Text style={styles.detailText}>{businessData.hours}</Text>
            </View>
            <View style={styles.detailRow}>
              <MapPin size={16} color="#6B7280" />
              <Text style={styles.detailText}>{businessData.location}</Text>
            </View>
            <View style={styles.detailRow}>
              <Phone size={16} color="#6B7280" />
              <Text style={styles.detailText}>{businessData.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Mail size={16} color="#6B7280" />
              <Text style={styles.detailText}>{businessData.email}</Text>
            </View>
          </View>
        </View>
        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>AÇÕES RÁPIDAS</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleManageProducts}>
            <Package size={24} color="#10B981" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Gerenciar Produtos</Text>
              <Text style={styles.actionDescription}>Adicionar, editar ou remover produtos</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Settings size={24} color="#6B7280" />
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Configurações</Text>
              <Text style={styles.actionDescription}>Configurar horários, localização e contatos</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Business Status */}
        <View style={styles.statusSection}>
          <View style={styles.statusCard}>
            <View style={styles.statusHeader}>
              <Text style={styles.statusTitle}>Status do Negócio</Text>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>Aberto</Text>
              </View>
            </View>
            <Text style={styles.statusDescription}>
              Seu negócio está aberto e recebendo pedidos. Próximo fechamento às 18:00.
            </Text>
            <TouchableOpacity style={styles.toggleButton}>
              <Text style={styles.toggleButtonText}>Fechar Temporariamente</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomSpacing} />
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
  },
  businessCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  businessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  businessIcon: {
    backgroundColor: '#FEF3C7',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  businessCategory: {
    fontSize: 14,
    color: '#6B7280',
  },
  editButton: {
    padding: 8,
  },
  businessDetails: {
    gap: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  detailText: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F59E0B',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  actionButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionContent: {
    marginLeft: 16,
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#10B981',
  },
  statusDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  toggleButton: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#F59E0B',
  },
  bottomSpacing: {
    height: 20,
  },
});