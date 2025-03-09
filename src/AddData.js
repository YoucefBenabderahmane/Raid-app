import { StyleSheet, Text, View, TextInput, Button, Image, ScrollView, Platform, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, firebase } from '../config';
import { ref, set } from 'firebase/database';
import * as ImagePicker from 'expo-image-picker';

const AddData = () => {
    const [title, setTitle] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [currentSkill, setCurrentSkill] = useState('');
   
   

    useEffect(() => {
        getPermissionAsync();
    }, []);

    const getPermissionAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Permission to access media library is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        });

        if (!result.canceled) {
            setProfilePic(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        if (profilePic) {
            const response = await fetch(profilePic);
            const blob = await response.blob();
    
            const storageRef = firebase.storage().ref();
            const user = firebase.auth().currentUser;
    
            if (user  && title) {
                const userId = user.uid;
                const userProfilePicRef = storageRef.child(`profile_pics/${userId}.jpg`);
    
                try {
                    const snapshot = await userProfilePicRef.put(blob);
                    const downloadURL = await snapshot.ref.getDownloadURL();
                    console.log('Image uploaded successfully');
                    setProfilePic(downloadURL); // Store the image URL
                    
                    // Add data to the Realtime Database
                    const postData = {
                        imageURL: downloadURL,
                    };
                  // Create a new skills reference under the salon's key and store the skills list
                  const salonRef = ref(db, 'barbers/' + title);
                  await set(salonRef, postData);

                  const skillsRef = ref(db, 'barbers/' + title + '/Services');
                  await set(skillsRef, skills);
                 
              } catch (error) {
                  console.error('Error uploading image:', error);
              }
          } else {
              alert('Please add your Salon name.');
          }
      }
    };
    const [skills, setSkills] = useState([]);
    const [removeSkillIndex, setRemoveSkillIndex] = useState(-1);
   
        const confirmRemoveSkill = (index) => {
            if (removeSkillIndex === index) {
                clearTimeout(removeTimer);
                removeSkill(index);
            } else {
                setRemoveSkillIndex(index);
                removeTimer = setTimeout(() => {
                    setRemoveSkillIndex(-1);
                }, 10000); // Set a timeout to reset the delete button after 2 seconds
            }
        };
    
        const removeSkill = (index) => {
            const updatedSkills = skills.filter((_, i) => i !== index);
            setSkills(updatedSkills);
            setRemoveSkillIndex(-1); // Hide the delete button
        };
    
        let removeTimer;
    

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Salon Registration</Text>
            <TextInput
                placeholder='Nom de Salon'
                value={title}
                onChangeText={text => setTitle(text)}
                style={styles.input}
            />
            {profilePic && <Image source={{ uri: profilePic }} style={styles.image} />}
            <Button title="Profile Image" onPress={pickImage} />
                <TextInput
                    placeholder="Add Service"
                    value={currentSkill}
                    onChangeText={setCurrentSkill}
                    style={styles.input}
                />
                <Button
                style={styles.input}
                    title="Add Services"
                    onPress={() => {
                        if (currentSkill.trim() !== '') {
                            setSkills([...skills, currentSkill]);
                            setCurrentSkill('');
                        }
                    }}
                />
              
           <View style={styles.container1}>
            <ScrollView>
                <View >
                    {skills.map((skill, index) => (
                        <View key={index} style={styles.skillButtonsContainer}>
                            
                            <TouchableOpacity
                                style={[styles.skillButton, { backgroundColor: removeSkillIndex === index ? 'lightgrey' : 'white' }]}
                                onPress={() => confirmRemoveSkill(index)}
                            >
                                <Text>{skill}</Text>
                            </TouchableOpacity>
                            {removeSkillIndex === index && (
                                <TouchableOpacity
                                    style={styles.removeSkillButton}
                                    onPress={() => removeSkill(index)}
                                >
                                    <Text style={styles.removeButtonText}>x</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
            <View style={styles.save}>
            <Button   title="Save" onPress={uploadImage} />
            </View>
            
        </View>
           
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 50,
        fontWeight: 'bold',
    },
    input: {
        width:200,
        borderWidth: 1,
        borderColor: 'black',
        margin: 16,
        padding: 10,
        fontSize: 18,
        borderRadius: 10,
    },
    image: {
        width: 200,
        height: 200,
        margin:16,
    },
    scrollViewContent: {
        alignItems: 'center',
        paddingRight: 20,
    },
    container1:{
        flex:2,
        margin:16,
    },
  
    skillButtonsContainer: {
        marginTop: 1,
        marginBottom:2,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center',
        alignContent:'center',
        borderBottomWidth: 1,
        borderStartWidth:1,
        borderTopWidth:1,
        borderEndWidth:1, // Add a border at the bottom of each item
        borderColor: 'black', // Border color
        padding: 4, // Padding inside each item
        
    
    },
    skillButton: {
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        margin: 4,
    },
    save:{
        marginTop:20,
    },
    removeSkillButton: {
        backgroundColor: '#FF4062',
        width:15,
        height:15,
        borderRadius:10,
    },
    removeButtonText: {
        top:-4,
        left:3,
        color: 'white',
        fontSize:14,
        fontWeight: 'bold',
    },
});

export default AddData;