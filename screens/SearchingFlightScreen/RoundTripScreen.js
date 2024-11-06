import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
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

const RoundTrip = () => {
    const [departDay, setDepartDay] = useState(formatDate(new Date()));
    const [returnDay, setReturnDay] = useState(formatDate(new Date()));
    const [isModalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const sampleData = [
        { id: '1', city: 'London, United Kingdom', airport1: 'London City Airport (LCY)', distance1: '20 km', airport2: 'Heathrow Airport (LHR)', distance2: '11 km' },
        { id: '2', city: 'London, Ontario, Canada', airport1: '', distance1: '', airport2: '', distance2: '' },
    ];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const renderItem = ({ item }) => (
        <View style={styles.locationItem}>
            <Text style={styles.cityText}>{item.city}</Text>
            <Text style={styles.subText}>Capital of {item.city.includes("United Kingdom") ? "England" : "Canada"}</Text>
            {item.airport1 ? (
                <View style={styles.airportContainer}>
                    <Text style={styles.airportText}>{item.airport1}</Text>
                    <Text style={styles.distanceText}>{item.distance1} to destination</Text>
                </View>
            ) : null}
            {item.airport2 ? (
                <View style={styles.airportContainer}>
                    <Text style={styles.airportText}>{item.airport2}</Text>
                    <Text style={styles.distanceText}>{item.distance2} to destination</Text>
                </View>
            ) : null}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* From and To */}
            <View style={styles.fromToContainer}>
                {/* From */}
                <TouchableOpacity style={styles.flightFromButton} onPress={toggleModal}>
                    <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>From</Text>
                </TouchableOpacity>

                {/* To */}
                <TouchableOpacity style={styles.flightToButton}>
                    <MaterialCommunityIcons name="airplane-landing" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>To</Text>
                </TouchableOpacity>
            </View>

            {/* Ngày đi và ngày về */}
            <View style={styles.dateContainer}>
                {/* depart day */}
                <TouchableOpacity style={styles.departDayButton}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.dateText}>{departDay}</Text>
                </TouchableOpacity>

                {/* return day */}
                <TouchableOpacity style={styles.returnDayButton}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.dateText}>{returnDay}</Text>
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

            {/* Nút Search Flight */}
            <TouchableOpacity style={styles.searchFlightButton}>
                <Text style={styles.searchFlightText}>Search Flight</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Where from?</Text>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
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

                        <FlatList
                            data={sampleData}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                        />
                        
                    </View>
                </View>
            </Modal>
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
        marginBottom: 10,
    },
    flightToButton: {
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
        width: "49%",
        alignItems: 'center',
        borderRadius: 10,
    },
    returnDayButton: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#F3F4F6',
        width: "49%",
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
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#00BDD5',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoundTrip;