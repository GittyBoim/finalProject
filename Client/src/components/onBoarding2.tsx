import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar, Button } from 'react-native-paper';

export const OnBoarding2 =({navigation}):JSX.Element =>{
    return (
        <View style={styles.container}>
             <Button style={styles.skipText} onPress={()=> navigation.navigate('Navigation')} textColor='gray'>{'Skip to the app >'}</Button>
             <Image source={require('../images/onBoarding2.png')} style={styles.image} resizeMode='contain'/>
             <Text style={styles.title}>{'Little\n Adventurers?'}</Text>
             <Text style={styles.text}>{'Easily add the kids at any time to Joyland by\n clicking the + on the toolbar, so you can select\n tickets individually for each child.'}</Text>

             <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={()=> navigation.navigate('OnBoarding1')}>
                    <Avatar.Text size={13} label="" style={styles.button}/>
                </TouchableOpacity>
                <LinearGradient
                    colors={['#FF1546', '#FF7566']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonContainer}>
                    <Avatar.Text size={14} label="" style={{flex:1, backgroundColor:'transparent'}}/>
                </LinearGradient> 
                <TouchableOpacity onPress={()=> navigation.navigate('OnBoarding3')}>
                    <Avatar.Text size={13} label="" style={styles.button}/>
                </TouchableOpacity>
                <Button style={styles.nextButton} labelStyle={{color:'#7E7E7E'}} onPress={()=> navigation.navigate('OnBoarding3')}>{'Next>'}</Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(245, 246, 250, 1)',
    },
    skipText:{
        marginTop: 27,   
        color: 'rgba(255, 21, 70, 1)',    
    },
    image:{
        marginTop: 55,
        alignSelf:'center',
    },
    title: {
        marginTop: 40,
        fontSize: 35,
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        color:'black',
        alignSelf:'center',
        textAlign:'center',
    },
    text:{
        fontSize: 16,
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        color:'#7E7E7E',
        alignSelf:'center',
        textAlign:'center',
        marginTop: 20,
    },
    buttonsContainer: {
        flexDirection:'row', 
        top: 739,
        left: 20,
        position:'absolute',
    },
    buttonContainer:{
        width: 30,
        height: 14,
        borderRadius: 15,
        elevation: 4, 
        marginLeft: 5,  
    },
    button:{
        backgroundColor:'lightgray',
        marginLeft: 5,
    },
    nextButton: {
        marginLeft: 240, 
        alignSelf:'center',
        marginTop: -13,
    }
});