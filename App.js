import { StatusBar } from 'expo-status-bar';
import React, {useState,useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {firebase} from './config';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Registration from './src/Registration';
import Home from './src/Home';
import Login from './src/Login';
import AddData from './src/AddData';

const stack = createStackNavigator();
 function App() {
  const [initializing, setInitializing]= useState(true);
  const [user, setUser]= useState();

  //handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if(initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber= firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if(initializing) return null;
  if(!user){
    return (
      <stack.Navigator>
        <stack.Screen name="Registration" component={Registration}  options={{headerShown:false}} />
        <stack.Screen name='Login' component={Login} options={{headerShown:false}} />
      </stack.Navigator>
    );
} else {
  return (
    <stack.Navigator>
      <stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <stack.Screen name="AddProfile" component={AddData}/>
    </stack.Navigator>
  );
 }
}
export default () => {
  return (
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}