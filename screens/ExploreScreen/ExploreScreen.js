// screens/MoreScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MoreScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>More Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#393D43',
    },
});

export default MoreScreen;
