import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Button, Card, IconButton, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAPI, updateUserAPI } from "../api/user.api";
import { AnyAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeToken } from '../jwt.utils';

export const UpdateUser = ({ navigation }): JSX.Element => {

    const users = useSelector((state: any) => state.userSlice.users) as User[];
    const Dispatch = useDispatch();

    const [user, setUser] = useState<User>({
        id: 0,
        userName: '',
        idNumber: '',
        phone: '',
        age: 0,
        actTimes: [],
    })

    useEffect(() => {
        const userToUpdate = async () => {
            try {
                const userId = decodeToken(await AsyncStorage.getItem('token'));
                const user = users.find(user => user.id === userId);
                if (user) {
                    setUser(user);
                }
            } catch (error) {
                console.error("Error fetching user ID from AsyncStorage:", error);
            }
        };
        userToUpdate();
    }, []);


    const validateName = (name: string) => {
        const nameRegex = /^[a-zA-Z]{2,10}$/;
        return nameRegex.test(name) || name == "";
    }

    const validatePhone = (phone: string) => {
        const phoneRegex = /^(\d{3}-\d{7}|\d{10})$/;
        return phoneRegex.test(phone) || phone == "";
    }

    const validateAge = (age: string) => {
        const ageRegex = /^(?:\d|[1-9]\d|1[01]\d|120)$/;
        return ageRegex.test(age) || age == "";
    }
    const onChange = (fieldName: string, value: string) => {
        setUser({
            ...user,
            [fieldName]: value
        });
    };

    const isDisabledButton = () => {
        return !validateAge(user.age.toString()) || !validateName(user.userName)
            || !validatePhone(user.phone)
            || user.idNumber == "" || user.userName == "" || user.phone == "" || user.age.toString() == "";
    }

    const handleFormSubmit = () => {
        Dispatch(updateUserAPI({ userId: user.id, newUser: user }) as unknown as AnyAction);
    }
    const deleteChild = (id: number) => {
        Dispatch(deleteUserAPI(id) as unknown as AnyAction);
    }
    const cancel = () => {
    }
    return (
        <View style={styles.container}>
            <IconButton icon='keyboard-backspace' onPress={()=> navigation.goBack()} size={20} containerColor='white' style={styles.backIcon}/>
            <Image source={require('../images/Frame.png')} style={styles.image} />
            <Text style={styles.title}>Hi {user.userName}</Text>
            <TextInput
                label="Name"
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                value={user.userName}
                style={styles.textInput}
                right={<TextInput.Icon icon={require('../images/pen.png')} color={'black'} />}
                onChangeText={(value) => onChange("userName", value)}
                error={!validateName(user.userName)}
            />
            {
                !validateName(user.userName) &&
                <Text style={{ color: 'red' }}>Invalid username</Text>
            }
            <TextInput
                label="Phone"
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                keyboardType='numeric'
                value={user.phone}
                style={styles.textInput}
                right={<TextInput.Icon icon={require('../images/pen.png')} color={'black'} />}
                onChangeText={(value) => onChange("phone", value)}
                error={!validatePhone(user.phone)}
            />
            {
                !validatePhone(user.phone) &&
                <Text style={{ color: 'red' }}>Invalid phone number</Text>
            }
            <TextInput
                label="Age"
                underlineColor='transparent'
                underlineStyle={{ display: 'none' }}
                keyboardType='numeric'
                value={user.age.toString()}
                style={styles.textInput}
                right={<TextInput.Icon icon={require('../images/pen.png')} color={'black'} />}
                onChangeText={(value) => onChange("age", value)}
                error={!validateAge(user.age.toString())}
            />
            {
                !validateAge(user.age.toString()) &&
                <Text style={{ color: 'red' }}>Invalid age</Text>
            }
            <View style={styles.buttonRowContainer}>
                <Button style={styles.buttonCancel} labelStyle={styles.textButtonCancel} onPress={() => cancel()}>Cancel</Button>
                <LinearGradient
                    colors={['#FF1546', '#FF7566']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.buttonContainer}>
                    <Button mode='contained' onPress={() => handleFormSubmit()} labelStyle={styles.textButtonSave} style={styles.buttonSave} disabled={isDisabledButton()}>
                        Save
                    </Button>
                </LinearGradient>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {users.slice(1).map((u, index) => (
                    <Card.Content key={index} style={styles.card}>
                        <Text style={styles.cardText}>{u.userName}</Text>
                        <TextInput.Icon icon={require('../images/profile.png')} style={{ marginLeft: 60 }} />
                        <Text style={styles.calendarText}>{u.age}</Text>
                        <TextInput.Icon icon={require('../images/calendar.png')} style={{ marginLeft: 320 }} />
                        <IconButton
                            icon={require('../images/deleteChild.png')}
                            size={24}
                            iconColor="#FF1546"
                            onPress={() => deleteChild(u.id)}
                            style={{backgroundColor:'#F5F6FA'}}
                        />
                    </Card.Content>
                ))}
                <Text style={styles.addChild} onPress={()=>navigation.navigate('AddChild')}>Add A Child</Text>
            </ScrollView>
        </View>

    )
}


const styles = StyleSheet.create({
    card: {
        width: '85%',
        alignSelf: 'center',
        margin: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:'rgba(245, 246, 250, 1)',
        borderRadius: 25,
        padding: 10
    },
    cardText: {
        flex: 1,
        fontSize: 22,
        fontFamily: 'PloniRegular',
        color: '#000000',
        textAlign: 'center',
        marginLeft: 25,
    },
    calendarText: {
        flex: 1,
        fontSize: 22,
        color: '#000000',
        textAlign: 'center',
        marginRight: 40,
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 246, 250, 1)',
    },
    backIcon:{
        top:25,
        left:20,
    },
    image: {
        marginTop: 15,
        alignSelf: 'center'
    },
    title: {
        fontSize: 36,
        fontFamily: 'PloniDBold',
        fontWeight: '600',
        lineHeight: 40,
        padding: 28,
        paddingBottom: 15,
        color: 'black',
        alignSelf: 'center',
    },
    textInput: {
        marginTop: 12,
        margin: 5,
        width: '80%',
        alignSelf: "center",
        borderRadius: 20,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: '40%',
        height: 62,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 24,
        elevation: 4,
        shadowColor: '#FF0642B2',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 8.9,
        marginBottom: 50
    },
    buttonSave: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    textButtonSave: {
        fontFamily: 'PloniDBold',
        fontWeight: '600',
        lineHeight: 40,
        fontSize: 22,
        color: 'white',
    },
    buttonCancel: {
        width: '40%',
        height: 62,
        marginRight: 10,
        alignSelf: 'center',
        borderRadius: 24,
        elevation: 4,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#FF1546',
        marginBottom: 50,
        marginTop: 20,
    },
    textButtonCancel: {
        fontFamily: 'PloniDBold',
        fontWeight: '600',
        lineHeight: 40,
        fontSize: 22,
        color: '#FF1546',
    },
    textContainer: {
        flexDirection: 'row',
        marginTop: 40,
        alignSelf: 'center',
    },
    text: {
        fontFamily: 'PloniMedium',
    },
    loginText: {
        fontFamily: 'PloniMedium',
        color: 'rgba(255, 21, 70, 1)',
    },
    childContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 5,
    },
    childName: {
        fontSize: 16,
        marginRight: 10,
    },
    childID: {
        fontSize: 14,
        color: '#666',
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 5,
        borderRadius: 5,
    },
    buttonRowContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginTop: 10,
    },
    addChild:{
        fontFamily:'PloniMedium',
        fontSize:16,
        color:'#FF1546',
        textAlign:'center'
    }
});


