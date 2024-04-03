import React, { SetStateAction, useState } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { getUserAPI } from '../api/user.api';
import { AnyAction } from '@reduxjs/toolkit';
import config from '../config';
import axios from '../axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from '../jwt.utils';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';


export const SignIn=({navigation}):JSX.Element=> {
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const Dispatch = useDispatch();

    const users:User[] = useSelector( (state:any) => state.userSlice.users);

    const [isExist, setIsExist] = useState(true);

    const [formState, setFormState] = useState({
        userName: "",
        idNumber: "",
    });

    const resete=()=> setFormState({
        userName:"",
        idNumber:"",

    });

    const onChange = (fieldName:string, value:string)=> {
        setFormState({
            ...formState,
            [fieldName]:value,
        })
    };

    const saveTokenToDataBase = async(token: string, users:User[])=> {
      const deviceId = DeviceInfo.getDeviceId();
      await axios.post(`${config.api}/token`, {token, user:{id:users[0].id}, deviceId});
    }
    
    const getToken =async(users:User[])=> {
        messaging()
        .getToken() 
        .then(token => {
            saveTokenToDataBase(token, users);
        } );

        messaging().onTokenRefresh(token => {
            saveTokenToDataBase(token, users);
          });
    } 

    const handleFormSubmit = async(): Promise<void> => {  
        try {
            const token = (await axios.post(`${config.api}/auth/signin`,{userName:formState.userName, idNumber:formState.idNumber})).data.access_token
            await AsyncStorage.setItem('token', token);
            const userId = decodeToken(token);
            Dispatch(getUserAPI(userId) as unknown as AnyAction)
            .then((res:any)=> {if(res.meta.requestStatus == "fulfilled") getToken(res.payload)});
            navigation.navigate('Navigation','Rides');
        } catch (error) {
            setIsExist(false);
            console.log(error,"from signin");
        }
        resete();
    }

    return(
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.container}>

            <Image source={require('../images/Frame.png')} style={styles.image}/>
            <Text style={styles.title}>Log in</Text> 

            <TextInput
                label="Name"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                value={formState.userName}
                onChangeText={(value) => onChange("userName",value)}
                style={styles.textInput}
            />
            <TextInput
                label="ID number"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                secureTextEntry={isPasswordVisible}
                value={formState.idNumber}
                right={<TextInput.Icon icon={require('../images/eye.png')} onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                onChangeText={(value) => onChange("idNumber", value)}
                style={styles.textInput}
            />

            {
                !isExist &&
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 10 }}>One or more of the details you entered are incorre</Text>
            }
            <LinearGradient
                colors={['#FF1546', '#FF7566']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonContainer}>
            <Button mode='contained' onPress={() => handleFormSubmit()} labelStyle={styles.texButton} style={styles.button}>
                Sign in
            </Button>
            </LinearGradient> 
            
            <View style={styles.textContainer}>
                <Text style={styles.text}>Do not have an account? </Text>
                <Text style={styles.signUpText} onPress={()=> navigation.navigate('SignUp')}>Sign up</Text>
            </View>   
            <Text style={styles.skipText} onPress={()=> navigation.navigate('Navigation')}>{'Skip >'}</Text>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(245, 246, 250, 1)',
    },
    image:{
        marginTop: 65,
        alignSelf:'center'
    },
    title:{
        fontSize: 36,
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        padding: 40,
        paddingBottom: 20,
        color:'black',
        alignSelf:'center',
    },
    textInput: {
        marginTop: 12,
        margin: 5,
        width:'80%',
        alignSelf:"center",
        borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor:'white',
    },
    buttonContainer:{
        width:'80%',
        height: 58,
        marginTop: 20,
        alignSelf:'center',
        borderRadius: 24,
        elevation: 4, 
        shadowColor: '#FF0642B2', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 8.9,
    },
    button:{
        flex:1, 
        backgroundColor:'transparent',
    },  
    texButton:{
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        fontSize:22,
        color:'white',
    },
    textContainer: {
        flexDirection:'row',
        marginTop: 130,
        alignSelf:'center',
    },
    text:{
        fontFamily: 'PloniMedium',
    },
    signUpText:{
        fontFamily: 'PloniMedium',
        color:'rgba(255, 21, 70, 1)',
    },
    skipText:{
        fontFamily: 'PloniMedium',
        color:'rgba(255, 21, 70, 1)',
        alignSelf:'center',
        marginTop: 15,
    }
})

