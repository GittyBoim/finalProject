import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, Modal, Portal, TextInput } from 'react-native-paper';

export const UpdateChild =({child, setChild, updateChild}):JSX.Element=> {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    
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

    const isDisabledButton =() => {
        return !validateIDNumber(child.idNumber) || !validateName(child.userName) 
        || !validateAge(child.age.toString())
        || child.idNumber == "" || child.userName == "" || child.age.toString() == "";
    }

    const onChange = (fieldName:string, value:string) => {
       setChild({
            ...child,
            [fieldName]:value,
       })
    };

    function handleFormSubmit(): void {
         if(!isDisabledButton())
         {
            updateChild(child);
            setChild(null);
         }  
    }

    return(
        <>
        <Portal>
            <Modal visible={child} onDismiss={()=> {handleFormSubmit()}} contentContainerStyle={styles.containerStyle}>
                <View>
                    <TextInput
                        label="Name"
                        value={child.userName}
                        left={<TextInput.Icon icon="account" size={35}/>}
                        onChangeText={(value) => onChange("userName",value)}
                        error={!validateName(child.name)}
                    />
                    <TextInput
                        label="ID number"
                        secureTextEntry={isPasswordVisible}
                        value={child.idNumber}
                        right={<TextInput.Icon icon="eye" onPress={() => setIsPasswordVisible(!isPasswordVisible)} />}
                        left={<TextInput.Icon icon="card-account-details-outline" size={35} />}
                        onChangeText={(value) => onChange("idNumber", value)}
                        error={!validateIDNumber(child.idNumber)}
                    />
                    <TextInput
                        label="Age"
                        value={child.age.toString()}
                        left={<TextInput.Icon icon="arrow-up-down-bold" size={35}/>}
                        onChangeText={(value) => onChange("age", value)}
                        error={!validateAge(child.age)}
                    />
                    {
                        isDisabledButton() &&
                        <Text style={{color:'red'}}>Invalid values</Text>
                    }
                </View>
            </Modal>
        </Portal>
      </>
    )
}

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white', 
        padding: 20
    },
})