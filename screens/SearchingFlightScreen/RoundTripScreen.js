import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const formatDate = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        return "Invalid date";
    }
    return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    }).format(date);
};

const RoundTrip = () => {
    const [departDay, setDepartDay] = useState(new Date());
    const [returnDay, setReturnDay] = useState(new Date());
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [selectedDateType, setSelectedDateType] = useState('');

    const toggleModal = () => setModalVisible(!isModalVisible);
    const Daymodal = () => setModalVisible2(!isModalVisible2);

    const handleDateChange = (day) => {
        if (selectedDateType === 'depart') {
            setDepartDay(new Date(day.dateString));
            setSelectedDateType('return'); // Chuyển sang chọn ngày về
        } else if (selectedDateType === 'return') {
            setReturnDay(new Date(day.dateString));
            setModalVisible2(false); // Đóng modal sau khi chọn ngày về
        }
    };

    // Hàm đánh dấu các ngày ở giữa ngày đi và về
    const getIntermediateDates = (start, end) => {
        if (!start || !end) return {};
        const dates = {};
        let currentDate = new Date(start);
        const endDate = new Date(end);

        while (currentDate < endDate) {
            currentDate.setDate(currentDate.getDate() + 1);
            const dateString = currentDate.toISOString().split('T')[0];
            if (dateString !== end.toISOString().split('T')[0]) {
                dates[dateString] = { color: '#B2EFFF', textColor: 'black' };
            }
        }
        return dates;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.fromToContainer}>
                <TouchableOpacity style={styles.flightFromButton} onPress={toggleModal}>
                    <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>From</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.flightToButton}>
                    <MaterialCommunityIcons name="airplane-landing" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>To</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dateContainer}>
                <TouchableOpacity style={styles.departDayButton} onPress={() => { setSelectedDateType('depart'); Daymodal(); }}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.dateText}>{formatDate(departDay)}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.returnDayButton} onPress={() => { setSelectedDateType('return'); Daymodal(); }}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.dateText}>{formatDate(returnDay)}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.searchFlightButton}>
                <Text style={styles.searchFlightText}>Search Flight</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible2} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Dates</Text>
                        <TouchableOpacity onPress={Daymodal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>

                        <Calendar
                            // Ngày hiện tại của lịch
                            current={departDay.toISOString().split('T')[0]}
                            onDayPress={handleDateChange}
                            markingType="period"
                            markedDates={{
                                [departDay.toISOString().split('T')[0]]: {
                                    startingDay: true,
                                    color: '#00BFFF',
                                    textColor: 'white'
                                },
                                [returnDay.toISOString().split('T')[0]]: {
                                    endingDay: true,
                                    color: '#00BFFF',
                                    textColor: 'white'
                                },
                                ...getIntermediateDates(departDay, returnDay)
                            }}
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
