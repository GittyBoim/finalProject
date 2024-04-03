import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, } from 'react-native-paper';


export const Home =({navigation}): JSX.Element=>{

    const [visibleNotification, setVisibleNotification] = useState(false);

    
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.navigate('OnBoarding1'); 
        }, 2000); 
    },[])
    

    return (
        <LinearGradient
            colors={['#FF1546', '#FF7566']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}>
                 <Image source={require('../images/Frame.png')} style={styles.image}/>
                 <Image source={require('../images/Logo.png')} style={styles.logo}/>
                 <Button onPress={()=> navigation.navigate('OnBoarding1')} style={styles.button}>Move to App ></Button>
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
    },
    button:{
        marginTop: 20,
        fontSize: 65,
    }
});