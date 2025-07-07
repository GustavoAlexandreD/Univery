import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Touchable, TouchableOpacity, View } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.back()}>
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingLeft: 4,
        height: 30,
        width: 30,
        justifyContent: 'center',
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
      }}>
        <Feather name="corner-up-left" size={21} color="#2cbfae" />
      </View>
    </TouchableOpacity>
  );
} 