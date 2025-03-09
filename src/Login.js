import { View, Text, TouchableOpacity, TextInput,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import {firebase} from '../config'
import { useNavigation } from '@react-navigation/native'



const Login = () => {
  
   const navigation=useNavigation()
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const isEmailValid = (email) => {
    // Regular expression for email validation (with optional spaces)
    const emailRegex = /^\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*$/;
    return emailRegex.test(email);
  };
  

   loginUser = async (email, password) => {
    try {
      const trimmedEmail = email.trim();
       if (!isEmailValid(email)) {
        alert('Invalid email format');
        return;
      }
     await firebase.auth().signInWithEmailAndPassword(trimmedEmail, password)
    } catch (error){
      alert(error.message)
    }
   }
   
  // forget password 
  const forgetPassword =() => {
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Password reset email sent")
    }).catch((error) => {
      alert(error)
    })
  }
        return(
          <View style={styles.container}>
     <View>
     <Text  style={styles.title}>
    <Text >Welcome Back!</Text>{'\n'}
    <Text style={styles.underTitle}>Please sign in  to your account</Text>
     </Text>
     </View>
     
      <TextInput style={styles.textInput} 
                 placeholder='Email' 
                 onChangeText={(email) => setEmail(email)}
                 autoCapitalize='none'
                 autoCorrect={false}
  />
      <TextInput style={styles.textInput2} 
                 placeholder='Password'
                 onChangeText={(password)=> setPassword(password)}
                 autoCapitalize='none'
                 autoCorrect={false}
                 secureTextEntry={true}
  />
    <TouchableOpacity  onPress={() => {forgetPassword()}}  style={{ marginTop:120, left:75}}>
    <Text style={{fontSize: 15,color: '#47545A'}}>
    Forgot Password ?
      </Text>
      </TouchableOpacity>  
      <View>
      <TouchableOpacity style={styles.Sign} onPress={() => loginUser(email, password)}> 
        <Text style={styles.SignText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.google}>
         <Text style={styles.googleText}> Sign in with Google</Text>
      </TouchableOpacity>
      </View>
      <View>
      <Text style={styles.forget1}> {"Don't have an account?"}
              <Text style={styles.link}  onPress={() => navigation.navigate('Registration')}> Register Now</Text> 
              </Text> 
              </View>
   </View>
        )
    }


export default Login
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'rgba(22, 23, 27, 1)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title:{
      marginTop:50,
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
    forget:{
      verticalAlign:'middle',
    },
    forgot:{
      marginTop:140,
      left:78,
      fontSize: 15,
      color: '#47545A',
    },
  
    Sign: {
      width: 300,
      height: 70,
      position: 'relative',
      top: 100,
      backgroundColor: '#00ADB5',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    SignText:{
      fontSize:16,
      color: 'rgba(255, 255, 255, 0.88)',
     
    },
    google:{
      width: 300,
      height: 70,
      position: 'relative',
      top: 120,
      padding:20,
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      borderRadius: 20,
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'center',
    },
    googleText:{
      alignItems: 'center',
      marginLeft:-35,
    },
    forget1:{
      marginTop:160,
      left:1,
      fontSize: 15,
      color: '#47545A'
    },
    link: {
      flexDirection: 'row',
      textAlign:'justify',
      color: '#00ADB5',
      fontSize:15,
    },
})