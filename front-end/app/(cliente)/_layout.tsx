import { Tabs } from 'expo-router';
import { MapPin, ShoppingBag, User } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function ClienteTabLayout() {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.screenInfo}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#3cb378',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingTop: 8,
            paddingBottom: 8,
            height: 70, 
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Início',
            tabBarIcon: ({ size, color }) => (
              <MapPin size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Pedidos',
            tabBarIcon: ({ size, color }) => (
              <ShoppingBag size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="cardapio"
          options={{
            href: null, 
          }}
          />
      </Tabs>
    </SafeAreaView>
  );
  
}
const styles = StyleSheet.create({
   screenInfo:{
    flex: 1,
    backgroundColor: 'FFFFFF' 
   },
});