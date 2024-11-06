import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Định dạng ngày hôm nay với thứ viết tắt, tháng viết tắt và ngày
const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const OneWayScreen = () => {
    const [departDay, setDepartDay] = useState(formatDate(new Date()));
    const [returnDay, setReturnDay] = useState(formatDate(new Date()));

    return (
        <SafeAreaView style={styles.container}>
            {/* From and To */}
            <View style={styles.fromToContainer}>
                {/* From */}
                <TouchableOpacity style={styles.flightFromButton}>
                    <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>From</Text>
                </TouchableOpacity>

                {/* To */}
                <TouchableOpacity style={styles.flightToButton}>
                    <MaterialCommunityIcons name="airplane-landing" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>To</Text>
                </TouchableOpacity>
            </View>

            {/* Ngày đi*/}
            <View style={styles.dateContainer}>
                {/* depart day */}
                <TouchableOpacity style={styles.departDayButton}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.dateText}>{departDay}</Text>
                </TouchableOpacity>

            </View>

            {/* Traveller and Cabin Class */}
            <View style={styles.travelerCabinContainer}>
                <TouchableOpacity style={styles.travelerCabinButton}>
                    <MaterialCommunityIcons name="account" size={27} color="#757575" style={{ marginRight: 10, marginLeft: 40 }} />
                    <Text style={{color:"black"}}>1 traveler</Text>
                    <MaterialCommunityIcons name="rhombus-medium" size={10} color="#757575" style={{ marginRight: 10, marginLeft:10}} />
                    <MaterialCommunityIcons name="seat-passenger" size={27} color="#757575" style={{ }} />
                    <Text style={{color:"black", marginLeft:10}}>Economy</Text>
                    <MaterialCommunityIcons name="chevron-down" size={27} color="#757575" style={{marginLeft:70}} />
                </TouchableOpacity>
            </View>

            {/*  Search Flight Button*/}
            <TouchableOpacity style={styles.searchFlightButton}>
                <Text style={styles.searchFlightText}>Search Flight</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BDBDBD',
    },
    fromToContainer: {
        width: "90%",
    },
    flightFromButton: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#F3F4F6',
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
    },
    flightToButton: {
        marginTop: 3,
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        height: 50,
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
    },
    dateContainer: {
        width: "90%",
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    departDayButton: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#F3F4F6',
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#BDBDBD',
    },
    travelerCabinContainer: {
        width: "100%",
        marginTop: 50,
    },
    travelerCabinButton: {
        flexDirection: 'row',
        height: 50,
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    searchFlightButton: {
        position: 'absolute',
        bottom: 40,
        backgroundColor: '#00BDD5',
        width: '90%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    searchFlightText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OneWayScreen;
