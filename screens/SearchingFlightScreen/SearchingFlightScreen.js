import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

 const SearchingFlightScreen = () => {

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.searchingBarContainer}>
                    <MaterialCommunityIcons name="magnify" size={24} color="#9E9E9E" />
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.searchingBar}
                        placeholder='Find a flight'
                        placeholderTextColor="#9E9E9E"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>

    );
 };

 const styles = StyleSheet.create({
    container:{ 
        backgroundColor: '#fff',
    },
    searchingBarContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },});

export default SearchingFlightScreen;