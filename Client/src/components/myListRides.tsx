import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { List, IconButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from "react-redux";
import { deleteActTimeAPI } from "../api/user.api";
import { AnyAction } from "@reduxjs/toolkit";
import { encode } from "base-64";


export const MyListRides = ({route}): JSX.Element => {
    
    const users = useSelector( (state:any) => state.userSlice.users) as User[];
    
    let {actTimes} = users[route.params.index];

    const Dispatch = useDispatch();

    const deleteActTime = async(item:ActTime) =>{
        Dispatch(deleteActTimeAPI({userId:users[route.params.index].id, actTime:item}) as unknown as AnyAction);
    }

    const renderRideItem = ({ item }: { item: ActTime }) => {
        return (
            <List.Item style={styles.item}
                title={
                    <View style={styles.title}>
                        <Text style={styles.text}>{item.ride.rideName}</Text>
                    </View>
                }
                description={
                    <View style={styles.description}>
                        <FontAwesome name="clock-o" size={25} color='rgba(0, 0, 0, 1)'/>
                        <Text style={styles.iconText}>{item.timeStart.toString()} MINS</Text>
                    </View>
                }
                left={() => (
                    <View>
                        <Image source={{uri: `data:image/png;base64,${encode(String.fromCharCode.apply(null, item.ride.image.data))}`}} style={styles.image} resizeMode='contain'/>
                    </View>
                )}
                right={() => (
                    <View style={{ alignItems:"flex-end", flexDirection: 'row'}}>
                        <IconButton icon="delete" onPress={()=> deleteActTime(item)}></IconButton>
                    </View>
                )}
            />
        );
    };
    return (
        <View style={styles.container}>
            <List.Section>
                <List.AccordionGroup>
                    <FlatList data={actTimes} renderItem={renderRideItem} showsVerticalScrollIndicator={false} keyExtractor={(actTime) => actTime.id.toString()} />
                </List.AccordionGroup>
            </List.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'rgba(245, 246, 250, 1)',
    },
    item:{
        borderRadius: 20, 
        backgroundColor:'white', 
        marginTop: 15
    },
    description:{
        flexDirection: 'row', 
        alignItems: 'center',
    },
    title: {
        marginBottom: 50,
    },
    text: {
        fontSize: 15,
        color: 'rgba(0, 0, 0, 1)',
        fontWeight: '600',
    },
    iconText: {
        marginLeft: 5,
        fontSize: 15,
        color:'rgba(0, 0, 0, 1)',
    },
    image:{
        borderRadius: 20 , 
        width: 100, 
        height: 100, 
        marginHorizontal: 10, 
    }
})