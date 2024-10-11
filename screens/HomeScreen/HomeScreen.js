import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Card, Provider as PaperProvider, Appbar, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeScreen = () => {



    return(
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeBarContainer}>
                    <View style={styles.planeIcon}> 
                        <MaterialCommunityIcons name="airplane" size={40} color="white"/>
                    </View>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 18, color: '#393D43', marginLeft: 10, fontWeight: 600, marginBottom:6}}>Explore flight</Text>
                        <Text style={{fontSize: 14, color: '#b6b8b8', marginLeft: 10, marginBottom:4, fontWeight:600}}>Welcome to flight booking</Text>
                    </View>
                    <View style={styles.userImg}>
                        <Image
                            source={require('../../assets/img/user.png')}
                            style={{height: 55, width: 55, borderRadius: 100}}
                        />
                    </View>
                </View>
                {/*SreachingBar*/}
                <View style={styles.searchingBarContainer}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#9E9E9E" />
                    <TextInput
                    underlineColorAndroid="transparent"
                    style={styles.searchingBar}
                    placeholder='Find a flight'
                    placeholderTextColor="#9E9E9E"
                    />
                </View>

                <View>

                </View>
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeBarContainer:{
        marginTop: 30,
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
    },
    planeIcon:{
        marginHorizontal: 10,
        height: 55,
        width: 55,
        backgroundColor: '#00BDDA',
        color: 'white',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    userImg:{
        height: 55,
        width: 55,
        backgroundColor: '#fff',
        borderRadius: 100,
        marginLeft: 60,
    },
    searchingBarContainer:{
        marginTop: 30,
        height: 50,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding:10,
        alignSelf: 'center',
    },
    searchingBar:{
        height: 40,
        width: '90%',
        backgroundColor: '#EEEEEE',
        marginHorizontal: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        fontSize: 17,
        fontWeight: 'bold',
    }
});

export default HomeScreen;