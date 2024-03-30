import React, { useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { Banner, Button, Checkbox, Dialog, Portal, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { addActTimeAPI } from '../api/user.api';
import { AnyAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from '../jwt.utils';
import LinearGradient from 'react-native-linear-gradient';
import { ConfirmationRegister } from './confirmationRegister';
import { act } from 'react-test-renderer';

export const RegisterRide=({visible, setVisible, ride, selectedTime, navigation}):JSX.Element=> {

    const Dispatch = useDispatch();

    const users = useSelector( (state:any) => state.userSlice.users) as User[];
    const [checked, setChecked] = React.useState(users.map(()=> false));
    const [visibleConfrimation, setVisibleConfirmation] = useState(false);

    const actTime:ActTime = {...ride.actTimes.find((actTime:ActTime)=> actTime.timeStart == selectedTime), ride};

    const ifConflict =(user:User): Boolean => {

        for (let at of user.actTimes) {
            const date1 = new Date("2000-01-01T" + at.timeStart);
            const date2 = new Date("2000-01-01T" + actTime.timeStart); 

            if(date1.getTime() === date2.getTime())
            {
                return true;
            }
                

            if(date1 < date2){
                const updateDate = new Date(date1);
                updateDate.setMinutes(date1.getMinutes() + at.ride.duringUse);
                if(updateDate >= date2)
                    return true;
            }
             
            else{
                const updateDate = new Date(date2);
                updateDate.setMinutes(date2.getMinutes() + actTime.ride.duringUse);
                if(updateDate >= date1)
                    return true;
            }
        }
        return false;
    }

    const onCheckUser =(user:User, index:number) => {
        if(!checked[index] && ifConflict(user)){
            Alert.alert(`${user.userName} have a conflict`);
        }
        else{
            checked[index] =!checked[index];
            setChecked([...checked]);
        }  
    }

    const registerRide = async () => {
        const registeredUsers = users.filter((user)=> user.age >= ride.ageUser).filter((user, index)=> checked[index]);
        const userId = decodeToken(await AsyncStorage.getItem('token'));
        Dispatch(addActTimeAPI({userId, registeredUsers, actTime}) as unknown as AnyAction);
        //.err א להציג את המודול
        setVisibleConfirmation(true)
        setVisible(false);
    }

    const moveLoginPage =() => {
        navigation.navigate('SignIn');
        setVisible(false);
    }

    return(
            <Portal>
                <Dialog visible={visible} onDismiss={()=> setVisible(false)} style={styles.container}>
                    {
                        users[0]? <Dialog.Title style={styles.title}>{'Who wants \nto enjoy this ride?'}</Dialog.Title> :
                            <Dialog.Title style={styles.title}>you are not logged in</Dialog.Title>
                    }
                    
                    <Dialog.Content>
                    {
                        users.filter((user)=> user.age >= ride.ageUser)
                        .map((user, index)=>
                        {
                            return <Checkbox.Item label={user.userName} labelStyle={styles.label} uncheckedColor='#7E7E7E' color="rgba(255, 21, 70, 1)" 
                                style={styles.checkbox} key={user.id} status={checked[index]? 'checked' : 'unchecked'} 
                                onPress={() => onCheckUser(user, index)}
                                />
                        })
                    }
                    {
                        users[0]? <LinearGradient
                            colors={['#FF1546', '#FF7566']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.buttonContainer}>
                        <Button mode={'contained'} style={styles.button} labelStyle={styles.texButton} onPress={()=> registerRide()}>Add</Button>
                        </LinearGradient> :
                        <Text style={styles.loginText} onPress={()=> {moveLoginPage()}}>Go to login page</Text>
                    }
                    </Dialog.Content>
                </Dialog>
                <ConfirmationRegister visible={visibleConfrimation} setVisible={setVisibleConfirmation} navigation={navigation}/>
            </Portal>
        )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'85%',
        alignSelf:'center',
    },
    title:{
        marginTop: 20,
        left: 20, 
        fontFamily:'PloniDBold',
        fontSize: 25,
        color:'rgba(0, 0, 0, 1)',
        fontWeight:'600',
        lineHeight: 40,
        letterSpacing: 0,
        textAlign:'left',
    },
    label:{
        left: 15, 
        fontFamily:'PloniDBold',
        fontSize: 18,
        color:'#7E7E7E',
        fontWeight:'400',
        letterSpacing: 0,
        textAlign:'left',
    },
    text: {
        fontWeight:'bold',
        color:'cornflowerblue',
        marginBottom:10
    },
    checkbox: {
        borderBottomColor:'#7E7E7E',
        borderBottomWidth: 1,
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
    button: {
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
    loginText:{
        textAlign:'center',
        fontFamily: 'Ploni ML v2 AAA',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        color:'rgba(255, 21, 70, 1)',
    }
})
