import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Api = axios.create({
    baseURL: 'http://192.168.0.10:3000' // IP local para desenvolvimento mobile
});

// Função para configurar o token automaticamente
const setAuthToken = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    } catch (error) {
        console.log('Erro ao buscar token:', error);
    }
};

// Configurar token inicial
setAuthToken();

export default Api;