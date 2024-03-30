import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addUserAPI } from '../api/user.api';
import { AnyAction } from '@reduxjs/toolkit';
import LinearGradient from 'react-native-linear-gradient';
import { ConfirmationAddChild } from './confirmationAddChild';


export const AddChild =({navigation}):JSX.Element=> {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [visibleConfirmation, setVisibleConfirmation] =useState(false);

    const users:User[] = useSelector( (state:any) => state.userSlice.users);

    const [child, setChild] = useState<User>({
        id: 0,
        userName: '',
        idNumber: '',
        phone: '',
        age: 0,
        actTimes: [],
        parent:users[0],
    })

    const Dispatch = useDispatch();

    const validateName = (name:string) => {
        const nameRegex = /^[a-zA-Z]{2,10}$/;
        return nameRegex.test(name) || name=="";
    }

    const validateIDNumber = (idNumber:string) => {
        const idCardRegex = /^\d{9}$/;
        return idCardRegex.test(idNumber) || idNumber=="";
    };

    const validateAge = (age:string) => {
        const ageRegex = /^(?:\d|[1-9]\d|1[01]\d|120)$/;
        return ageRegex.test(age) || age=="";
    }

    const isDuplicateName =() => {
        return users.some((user)=> user.userName.toLowerCase() == child.userName.toLowerCase());
    }

    const isDisabledButton =() => {
        return !validateIDNumber(child.idNumber) || !validateName(child.userName) 
        || !validateAge(child.age.toString())
        || child.idNumber == "" || child.userName == "" || child.age.toString() == "" 
        || isDuplicateName() || !users[0];
    }

    const onChange = (fieldName:string, value:string) => {
        setChild({
          ...child,
           [fieldName]:value
        });
        
    };

    const resete=()=> setChild({
        id: 0,
        userName: '',
        idNumber: '',
        phone: '',
        age: 0,
        actTimes: [],
        parent:users[0],
    })

    function handleFormSubmit(): void {
        child.phone = users[0].phone;
        Dispatch(addUserAPI(child) as unknown as AnyAction);
        setVisibleConfirmation(true);
    }

    
    return(
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
        <View style={styles.container}>

            <Image source={require('../images/Frame.png')} style={styles.image}/>
            <Text style={styles.title}>Add a child</Text>  

            <TextInput
                label="Name"
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                value={child.userName}
                onChangeText={(value) => onChange("userName",value)}
                style={styles.textInput}
                error={!validateName(child.userName)}
            />
            {
                !validateName(child.userName) &&
                <Text style={styles.textErr}>Invalid name</Text>
            }
            {
                isDuplicateName() && 
                <Text style={styles.textErr}>userName already exist</Text>
            }
            <TextInput
                label="ID number"
                keyboardType='numeric'
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                secureTextEntry={isPasswordVisible}
                value={child.idNumber}
                right={<TextInput.Icon icon={require('../images/eye.png')} onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                onChangeText={(value) => onChange("idNumber", value)}
                style={styles.textInput}
                error={!validateIDNumber(child.idNumber)}
            />
            {
                !validateIDNumber(child.idNumber) &&
                <Text style={styles.textErr}>Invalid ID number</Text>
            }
            <TextInput
                label="Age"
                keyboardType='numeric'
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                value={child.age.toString()}
                onChangeText={(value) => onChange("age", value)}
                style={styles.textInput}
                error={!validateAge(child.age.toString())}
            />
            {
                !validateAge(child.age.toString()) &&
                <Text style={styles.textErr}>Invalid age</Text>
            }
            <LinearGradient
            colors={['#FF1546', '#FF7566']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.buttonContainer}>
                <Button mode='contained' style={styles.button} labelStyle={styles.texButton} onPress={() => handleFormSubmit()}  disabled={isDisabledButton()}>
                    Add
                </Button>
            </LinearGradient>  
            <Text style={styles.skipText} onPress={() =>  navigation.navigate('Rides')}> Skip this step{'>'} </Text> 

            <ConfirmationAddChild visible={visibleConfirmation} setVisible={setVisibleConfirmation} childName={child.userName} navigation={navigation} resetFunc={resete}/>
        </View>
        </ScrollView>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(245, 246, 250, 1)',
    },
    image:{
        marginTop: 55,
        alignSelf:'center'
    },
    title:{
        fontSize: 36,
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        padding: 35,
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
    textErr: {
        color:'red', 
        alignSelf:'center',
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
    skipText:{
        fontFamily: 'PloniMedium',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 40,
        letterSpacing: 0,
        textAlign: 'left',
        marginTop: 45,
        color:'#7E7E7E',
        alignSelf:'center'
    }
})