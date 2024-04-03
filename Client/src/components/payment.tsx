import React, { useState } from 'react';
import { Alert, Image, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text, TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from './navigation';

export const Payment = ({navigation}): JSX.Element => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [formState, setFormState] = useState({
        creditCardNumber: "",
        expirationDate: "",
        securityCode: ""
    });

    const validateCreditCardNumber = (creditCardNumber: string): boolean => {
        const creditCardRegex: RegExp = /^\d{16}$/;
        return creditCardRegex.test(creditCardNumber) || creditCardNumber === "";
    };

    const validateExpirationDate = (expirationDate: string): boolean => {
        const expirationDateRegex: RegExp = /^(0[1-9]|1[0-2])\/\d{2}$/;
        return expirationDateRegex.test(expirationDate) || expirationDate === "";
    };

    const validateSecurityCode = (securityCode: string): boolean => {
        const securityCodeRegex: RegExp = /^\d{3,4}$/;
        return securityCodeRegex.test(securityCode) || securityCode === "";
    };


    const onChange = (fieldName: string, value: string) => {
        setFormState({
            ...formState,
            [fieldName]: value
        });
    };

    return (
        <View style={styles.container}>

            <IconButton icon='keyboard-backspace' onPress={()=> navigation.goBack()} size={20} containerColor='white' style={styles.backIcon}/>
            <Image source={require('../images/Frame.png')} style={styles.image} />
            <Text style={styles.title}>Payment</Text>

            <TextInput
                keyboardType='numeric'
                placeholder='Credit Card Number'
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                value={formState.creditCardNumber}
                onChangeText={(value) => onChange("creditCardNumber", value)}
                style={styles.textInput}
                error={!validateCreditCardNumber(formState.creditCardNumber)}
            />
            {
                !validateCreditCardNumber(formState.creditCardNumber) &&
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>Invalid creditCardNumber</Text>
            }
             <View style={styles.buttonRowContainer}>
            <TextInput
                placeholder="MM/YY"
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                value={formState.expirationDate}
                onChangeText={(value) => onChange("expirationDate", value)}
                style={styles.dateInput}
                error={!validateExpirationDate(formState.expirationDate)}
            />
            <TextInput
                placeholder="CVV"
                keyboardType='numeric'
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                secureTextEntry={isPasswordVisible}
                value={formState.securityCode}
                right={<TextInput.Icon icon={require('../images/eye.png')} onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                onChangeText={(value) => onChange("securityCode", value)}
                style={styles.codeInput}
                error={!validateSecurityCode(formState.securityCode)}
            />
           
       </View>
             {
                !validateExpirationDate(formState.expirationDate) &&
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>Invalid expirationDate</Text>
             }
              {
                !validateSecurityCode(formState.securityCode) &&
                <Text style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>Invalid securityCode</Text>
            }
            <LinearGradient
                colors={['#FF1546', '#FF7566']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonContainer}>
                <Button mode='contained' onPress={() => navigation.navigate('Navigation','AddChild')} labelStyle={styles.texButton} style={styles.button}>
                    Pay
                </Button>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 246, 250, 1)',
    },
    backIcon:{
        top:25,
        left:20,
    },
    image: {
        marginTop: 65,
        alignSelf: 'center'
    },
    title: {
        fontSize: 36,
        fontFamily: 'PloniDBold',
        fontWeight: '600',
        lineHeight: 40,
        padding: 40,
        paddingBottom: 20,
        color: 'black',
        alignSelf: 'center',
    },
    codeInput:{
        width: '25%',
        borderRadius: 20,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: 'white',
        marginTop: 15,
        margin:10
    },
    dateInput:{
        flex:1,
        borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
        marginTop: 15,
        margin: 10,
    },
    buttonRowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 10,
    },
    textInput: {
        marginTop: 12,
        margin: 5,
        width: '90%',
        alignSelf: "center",
        borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: '90%',
        height: 58,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 24,
        elevation: 4,
        shadowColor: '#FF0642B2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 8.9,
    },
    button: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    texButton: {
        fontFamily: 'PloniDBold',
        fontWeight: '600',
        lineHeight: 40,
        fontSize: 22,
        color: 'white',
    }
})

