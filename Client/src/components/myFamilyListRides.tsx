import { encode } from "base-64";
import React from "react"
import { FlatList, Image, StyleSheet, Text, View } from "react-native"
import { List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux";


export const MyFamilyListRides = ({route}): JSX.Element => {
    
    const users = useSelector( (state:any) => state.userSlice.users) as User[];

    interface ActTimesMap {
      [key: number]:{ actTime :ActTime, users:string[]} ;
    }
  
    const actTimesMap: ActTimesMap = {};

    const MergeActTimes = (users:User[]) => {

        users.forEach((user:User) => {
        const { userName, actTimes } = user;
        actTimes.forEach(actTime => {
            const key = actTime.id;
            if (actTimesMap[key]) {
            actTimesMap[key].users.push(userName);
            } else {
            actTimesMap[key] = {actTime, users:[userName]}
            }
        });
        });
    }
    
    MergeActTimes(users);

    const renderRideItem = ({ item }) => {

        const { actTime, users } = item;

        return (
            <List.Item style={styles.item}
                title={
                    <View style={styles.title}>
                        <Text style={styles.text}>{actTime.ride.rideName}</Text>
                    </View>
                }
                description={
                    <View>
                        <View style={styles.description}>
                            <FontAwesome name="clock-o" size={25} color='rgba(0, 0, 0, 1)' />
                            <Text style={styles.iconText}>{actTime.timeStart.toString()} MINS</Text>
                        </View>
                        <View>
                            <Text>{users.join(', ')}</Text>
                        </View>
                    </View>
                }
                left={() => (
                    <View style={{flexDirection: 'row',  marginLeft: 10, alignItems: 'center'}}>
                        <Image source={{uri: `data:image/png;base64,${encode(String.fromCharCode.apply(null, actTime.ride.image.data))}`}} style={styles.image} resizeMode='contain'/>
                    </View>
                )}
                right={() => (
                    <View style={{ alignItems:"flex-end", flexDirection: 'row'}}>
                    </View>
                )}
            />
        );
    };
    return (
        <View style={styles.container}>
            <List.Section>
                <List.AccordionGroup>
                    <FlatList data={Object.values(actTimesMap)} renderItem={renderRideItem} showsVerticalScrollIndicator={false} keyExtractor={(item) => item.actTime.id.toString()} />
                </List.AccordionGroup>
            </List.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'rgba(245, 246, 250, 1)',
    },
    item:{
        borderRadius:20, 
        backgroundColor:'white', 
        marginTop:15
    },
    title: {
        marginBottom:50,
    },
    description:{
        flexDirection: 'row', 
        alignItems: 'center',
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