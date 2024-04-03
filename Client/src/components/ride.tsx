import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { IconButton } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import { RegisterRide } from './registerRide';
import axios from "../axios";
import config from '../config';
import { encode } from 'base-64';

export const Ride = ({route, navigation}) => {

    useEffect(()=>{
      const initAvailableActTimes = async() =>{
        const res = (await axios.get(`${config.api}/act-time/getByRideId/${ride.id}`)).data;
        setAvailableActTimes(res);
      }
      initAvailableActTimes();
    },[])


    const ride:Ride = route.params;

    const [showDropDown, setShowDropDown] = useState<boolean>(false);
    const [selectedTime, setSelectedTime] = useState <Date> ();
    const [visibleRegister, setVisibleRegister] = useState<boolean>(false);
    const [availableActTimes, setAvailableActTimes] = useState<ActTime[]>([]);

    const updateAvailableActTimes = async()=> {
        const res = (await axios.get(`${config.api}/act-time/getByRideId/${ride.id}`)).data;
        setAvailableActTimes(res);
        setAvailableActTimes(availableActTimes.sort((a, b) => a.timeStart.localeCompare(b.timeStart)));
    }

    
  return (
    <View style={styles.container}>

      <IconButton icon='keyboard-backspace' onPress={()=> navigation.goBack()} size={20} containerColor='white' style={styles.backIcon}/>
      <IconButton icon='heart' size={20} containerColor='white' style={styles.heartIcon}/>

      <Text style={styles.rideName}>{ride.rideName}</Text>
      <Image source={{uri: `data:image/png;base64,${encode(String.fromCharCode.apply(null, ride.image.data))}`}} style={styles.rideImage} resizeMode='contain'/>
      
      <Text style={styles.rideDescription} numberOfLines={4} ellipsizeMode='tail'>{ride.description}</Text>
      
        <View style={styles.timeContainer}>

          <IconButton icon="clock" size={28}/>
          <Text style={styles.timeText}>Time</Text>
          <DropDown
                mode={'flat'}
                visible={showDropDown}
                showDropDown={async() => {await updateAvailableActTimes(), setShowDropDown(true)}}
                onDismiss={() => setShowDropDown(false)}
                value={selectedTime}
                setValue={setSelectedTime}
                list={availableActTimes.map((at)=> ({label:at.timeStart.toString(), value:at.timeStart.toString()}))}
                dropDownItemStyle={{backgroundColor:'white'}}
                dropDownItemSelectedStyle={{backgroundColor:'lightgray'}}
                dropDownStyle={{backgroundColor:'white'}}
                label = "Select time"
                inputProps={{
                  style:{
                    backgroundColor: 'white',
                    borderRadius: 30,
                    borderTopEndRadius: 30,
                    borderTopLeftRadius: 30,
                    overflow: 'hidden',
                  } 
                }}
              />
          </View>

        <IconButton icon="plus" iconColor='white' containerColor='rgba(255, 21, 70, 1)' size={50} style={styles.button} onPress={()=> { (!selectedTime)? Alert.alert("No activity time selected"): setVisibleRegister(true)}}/>
        <RegisterRide visible={visibleRegister} setVisible={setVisibleRegister} ride={ride} selectedTime={selectedTime} navigation={navigation}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'rgba(245, 246, 250, 1)',
  },
  backIcon:{
    top:25,
    left:20,
  },
  heartIcon:{
    top:27,
    left:340,
    position:'absolute',
  },
  rideName: {
    marginTop: 10,
    fontSize: 35,
    fontFamily:'PloniDBold',
    fontWeight:'600',
    lineHeight: 40,
    padding: 35,
    color:'black',
    alignSelf:'center',
  },
  rideImage: {
    width: '70%',
    height: '25%',
    alignSelf:'center',
    marginBottom: 10,
  },
  rideDescription:{
    fontSize: 16,
    fontFamily:'PloniDBold',
    fontWeight:'600',
    lineHeight: 40,
    padding: 30,
    color:'#7E7E7E',
    alignSelf:'center',
    textAlign:'center',
    width:'86%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:'center'
  },
  timeText: {
    fontFamily:'PloniDBold',
    fontSize: 22,
    fontWeight:'600',
    lineHeight: 40,
    letterSpacing:0,
    textAlign:'left',
    color: 'black',
    marginRight:10,
  },
  dropDown: {
    flex: 1,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 10,
    width:'40%'
  },
  button:{
    marginTop: 40,
    alignSelf:'center'
  }
});

