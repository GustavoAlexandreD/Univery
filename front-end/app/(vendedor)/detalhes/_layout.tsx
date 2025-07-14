import { Stack } from 'expo-router';

export default function DetalhesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="editar_cardapio" />
      <Stack.Screen name="ver_entrega" />
      <Stack.Screen name="add_produto" />
      <Stack.Screen name="edit_produto" />
    </Stack>
  );
}