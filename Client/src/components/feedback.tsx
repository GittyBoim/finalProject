import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { IconButton, Modal, Portal, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from '@reduxjs/toolkit';
import { addFeedbackAPI, getFeedbackAPI } from '../api/feedback.api';


export const Feedback= ({navigation}):JSX.Element=> {

    const feedbacks = useSelector( (state:any) => state.feedbackSlice.feedbacks);
    const users = useSelector( (state:any) => state.userSlice.users) as User[];
    const [stars, setStars] = useState([false, false, false, false, false]);

    const[visibleAdd, setVisibleAdd] = useState(false);

    const Dispatch = useDispatch();
    
    useEffect(()=>{
      Dispatch(getFeedbackAPI() as unknown as AnyAction);
    },[])

    const [newFeedback, setNewFeedback] = useState<Feedback>({
      id:0,
      userName:"",
       content:"",
       countStars:0,
    });

    const onChange = (fieldName: string, value: string) => {
      setNewFeedback({
          ...newFeedback,
          [fieldName]: value
      });
    };
  
    const onPressStar =(index:number) => {
      stars[index] = !stars[index];
      setStars([...stars]);
    }

    const resete =()=>{
      setNewFeedback({
        id:0,
        userName:"",
        content:"",
        countStars:0,
      });
      setStars([false, false, false, false, false]);
    }
    
    const addFeedback = async() => {
      newFeedback.countStars = stars.filter((star)=> star).length;
      Dispatch(addFeedbackAPI(newFeedback) as unknown as AnyAction);
      resete();
      setVisibleAdd(false);
    };

    return(
      <View style={styles.container}>

        <IconButton icon="help" containerColor='white' size={15} style={styles.help} onPress={()=> navigation.navigate('OnBoarding1')}/>
        {
          users[0]? <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">{`Hi ${users[0].userName}!`}</Text>:
            <Text style={styles.userName} onPress={()=> navigation.navigate('SignIn')}>{'Login >'}</Text>
        }
        <Text style={styles.title}>Feedback</Text>

        <ScrollView style={styles.feedbackList} showsVerticalScrollIndicator={false}>
            {feedbacks.map((feedback:Feedback, index:number) => (
            <View key={index} style={styles.feedbackContainer}>
                <View style={styles.userContainer}>
                  <Text style={styles.userNameFeedback}>{feedback.userName}</Text>
                  <View style={{...styles.starContainer, marginLeft:100}}>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={feedback.countStars >= 1? 'red': 'lightgray'}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={feedback.countStars >= 2? 'red': 'lightgray'}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={feedback.countStars >= 3? 'red': 'lightgray'}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={feedback.countStars >= 4? 'red': 'lightgray'}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={feedback.countStars >= 5? 'red': 'lightgray'}/>
                  </View>
                </View>
                <Text style={styles.content}>{feedback.content}</Text>
            </View>
            ))}
        </ScrollView>

        {
          !visibleAdd && <IconButton icon={'plus' } size={40} iconColor='white'
            style={styles.button}
            onPress={()=> setVisibleAdd(true)}
          />
        }
        
        <Portal>
          <Modal visible={visibleAdd} onDismiss={()=> setVisibleAdd(false)} contentContainerStyle={styles.modal}>
            <View style={styles.addFeedbackContainer}> 
              <View style={{flexDirection:'row', borderBottomWidth:0.5, padding:0}}>
                <TextInput
                  label="Name"
                  underlineColor='transparent'
                  underlineStyle={{  display:'none' }}
                  value={newFeedback.userName}
                  onChangeText={(value) => onChange("userName", value)}
                  style={styles.textInput}
                />
                <View style={{...styles.starContainer, left:80}}>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={stars[0]? 'red': 'lightgray'} onPress={()=> onPressStar(0)}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={stars[1]? 'red': 'lightgray'} onPress={()=> onPressStar(1)}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={stars[2]? 'red': 'lightgray'} onPress={()=> onPressStar(2)}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={stars[3]? 'red': 'lightgray'} onPress={()=> onPressStar(3)}/>
                    <IconButton icon="star" style={{marginHorizontal:0}} iconColor={stars[4]? 'red': 'lightgray'} onPress={()=> onPressStar(4)}/>
                </View>
              </View>
              <TextInput
                label={"Your feedback"}
                underlineColor='transparent'
                underlineStyle={{  display:'none' }}
                value={newFeedback.content}
                onChangeText={(value) => onChange("content",value)}
                style={styles.textInput}
                multiline
                numberOfLines={4}
              />
            </View>
            <View accessibilityViewIsModal={false}>
              <IconButton icon={require('../images/send.png')} size={40} iconColor='white'
                style={styles.modalButton}
                onPress={()=> addFeedback()}
              />
            </View>
          </Modal>
        </Portal>  

      </View>
              
  );
};

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
    feedbackList: {
      marginTop: 45,
      paddingVertical: 16,
      paddingHorizontal: 24,
    },
    feedbackContainer: {
      backgroundColor: '#fff',
      marginBottom: 16,
      padding: 16,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.2,
      shadowRadius: 2,
      elevation: 2,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    userNameFeedback: {
      fontSize: 16,
      fontWeight:'600',
      fontFamily: 'PloniDBold',
      marginLeft: 8,
      color:'black',
    },
    content: {
      fontSize: 14,
      color:'black',
    },
    button: {
      position:'absolute', 
      bottom: 17, 
      left: 15, 
      backgroundColor:'rgba(255, 21, 70, 1)',
    }, 
    modal:{
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    addFeedbackContainer: {
      position: 'absolute',
      bottom: 105,
      left: 110,
      width: 290,
      height: 150,
      borderRadius: 30,
      backgroundColor:'white',
    },
    starContainer:{
      flexDirection:'row', 
      left: 40,
      position:'absolute',
    },
    textInput:{
      backgroundColor:'white',
      marginBottom: 10,
      borderRadius: 30,
      borderTopEndRadius: 30,
      borderTopLeftRadius: 30,
    },
    modalButton: {
      position:'absolute', 
      bottom: 72, 
      left: 15, 
      backgroundColor:'rgba(255, 21, 70, 1)',
    }
  });