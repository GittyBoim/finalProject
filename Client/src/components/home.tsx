import React, { useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, } from 'react-native-paper';


export const Home =({navigation}): JSX.Element=>{

    const [visibleNotification, setVisibleNotification] = useState(false);

    return (
        <LinearGradient
            colors={['#FF1546', '#FF7566']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>
                 <Button onPress={()=> {navigation.navigate('Navigation','Rides')}}>open bottom navigation</Button>
                 <Button onPress={()=> {navigation.navigate('SignIn')}}>Sign in</Button>
                 <Image source={require('../images/Frame.png')} style={styles.image}/>
                 <Image source={require('../images/Logo.png')} style={styles.logo}/>
                 <Button onPress={()=> {setVisibleNotification(true)}}>show notification</Button>
                 <Button onPress={()=> {navigation.navigate('OnBoarding1')}}>show onBoarding</Button>
        </LinearGradient>  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    image:{
        width: 190,
        height: 164,
        marginTop: 250,
        alignSelf:'center'
    },
    logo:{
        marginTop: 25,
        alignSelf:'center'
    }
});