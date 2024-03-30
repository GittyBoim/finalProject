import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

    axios.interceptors.request.use(async (req) => {
        try{
            req.headers.set('authorization', `Bearer ${ await AsyncStorage.getItem('token')}`);
        }catch(err){
            Alert.alert("you need to signin ");
        }
        return req;
     });

export default axios;