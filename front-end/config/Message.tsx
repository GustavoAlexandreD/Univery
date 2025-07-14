// src/components/Message.js
import Toast from 'react-native-toast-message';

const Message = {
    success: (msg) => {
        Toast.show({
            type: 'success',
            text1: 'Sucesso',
            text2: msg,
            position: 'top',
        });
    },
    error: (msg) => {
        Toast.show({
            type: 'error',
            text1: 'Erro',
            text2: msg,
            position: 'top',
        });
    },
    info: (msg) => {
        Toast.show({
            type: 'info',
            text1: 'Atenção',
            text2: msg,
            position: 'top',
        });
    },
};

export default Message;
