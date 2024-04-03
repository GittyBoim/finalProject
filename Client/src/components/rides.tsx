import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getRideAPI } from '../api/ride.api';
import { AnyAction } from '@reduxjs/toolkit';
import { Icon, IconButton, Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
import { encode } from 'base-64'; 


export const Rides = ({navigation}): JSX.Element => {
    
    const rides = useSelector( (state:any) => state.rideSlice.rides) as Ride[];
    const users = useSelector( (state:any) => state.userSlice.users) as User[];
    const userName = users[0]? users[0].userName : "";

    const [sortRides, setSortRides] = useState<Ride[]>([]);

    const [searchQuery, setSearchQuery] = useState('');

    const Dispatch = useDispatch();
    
    useEffect(()=>{
      Dispatch(getRideAPI() as unknown as AnyAction)
      .then((res:any)=> {if(res.meta.requestStatus == "fulfilled") setSortRides(res.payload)});
    },[])  
    
    const sortRidesFunc = (targetAge:string) => {
      setSortRides(rides.filter((ride:Ride)=> 
        ride.targetAge === targetAge
      ))
    }

    const searchRides = () => {
      setSortRides(rides.filter((ride:Ride) => {
        return ride.rideName.toLowerCase().includes(searchQuery.toLowerCase());
      }));
    };

    return(
      <View style={styles.container}>

        <IconButton icon="help" containerColor='white' size={15} style={styles.help} onPress={()=> navigation.navigate('OnBoarding1')}/>
        {
          users[0]? <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail" onPress={()=>navigation.navigate('UpdateUser')}>{`Hi ${users[0].userName}!`}</Text>:
            <Text style={styles.userName} onPress={()=> navigation.navigate('SignIn')}>{'Login >'}</Text>
        }

        <Text style={styles.title}>How do you want to enjoy?</Text>

        <Searchbar placeholder="Look for a ride" value={searchQuery} onChangeText={setSearchQuery} style={styles.searchBar}
          onIconPress={()=> searchRides()}  onClearIconPress={()=> setSortRides(rides)} rippleColor="rgba(255, 21, 70, 1)" onSubmitEditing={()=> searchRides()}
        /> 
        
        <Text style={styles.filters}>Filters</Text>
        <View style={styles.filtersContainer}>
          <View style={styles.filtersAll}>
            <TouchableOpacity onPress={()=> setSortRides(rides)}>
            <View style={{flexDirection:'row'}}>
              <Icon source={require('../images/baby.png')} size={20} color='white'/>
              <Icon source={require('../images/child.png')} size={20} color='white'/>
            </View>
            <View style={{flexDirection:'row'}}>
              <Icon source={require('../images/teenager.png')} size={20} color='white'/>
              <Icon source={require('../images/adult.png')} size={20} color='white'/>
            </View> 
            </TouchableOpacity>
          </View>
          <IconButton icon={require('../images/baby.png')} size={35} onPress={() => sortRidesFunc('baby')} iconColor='black' containerColor='white' mode='contained'/>
          <IconButton icon={require('../images/child.png')} size={35} onPress={() => sortRidesFunc('child')} iconColor='black' containerColor='white' mode='contained'/>
          <IconButton icon={require('../images/teenager.png')} size={35} onPress={() => sortRidesFunc('teenager')} iconColor='black' containerColor='white' mode='contained'/>
          <IconButton icon={require('../images/adult.png')} size={35} onPress={() => sortRidesFunc('adult')} iconColor='black' containerColor='white' mode='contained'/>
        </View>


        <ScrollView style={styles.ridesScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.ridesContainer}>
            {
              sortRides.map((ride:Ride) => (
                <View key={ride.id}  style={styles.imageContainer}>
                  <TouchableOpacity  onPress={()=> navigation.navigate('Ride', ride)}>
                    
                    <Image source={{uri: `data:image/png;base64,${encode(String.fromCharCode.apply(null, ride.image.data))}`}} style={styles.image} resizeMode='contain'/>
                    <Text style={styles.text}>{ride.rideName}</Text>
                  </TouchableOpacity>
                </View>
              ))
            }
          </View>
      </ScrollView>
    </View>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'rgba(245, 246, 250, 1)',
  },
  help: {
    top: 30,
    left: 32,
  },
  userName:{
    top: -2,
    left: 330,
    marginRight:50,
    color:'black',
    textDecorationLine:'underline',
    width: 80,
  },
  title:{
    width: 245,
    height: 83,
    top: 45,
    left: 46, 
    fontFamily:'PloniDBold',
    fontSize:36,
    color:'rgba(0, 0, 0, 1)',
    fontWeight:'600',
    lineHeight:40,
    letterSpacing:0,
    textAlign:'left',
  },
  searchBar:{
    width: 345,
    height: 54,
    top: 75,
    alignSelf:'center',
    borderRadius:35,
    backgroundColor: 'white',
  },
  filters:{
    width: 58,
    height: 40,
    top: 100,
    left: 46,
    fontFamily:'Ploni ML v2 AAA',
    fontSize:22,
    fontWeight:'bold',
    lineHeight:40,
    letterSpacing:0,
    textAlign:'left',
    color:'rgba(3, 3, 3, 1)',
  },
  filtersContainer:{
    top: 115,
    left: 39,
    flexDirection:'row',
  },
  filtersAll:{
    width: 60,
    height: 59,
    backgroundColor:'rgba(255, 21, 70, 1)',
    borderRadius:50,
    padding:10,
    marginRight:10
  },
  ridesScroll:{
    marginTop:130,
    marginHorizontal:20,
    paddingHorizontal: 16,
  },
  ridesContainer:{
    flexDirection:'row',
    justifyContent: 'space-around',
    flexWrap:'wrap',
  },
  imageContainer: {
    width: '40%',
    aspectRatio: 0.7,
    marginVertical:'3%',
    borderRadius:30,
    backgroundColor:'white',
  },
  image:{
    width:'80%',
    height:'65%',
    // width:  100,
    // height:100,
    marginTop:15,
    alignSelf:'center',
  },
  text: {
    fontFamily: 'Ploni ML v2 AAA',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign:'center',
    alignSelf:'center',
    marginTop:3,
  },
});
