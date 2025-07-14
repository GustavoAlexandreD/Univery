import { Tabs } from 'expo-router';
import { FileText, Home, Settings } from 'lucide-react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

export default function EntregadorTabLayout() {
  // const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.screenInfo}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#4ADE80',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingTop: 8,
            paddingBottom: 8, //+ insets.bottom,
            height: 70, //+ insets.bottom,       
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
              <Home size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Restaurantes',
            tabBarIcon: ({ size, color }) => (
              <FileText size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ size, color }) => (
              <Settings size={size} color={color} />
            ),
          }}
          />
        <Tabs.Screen
          name="detalhes"
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