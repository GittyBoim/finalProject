import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Dialog } from 'react-native-paper';

export const ConfirmationRegister =({visible, setVisible, navigation}):JSX.Element => {
    return(
        <Dialog visible={visible} onDismiss={()=> setVisible(false)} style={styles.container}>
            <Dialog.Content>
                <Image source={require(`../images/baloons.png`)} style={styles.image} resizeMode='contain'/>
                <Text style={styles.title}>Yay!</Text>
                <Text style={styles.confirmation}>your equipment is saved.</Text>
                <Text style={styles.text}>{' 15 minutes before the appointment\n time, you will receive a reminder on\n your phone.'}</Text>

                <LinearGradient
                    colors={['#FF1546', '#FF7566']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonContainer}>
                <Button mode='contained' style={styles.button} labelStyle={styles.texButton} onPress={() => navigation.goBack()}>Got it</Button>
                </LinearGradient>  
                <Text style={{...styles.text, fontSize:12}}>Don't remember me</Text>
            </Dialog.Content>
        </Dialog>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'85%',
        alignSelf:'center',
    },
    image:{
        alignSelf:'center',
    },
    title:{
        textAlign:'center',
        fontFamily:'PloniDBold',
        fontWeight:'600',
        lineHeight: 40,
        fontSize: 24,
        color:'black',  
        marginTop: -18,
    },
    confirmation:{
        textAlign:'center',
        fontSize: 18,
    },
    text:{
        marginTop: 15, 
        fontFamily: 'Ploni ML v2 AAA',
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 24,
        letterSpacing: 0,
        textAlign: 'center',
        color: '#7E7E7E'
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
        fontSize: 22,
        color:'white',
    }
})