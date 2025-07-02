import { Stack } from 'expo-router';

export default function CardapioLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="cardapio-cliente" />
    </Stack>
  );
}