import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './home';
import { Rides} from './rides';
import { SignUp } from './signUp';
import { SignIn } from './signIn';
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ride } from './ride';
import { MyRides } from './myRides';
import { Feedback } from './feedback';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { IconButton } from 'react-native-paper';
import { AddChild } from './addChild';
import { OnBoarding1 } from './onBoarding1';
import { OnBoarding2 } from './onBoarding2';
import { OnBoarding3 } from './onBoarding3';

// const Drawer=():JSX.Element =>{

//     const [visibleSignIn, setVisibleSinIn] = useState<Boolean>(false);

//     const Drawer = createDrawerNavigator();

//     return(
//         <>
//         <Drawer.Navigator 
//             backBehavior="history" 
//             drawerContent={ props => {
//                 return (
//                 <DrawerContentScrollView {...props}>
//                     <DrawerItemList {...props} />
//                     <DrawerItem label="Login" onPress={() => setVisibleSinIn(true)}/>
//                 </DrawerContentScrollView>
//                 )
//             }}
//         >
//             <Drawer.Screen name="Home" component={Home}></Drawer.Screen>
//             <Drawer.Screen name="Rides" component={Rides}></Drawer.Screen>
//             <Drawer.Screen name="SignUp" component={SignUp}></Drawer.Screen>
//             <Drawer.Screen name="MyRides" component={MyRides}></Drawer.Screen>
//             <Drawer.Screen name="Feedback" component={Feedback}></Drawer.Screen>
//         </Drawer.Navigator>
//         </>
//     )
// }

const BottomNavigation =({route}) => {
    
    const initialScreen = route.params;
    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator initialRouteName={initialScreen} screenOptions={{ tabBarShowLabel: false , tabBarStyle:{height:55}, tabBarHideOnKeyboard: true }}>
            <Tab.Screen name="Rides" component={Rides} options={{tabBarIcon: ({focused}) => ( <IconButton icon='home' size={focused? 35: 25} style={{marginBottom: focused ? 45 : 0, backgroundColor: 'white', borderColor: focused ? 'rgba(245, 246, 250, 1)': 'white', borderWidth:3 }} iconColor={focused? 'rgba(255, 21, 70, 1)': 'lightgray'}/>), headerShown: false }} />
            <Tab.Screen name="MyRides" component={MyRides} options={{tabBarIcon: ({focused}) => ( <IconButton icon='format-list-bulleted' size={focused? 35: 25}  style={{marginBottom: focused ? 45 : 0, backgroundColor: 'white', borderColor: focused ? 'rgba(245, 246, 250, 1)': 'white', borderWidth:3}} iconColor={focused? 'rgba(255, 21, 70, 1)': 'lightgray'}/>), headerShown: false }}/>
            <Tab.Screen name="AddChild" component={AddChild} options={{tabBarIcon: ({focused}) => ( <IconButton icon={require('../images/navigationIcons/addChild.png')} size={focused? 35: 25}  style={{marginBottom: focused ? 45 : 0, backgroundColor: 'white', borderColor: focused ? 'rgba(245, 246, 250, 1)': 'white', borderWidth:3}} iconColor={focused? 'rgba(255, 21, 70, 1)': 'lightgray'}/>), headerShown: false }}/>
            <Tab.Screen name="Feedback" component={Feedback} options={{tabBarIcon: ({focused}) => ( <IconButton icon='message' size={focused? 35: 25}  style={{marginBottom: focused ? 45 : 0, backgroundColor: 'white', borderColor: focused ? 'rgba(245, 246, 250, 1)': 'white', borderWidth:3}} iconColor={focused? 'rgba(255, 21, 70, 1)': 'lightgray'}/>), headerShown: false }}/>
        </Tab.Navigator>
    )
}

export const Navigation =()=>{
    
    const Stack = createNativeStackNavigator();
   
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
                <Stack.Screen name="OnBoarding1" component={OnBoarding1} options={{ headerShown: false }} />
                <Stack.Screen name="OnBoarding2" component={OnBoarding2} options={{ headerShown: false }} />
                <Stack.Screen name="OnBoarding3" component={OnBoarding3} options={{ headerShown: false }} />
                <Stack.Screen name="Navigation" component={BottomNavigation} options={{ headerShown: false }}/>
                <Stack.Screen name="Ride" component={Ride} options={{ headerShown: false }} />
            </Stack.Navigator>
       </NavigationContainer>
    )
}