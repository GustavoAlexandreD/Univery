import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import PedidosScreen from '../screens/PedidosScreen';
import RestaurantesScreen from '../screens/RestaurantesScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          elevation: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Pedidos') iconName = 'clipboard-outline';
          else if (route.name === 'Restaurantes') iconName = 'restaurant-outline';
          else if (route.name === 'Perfil') iconName = 'person-outline';

          return <Ionicons name={iconName} size={28} color={focused ? '#2DA54F' : '#888'} />;
        },
        tabBarLabel: () => null, // remove texto do ícone
      })}
    >
      <Tab.Screen name="Pedidos" component={PedidosScreen} />
      <Tab.Screen name="Restaurantes" component={RestaurantesScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}
