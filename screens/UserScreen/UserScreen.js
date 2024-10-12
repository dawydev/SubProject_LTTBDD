// screens/UserScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserScreen = () => {
    return (
        <View style={styles.screenContainer}>
            <Text style={styles.screenText}>User Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    screenText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#393D43',
    },
});

export default UserScreen;
