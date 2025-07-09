import { Stack } from 'expo-router';

export default function DetalhesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ver_entrega" />
    </Stack>
  );
}