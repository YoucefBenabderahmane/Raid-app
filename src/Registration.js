import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native'
import { db } from '../config'
import { ref,set } from 'firebase/database'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Registration = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const registerUser = async (email, password, firstName, lastName) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: 'https://bar-appp.firebaseapp.com/verifyEmail',
      })
      const user = firebase.auth().currentUser;
      if (user) {
        await user.updateProfile({
          displayName: firstName,
      });
      console.log('Display name set:', user.displayName);
    } else {
      console.error('No authenticated user found.');
    }

      // Define userData here
      const userData = {
        email,
        password,
        firstName,
        lastName,
        // ... other user data fields
      };

      await firebase.firestore().collection("barbers").add(userData)
      console.log("User registered and added to Firestore successfully");
      alert('Verification email sent')
    } catch (error) {
      console.error("Error registering user: ", error);
      alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.underTitle}> Please fill in the form to contine</Text>   
      <View style={{marginTop:40}}>
        <TextInput 
        style={styles.textInput} 
        placeholder='First Name'
        onChangeText={(firstName) => setFirstName(firstName)}
        autoCorrect={false}
        />
            <TextInput 
        style={styles.textInput1} 
        placeholder='Last Name'
        onChangeText={(lastName) => setLastName(lastName)}
        autoCorrect={false}
        />
             <TextInput 
        style={styles.textInput2} 
        placeholder='Email'
        onChangeText={(Email) => setEmail(Email)}
        autoCapitalize='none' 
        autoCorrect={false}
        keyboardType='email-address'      
         />
            <TextInput 
        style={styles.textInput3} 
        placeholder='Password'
        onChangeText={(Password) => setPassword(Password)}
        autoCorrect={false}
        autoCapitalize='none' 
        secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.Sign}
      onPress={() => registerUser(email, password, firstName, lastName)}>
        <Text style={styles.SignText}>Register</Text>
      </TouchableOpacity>
      
      <Text style={styles.underRegister}>
      {'Already have an account? '}
      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>  Sign in</Text>
    </Text>
    </View>
  )
}

export default Registration
const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#05131B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    marginTop:-250,
     textAlign:'center',
     fontSize:30,
     color:'rgba(255, 255, 255, 0.88)'
    },
    underTitle:{
      textAlign:'center',
      fontSize:13,
      color:'#47545A',
    },
  textInput: {
    width: 300,
    height: 70,
    position: 'relative',
    top: 60,
    backgroundColor: 'rgba(78, 89, 96, 1)',
    padding: 10,
    borderRadius: 20,
    fontSize:15,
  },
  textInput1: {
    width: 300,
    height: 70,
    position: 'relative',
    top: 80,
    backgroundColor: 'rgba(78, 89, 96, 1)',
    padding: 10,
    borderRadius: 20,
    fontSize:15,
  },
  textInput2: {
    width: 300,
    height: 70,
    position: 'relative',
    top: 100,
    backgroundColor: 'rgba(78, 89, 96, 1)',
    padding: 10,
    borderRadius: 20,
    fontSize:15,
  },
  textInput3: {
    width: 300,
    height: 70,
    position: 'relative',
    top: 120,
    backgroundColor: 'rgba(78, 89, 96, 1)',
    padding: 10,
    borderRadius: 20,
    fontSize:15,
  },
  Sign: {
    width: 300,
    height: 70,
    position: 'relative',
    top: 180,
    backgroundColor: '#00ADB5',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SignText:{
    fontSize:16,
    color: 'rgba(255, 255, 255, 0.88)',
   
  },
  underRegister:{
    top:220,
    textAlign:'justify',
    fontSize:14,
    color:'#47545A',
  },
  link: {
    textAlign:'justify',
    color: '#00ADB5',
    fontSize:16,
  },
})