import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [pixKey, setPixKey] = useState('034.776.812-54');

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Text style={styles.profileHeaderTitle}>Perfil do{'\n'}Entregador</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* PIX Key Section */}
        <View style={styles.pixSection}>
          <Text style={styles.pixLabel}>Chave Pix</Text>
          <View style={styles.pixInputContainer}>
            <TextInput
              style={[styles.pixInput, !isEditing && styles.pixInputDisabled]}
              value={pixKey}
              onChangeText={setPixKey}
              editable={isEditing}
              placeholder="Digite sua chave PIX"
              placeholderTextColor="#9CA3AF"
            />
          </View>
        </View>

        {/* Large spacing area to match design */}
        <View style={styles.spacingArea} />

        {/* Edit Button */}
        <TouchableOpacity 
          style={styles.editButton}
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>Editar</Text>
        </TouchableOpacity>

        {/* Bottom spacing for tab bar */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  profileHeader: {
    backgroundColor: '#3cb378',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  profileHeaderTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  pixSection: {
    marginBottom: 24,
  },
  pixLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  pixInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3cb378',
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  pixInput: {
    fontSize: 16,
    color: '#1F2937',
    paddingVertical: 16,
    fontWeight: '500',
  },
  pixInputDisabled: {
    color: '#6B7280',
  },
  spacingArea: {
    flex: 1,
    minHeight: 300, // Large spacing to match the design
  },
  editButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  editButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomSpacing: {
    height: 100, // Extra space for tab bar
  },
});