import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { MyListRides } from './myListRides';
import { MyFamilyListRides } from './myFamilyListRides';
import { IconButton } from 'react-native-paper';


export const MyRides=({navigation}):JSX.Element=> {

  const users = useSelector( (state:any) => state.userSlice.users) as User[];
  
  const Tab = createMaterialTopTabNavigator();

  return(
    <View style={styles.container}>

      <IconButton icon="help" containerColor='white' size={15} style={styles.help} onPress={()=> navigation.navigate('OnBoarding1')}/>
      {
          users[0]? <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail" onPress={()=>navigation.navigate('UpdateUser')}>{`Hi ${users[0].userName}!`}</Text>:
            <Text style={styles.userName} onPress={()=> navigation.navigate('SignIn')}>{'Login >'}</Text>
      }
      <Text style={styles.title}>My Rides</Text>
      
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled:true,
          tabBarItemStyle:{width:90},
          tabBarStyle:{backgroundColor:'rgba(245, 246, 250, 1)'},
          tabBarIndicatorStyle: { backgroundColor:'rgba(255, 21, 70, 1)' },
          tabBarActiveTintColor: 'red',
          tabBarInactiveTintColor:'rgba(0, 0, 0, 1)',
        }}
        style={styles.navigator}
      >
        <Tab.Screen name="All" component={MyFamilyListRides} initialParams={{index:0}}/>
        {
          users.map((user, index)=> {
            return <Tab.Screen key={user.id} name={user.userName} component={MyListRides} initialParams={{index}}/>
          })
        }
      </Tab.Navigator>
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
    color:'black',
    textDecorationLine:'underline',
    width: 80,
  },
  title: {
    top: 45,
    left: 33,
    fontSize: 36,
    color:'rgba(0, 0, 0, 1)',
    fontWeight:'600',
    fontFamily: 'PloniDBold',
    lineHeight: 40,
    letterSpacing: 0,
    textAlign:'left',
  },
  navigator: {
    marginTop:65,
    marginHorizontal:30,
  }
});
