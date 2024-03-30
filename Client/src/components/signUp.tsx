import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, View, } from 'react-native';
import { Button, Card, Text, TextInput } from 'react-native-paper';
import axios from 'axios';
import config from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAPI } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { decodeToken } from '../jwt.utils';
import LinearGradient from 'react-native-linear-gradient';


export const SignUp = ({navigation}): JSX.Element => {
    
    const [user, setUser] = useState<User>({
        id: 0,
        userName: '',
        idNumber: '',
        phone: '',
        age: 0,
        actTimes: [],
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);

    const Dispatch = useDispatch();

    const validateName = (name:string) => {
        const nameRegex = /^[a-zA-Z]{2,10}$/;
        return nameRegex.test(name) || name=="";
    }

    const validateIDNumber = (idNumber:string) => {
        const idCardRegex = /^\d{9}$/;
        return idCardRegex.test(idNumber) || idNumber=="";
    };

    const validatePhone = (phone:string) => {
        const phoneRegex = /^(\d{3}-\d{7}|\d{10})$/;
        return phoneRegex.test(phone) || phone=="";
    }

    const validateAge = (age:string) => {
        const ageRegex = /^(?:\d|[1-9]\d|1[01]\d|120)$/;
        return ageRegex.test(age) || age=="";
    }

    const isDisabledButton =() => {
        return !validateIDNumber(user.idNumber) || !validateName(user.userName) 
        || !validatePhone(user.phone) || !validateAge(user.age.toString())
        || user.idNumber == "" || user.userName == "" ||user.phone == "" || user.age.toString() == "";
    }

    const onChange = (fieldName: string, value: string) => {
        setUser({
            ...user,
            [fieldName]: value
        });
    };
    
    const resete =() => {
        setUser({
            id: 0,
            userName: '',
            idNumber: '',
            phone: '',
            age: 0,
            actTimes: [],
        })
    }

    async function handleFormSubmit():Promise<void> {
        try{
            const token= (await axios.post(`${config.api}/auth/signup`,user)).data.access_token
            const userId = decodeToken(token);
            
            resete();

            await AsyncStorage.setItem('token',token);

            Dispatch(getUserAPI(userId) as unknown as AnyAction);

            navigation.navigate('Navigation','AddChild');
            
        }catch(err){
            console.log(err);
        }
    }

    
    
    return (
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View>
            <Image source={require('../images/Frame.png')} style={styles.image}/>
            <Text style={styles.title}>Sign up</Text> 
            
            <TextInput
                label="Name"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                value={user.userName}
                style={styles.textInput}
                onChangeText={(value) => onChange("userName", value)}
                error={!validateName(user.userName)}
            />
            {
                !validateName(user.userName) &&
                <Text style={{color:'red'}}>Invalid username</Text>
            }
            <TextInput
                label="ID number"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                keyboardType = 'numeric'
                secureTextEntry={isPasswordVisible}
                value={user.idNumber}
                style={styles.textInput}
                right={<TextInput.Icon icon={require('../images/eye.png')} onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                onChangeText={(value) => onChange("idNumber", value)}
                error ={!validateIDNumber(user.idNumber)}
            />
            {
                !validateIDNumber(user.idNumber) &&
                <Text style={{color:'red'}}>Invalid ID card number</Text>
            }
            <TextInput
                label="Phone"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                keyboardType = 'numeric'
                value={user.phone}
                style={styles.textInput}
                onChangeText={(value) => onChange("phone", value)}
                error={!validatePhone(user.phone)}
            />
            {
                !validatePhone(user.phone) &&
                <Text style={{color:'red'}}>Invalid phone number</Text>
            }
            <TextInput
                label="Age"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                keyboardType = 'numeric'
                value={user.age.toString()}
                style={styles.textInput}
                onChangeText={(value) => onChange("age", value)}
                error={!validateAge(user.age.toString())}
            />
            {
                !validateAge(user.age.toString()) &&
                <Text style={{color:'red'}}>Invalid age</Text>
            }
            

            <LinearGradient
                    colors={['#FF1546', '#FF7566']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonContainer}>
                <Button mode='contained' onPress={() => handleFormSubmit()} labelStyle={styles.texButton} style={styles.button} disabled={isDisabledButton()}>
                    Sign up
                </Button>
            </LinearGradient> 

            <View style={styles.textContainer}>      
                <Text style={styles.text}>Already have an account? </Text>
                <Text style={styles.loginText} onPress={()=> navigation.navigate('SignIn')}>Login</Text>
            </View>
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
        marginTop: 62,
        alignSelf:'center'
    },
    title:{
        fontSize: 36,
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        padding: 28,
        paddingBottom: 15,
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
        backgroundColor:'transparent'
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
        marginTop: 40,
        alignSelf:'center',
    },
    text:{
        fontFamily: 'PloniMedium',
    },
    loginText:{
        fontFamily: 'PloniMedium',
        color:'rgba(255, 21, 70, 1)',
    }
  });