import { Feather } from '@expo/vector-icons';
import { View } from "react-native";

export default function PhoneButton() {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 25,
      paddingLeft: 4,
      height: 30,
      width: 30,
      justifyContent: 'center',
      position: 'absolute',
      right:10,
      top: 30,
    }}>
      <Feather name="phone" size={21} color="#2cbfae" />
    </View>
  );
} 