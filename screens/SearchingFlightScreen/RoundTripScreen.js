import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import SearchResultScreen from '../SearchResultScreen/SearchResultScreen.js';

// Định dạng ngày hôm nay với thứ viết tắt, tháng viết tắt và ngày
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
    const navigation = useNavigation();
    const [departDay, setDepartDay] = useState(new Date());
    const [returnDay, setReturnDay] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocationId, setSelectedLocationId] = useState(null);
    const [selectedRange, setSelectedRange] = useState({
        startDate: null,
        endDate: null,
      });
    const [isFromModalVisible, setFromModalVisible] = useState(false);
    const [isToModalVisible, setToModalVisible] = useState(false);
    const [isOptionModalVisible, setOptionModalVisible] = useState(false);
    const [isDatePickerModalVisible, setDatePickerModalVisible] = useState(false);
    const [isModalVisible2, setModalVisible2] = useState(false);
    const [selectedDateType, setSelectedDateType] = useState('');
    const [fromCity, setFromCity] = useState('From');
    const [toCity, setToCity] = useState('To');
    const toggleModalFrom = () => {
        setFromModalVisible(!isFromModalVisible);
    };
    const toggleModalTo = () => {
        setToModalVisible(!isToModalVisible);
    };
    const toggleModalDatePicker = () => {
        setModalVisible2(false); // Đóng Modal 2
        setDatePickerModalVisible(!isDatePickerModalVisible); // Chuyển trạng thái DatePicker nếu cần
      };
    const Daymodal = () => setModalVisible2(!isModalVisible2);
    const toggleModalOptional = () => {
        setOptionModalVisible(!isOptionModalVisible);
    };
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [infants, setInfants] = useState(0);
    const [selectedCabin, setSelectedCabin] = useState('Economy');
    const [travellersText, setTravellersText] = useState('1 traveler');
    
    // DATA MẪU LOCATION VÀ AIRPORT
    const sampleData = [
        { id: '1', city: 'London, United Kingdom', description: 'Capital of England', airports: [{ name: 'London City Airport', distance: '20 km', code:'LCY' }, { name: 'Heathrow Airport', distance: '11 km',code: 'LHR' }] },
        { id: '2', city: 'London, Ontario, Canada', description: 'Capital of England', airports: [{ name: 'London City Airport', distance: '20 km', code:'LCY' }, { name: 'Heathrow Airport', distance: '11 km',code: 'LHR' }] },
        { id: '3', city: 'Viet Nam, Tan San Nhat', description: 'Ho Chi Minh City', airports: [{ name: 'Tan San Nhat', distance: '2,210 km', code:'TSN' }] },
    ];
    const [visibleAirports, setVisibleAirports] = useState({});

    const toggleAirports = (id) => {
        setVisibleAirports((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle trạng thái hiển thị cho từng id riêng biệt
        }));
    };
    
    const handleLocationPress = (id) => {
        setSelectedLocationId(id);
        toggleAirports(id);
    };

    // Handle khi nhấn vào airport button
    const handleAirportPressFrom = (airport, city) => {
        setFromCity(city); // Cập nhật city đã chọn
        toggleModalFrom(); // Đóng modal sau khi chọn
        console.log(`Selected airport: ${airport.name}`);
    };
    const handleAirportPressTo = (airport, city) => {
        setToCity(city); // Cập nhật city đã chọn
        toggleModalTo(); // Đóng modal sau khi chọn
        console.log(`Selected airport: ${airport.name}`);
    };
    const handleToAirportPress = (airport, city) => {
        setToCity(city); // Cập nhật city đã chọn cho "To"
        toggleModalTo(); // Đóng modal của "To"
        console.log(`Selected airport for To: ${airport.name}`);
    };
    const handleDateChange = (day) => {
        if (selectedDateType === 'depart') {
            setDepartDay(new Date(day.dateString));
            setSelectedDateType('return'); // Chuyển sang chọn ngày về
        } else if (selectedDateType === 'return') {
            setReturnDay(new Date(day.dateString));
            setModalVisible2(false); // Đóng modal sau khi chọn ngày về
        }
    };
    const handleDone = () => {
        const totalTravellers = adults + children + infants;
        setTravellersText(`${totalTravellers} traveler${totalTravellers > 1 ? 's' : ''}`);
        toggleModalOptional();
    };
    // Đánh dấu ngày được chọn trên lịch
    const onDayPress = (day) => {
        if (!selectedRange.startDate || selectedRange.endDate) {
            // Khi không có startDate hoặc đã chọn xong endDate
            setSelectedRange({ startDate: day.dateString, endDate: null });
            setDepartDay(new Date(day.dateString)); // Cập nhật ngày đi
        } else {
            // Khi startDate đã có, chọn endDate
            setSelectedRange((prev) => ({
                ...prev,
                endDate: day.dateString,
            }));
            setReturnDay(new Date(day.dateString)); // Cập nhật ngày về
        }
    };
        const markedDates = {};
    if (selectedRange.startDate) {
        markedDates[selectedRange.startDate] = {
            startingDay: true,
            color: '#00adf5',
            textColor: 'white',
        };
    }
    if (selectedRange.endDate) {
        markedDates[selectedRange.endDate] = {
            endingDay: true,
            color: '#00adf5',
            textColor: 'white',
        };
        // Đánh dấu các ngày giữa startDate và endDate
        let start = new Date(selectedRange.startDate);
        let end = new Date(selectedRange.endDate);
        while (start < end) {
            start.setDate(start.getDate() + 1);
            const dateString = start.toISOString().split('T')[0];
            if (dateString !== selectedRange.endDate) {
                markedDates[dateString] = { color: '#bde0fe', textColor: 'black' };
            }
        }
    }
    const renderItemFrom = ({ item }) => (
        <View style={styles.locationItem }>
            <View style={{ flexDirection: 'row', marginBottom: 10}}>
                {/* Location button */}
                <TouchableOpacity style={{backgroundColor: 'white', width:'100%'}} onPress={() => handleLocationPress(item.id)}>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="map-marker" size={23} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.city}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 5, color: '#A5AAAD' }}>{item.description}</Text>
                        </View>
                        {/* Toggle icon */}
                <AntDesign
                    style={{marginLeft: 'auto'}}
                    name={visibleAirports[item.id] ? "caretup" : "caretdown"} // Hiển thị caretup nếu mở, caretdown nếu đóng
                    size={10}
                />
                    </View>
                </TouchableOpacity>
            </View>
            {/* Dropdown list of airport buttons */}
            {visibleAirports[item.id] && (
                item.airports?.length > 0 ? (
                    item.airports.map((airport, index) => (
                        <TouchableOpacity 
                            key={airport.code || index} 
                            style={{ flexDirection: 'row', marginLeft: 60, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white' }}
                            onPress={() => handleAirportPressFrom(airport, item.city)} // Truyền thêm city
                        >
                            <MaterialCommunityIcons name="airplane" size={23} color="black" style={{ marginRight: 10 }} />
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'83%'}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{airport.name}</Text>
                                    <Text style={{ fontSize: 13, color: '#A5AAAD', fontWeight: 'bold' }}>{airport.distance} to destination</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '600'}}>{airport.code}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noAirportText}>No airports available</Text>
                )
            )}
        </View>
);

    const renderItemTo = ({ item }) => (
        <View style={styles.locationItem }>
            <View style={{ flexDirection: 'row', marginBottom: 10}}>
                {/* Location button */}
                <TouchableOpacity style={{backgroundColor: 'white', width:'100%'}} onPress={() => handleLocationPress(item.id)}>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcons name="map-marker" size={23} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                        <View style={{ flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.city}</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', marginTop: 5, color: '#A5AAAD' }}>{item.description}</Text>
                        </View>
                        {/* Toggle icon */}
                <AntDesign
                    style={{marginLeft: 'auto'}}
                    name={visibleAirports[item.id] ? "caretup" : "caretdown"} // Hiển thị caretup nếu mở, caretdown nếu đóng
                    size={10}
                />
                    </View>
                </TouchableOpacity>
            </View>
            {/* Dropdown list of airport buttons */}
            {visibleAirports[item.id] && (
                item.airports?.length > 0 ? (
                    item.airports.map((airport, index) => (
                        <TouchableOpacity 
                            key={airport.code || index} 
                            style={{ flexDirection: 'row', marginLeft: 60, paddingVertical: 10, alignItems: 'center', backgroundColor: 'white' }}
                            onPress={() => handleAirportPressTo(airport, item.city)} // Truyền thêm city
                        >
                            <MaterialCommunityIcons name="airplane" size={23} color="black" style={{ marginRight: 10 }} />
                            <View style={{flexDirection:'row'}}>
                                <View style={{width:'83%'}}>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{airport.name}</Text>
                                    <Text style={{ fontSize: 13, color: '#A5AAAD', fontWeight: 'bold' }}>{airport.distance} to destination</Text>
                                </View>
                                <View>
                                    <Text style={{ fontSize: 15, color: 'black', fontWeight: '600'}}>{airport.code}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noAirportText}>No airports available</Text>
                )
            )}
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* From and To */}
            <View style={styles.fromToContainer}>
                {/* From */}
                <TouchableOpacity style={styles.flightFromButton} onPress={toggleModalFrom}>
                    <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>{fromCity}</Text>
                </TouchableOpacity>

                {/* To */}
                <TouchableOpacity style={styles.flightToButton} onPress={toggleModalTo}>
                    <MaterialCommunityIcons name="airplane-landing" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                    <Text style={styles.text}>{toCity}</Text>
                </TouchableOpacity>
            </View>

            {/* Ngày đi và ngày về */}
            <View style={styles.dateContainer}>
                {/* Button Ngày đi */}
                <TouchableOpacity
                    style={styles.departDayButton}
                    onPress={() => {
                        setSelectedDateType('depart');
                        Daymodal();
                    }}
                >
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={27}
                        color="black"
                        style={{ marginRight: 10, marginLeft: 10 }}
                    />
                    <Text style={styles.dateText}>{formatDate(departDay)}</Text>
                </TouchableOpacity>

                {/* Button Ngày về */}
                <TouchableOpacity
                    style={styles.returnDayButton}
                    onPress={() => {
                        setSelectedDateType('return');
                        Daymodal();
                    }}
                >
                    <MaterialCommunityIcons
                        name="calendar-month-outline"
                        size={27}
                        color="black"
                        style={{ marginRight: 10, marginLeft: 10 }}
                    />
                    <Text style={styles.dateText}>{formatDate(returnDay)}</Text>
                </TouchableOpacity>
            </View>

            {/* Options Button*/}
            <TouchableOpacity style={styles.travelerCabinButton} onPress={toggleModalOptional}>
                {/* Icon thay đổi theo số lượng travellers */}
                <MaterialCommunityIcons
                    name={
                        adults + children + infants > 2
                            ? "account-group" // > 2 travellers
                            : adults + children + infants === 2
                            ? "account-multiple" // 2 travellers
                            : "account" // <= 1 traveller
                    }
                    size={27}
                    color="#757575"
                    style={{ marginRight: 10, marginLeft: 40 }}
                />
                <Text style={{ color: "black" }}>{travellersText}</Text>

                <MaterialCommunityIcons name="rhombus-medium" size={10} color="#757575" style={{ marginRight: 10, marginLeft: 10 }} />

                {/* Icon thay đổi theo Cabin Class */}
                <MaterialCommunityIcons
                    name={
                        selectedCabin === "Economy"
                            ? "seat-passenger"
                            : selectedCabin === "Premium Economy"
                            ? "seat-passenger"
                            : selectedCabin === "Business"
                            ? "briefcase-outline"
                            : "star-outline" // First Class
                    }
                    size={27}
                    color="#757575"
                />
                <Text style={{ color: "black", marginLeft: 10 }}>{selectedCabin}</Text>

                <MaterialCommunityIcons name="chevron-down" size={27} color="#757575" style={{ marginLeft: 70 }} />
            </TouchableOpacity>

            {/* Nút Search Flight */}
            <TouchableOpacity
                style={styles.searchFlightButton}
                onPress={() =>
                    navigation.navigate('SearchResultScreen', {
                        fromCity,
                        toCity,
                        departDay,
                        returnDay,
                        adults,
                        children,
                        infants,
                        selectedCabin,
                    })
                }
            >
                <Text style={styles.searchFlightText}>Search Flight</Text>
            </TouchableOpacity>

            {/* "Where From" Modal */}
            <Modal visible={isFromModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={styles.modalTitle}>Where from?</Text>
                            <TouchableOpacity onPress={toggleModalFrom} style={styles.closeButton}>
                                <MaterialCommunityIcons name="close" size={27} color="#919398" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fromToContainer}>
                            <View style={styles.textInputButton}>
                                <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                                <TextInput
                                    style={{ backgroundColor: '#F3F4F6', width: '80%', height: 50 }}
                                    value={searchQuery} 
                                    onChangeText={setSearchQuery}
                                    placeholder='Find the place'
                                />
                            </View>
                        </View>
                        <FlatList
                            style={{ width: '100%', height: '80%', marginTop: 10 }}
                            data={sampleData.filter(item => item.city.toLowerCase().includes(searchQuery.toLowerCase()))}
                            renderItem={renderItemFrom}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </Modal>

            {/* "Where To" Modal */}
            <Modal visible={isToModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <Text style={styles.modalTitle}>Where to?</Text>
                            <TouchableOpacity onPress={toggleModalTo} style={styles.closeButton}>
                                <MaterialCommunityIcons name="close" size={27} color="#919398" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.fromToContainer}>
                            <View style={styles.textInputButton}>
                                <MaterialCommunityIcons name="airplane-takeoff" size={27} color="black" style={{ marginRight: 10, marginLeft: 10 }} />
                                <TextInput
                                    style={{ backgroundColor: '#F3F4F6', width: '80%', height: 50 }}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    placeholder='Find the place'
                                />
                            </View>
                        </View>
                        <FlatList
                            style={{ width: '100%', height: '80%', marginTop: 10 }}
                            data={sampleData.filter(item => item.city.toLowerCase().includes(searchQuery.toLowerCase()))}
                            renderItem ={renderItemTo}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </Modal>

            {/* Date Picker Modal */}
            <Modal visible={isModalVisible2} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={styles.modalTitle}>Date</Text>
                        <TouchableOpacity onPress={() => setModalVisible2(false)} style={styles.closeButton}>
                        <MaterialCommunityIcons name="close" size={27} color="#919398" />
                        </TouchableOpacity>
                    </View>
                    <Calendar
                        style={styles.calendar}
                        theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#f8f9fa',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#00adf5',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: '#2d4150',
                        indicatorColor: '#00adf5',
                        }}
                        markingType="period"
                        markedDates={markedDates}
                        onDayPress={onDayPress}
                    />
                    <View style={styles.footer}>
                        <View>
                        <Text style={{ fontWeight: '500' }}>Round-Trip</Text>
                        </View>
                        <TouchableOpacity
                    style={styles.doneButton}
                    onPress={() => {
                        setModalVisible2(false); // Đóng modal
                    }}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>

        {/*  Modal Option */}
        <Modal visible={isOptionModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {/* Header */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Text style={styles.modalTitle}>Options</Text>
                            <TouchableOpacity onPress={toggleModalOptional}>
                                <MaterialCommunityIcons name="close" size={24} color="#919398" />
                            </TouchableOpacity>
                        </View>

                        {/* Traveller Section */}
                        <Text style={styles.sectionTitle}>Traveller</Text>
                        <View style={styles.row}>
                            <View style={{flexDirection: 'column', flex:1}}>
                            <Text style={styles.label}>Adults</Text>
                            <Text style={styles.sublabel}>12+ years</Text>
                            </View>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    onPress={() => setAdults(Math.max(0, adults - 1))}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="minus" size={20} color="#757575" />
                                </TouchableOpacity>
                                <Text>{adults}</Text>
                                <TouchableOpacity
                                    onPress={() => setAdults(adults + 1)}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="plus" size={20} color="#757575" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{flexDirection: 'column', flex:1}}>
                                <Text style={styles.label}>Children</Text>
                                <Text style={styles.sublabel}>2-12 years</Text>
                            </View>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    onPress={() => setChildren(Math.max(0, children - 1))}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="minus" size={20} color="#757575" />
                                </TouchableOpacity>
                                <Text>{children}</Text>
                                <TouchableOpacity
                                    onPress={() => setChildren(children + 1)}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="plus" size={20} color="#757575" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{flexDirection: 'column', flex:1}}>
                                <Text style={styles.label}>Infants</Text>
                                <Text style={styles.sublabel}>Under 2 years</Text>
                            </View>
                            <View style={styles.counter}>
                                <TouchableOpacity
                                    onPress={() => setInfants(Math.max(0, infants - 1))}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="minus" size={20} color="#757575" />
                                </TouchableOpacity>
                                <Text>{infants}</Text>
                                <TouchableOpacity
                                    onPress={() => setInfants(infants + 1)}
                                    style={styles.counterButton}
                                >
                                    <MaterialCommunityIcons name="plus" size={20} color="#757575" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Cabin Class Section */}
                        <Text style={styles.sectionTitle}>Cabin Class</Text>
                        {['Economy', 'Premium Economy', 'Business', 'First'].map((cabin) => (
                            <TouchableOpacity
                                key={cabin}
                                style={styles.cabinOption}
                                onPress={() => setSelectedCabin(cabin)}
                            >
                                <Text
                                    style={[
                                        styles.cabinText,
                                        selectedCabin === cabin && styles.selectedCabinText,
                                    ]}
                                >
                                    {cabin}
                                </Text>
                                {selectedCabin === cabin && (
                                    <MaterialCommunityIcons
                                        name="check"
                                        size={20}
                                        color="#000"
                                    />
                                )}
                            </TouchableOpacity>
                        ))}

                            {/* Done Button */}
                            <TouchableOpacity style={styles.doneButtonOptions} onPress={handleDone}>
                                <Text style={styles.doneButtonText}>Done</Text>
                            </TouchableOpacity>
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
        marginTop: 40,
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
    alignSelf: 'stretch', // Đảm bảo modal kéo dãn đủ chiều ngang
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '100%', // Giới hạn chiều cao tối đa
    flexShrink: 1, // Cho phép modal tự co lại nếu nội dung nhỏ
    },
    modalTitle: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginLeft: '37%',
    },
    closeButton: {
        marginTop: 12,
        marginLeft: 90,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#00BDD5',
        fontSize: 16,
        fontWeight: 'bold',
    },
    textInputButton: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#F3F4F6',
        width: "100%",
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10,
    },
    locationItem: {
        width: '100%',
        padding: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
    },
    doneButton: {
        width: '40%',
        backgroundColor: '#00BDD5',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 5,

      },
      doneButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    
    },
      footer: {
        marginTop: 20,
        width: '70%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      calendar: {
        borderRadius: 10,
        width: '100%',
        marginBottom: 20,
      },
      sectionTitle: {
        fontSize: 23,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        
    },
    sublabel: {
        fontSize: 12,
        color: '#757575',
    },
    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    counterButton: {
        paddingHorizontal: 10,
    },
    cabinOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cabinText: {
        fontSize: 16,
        fontWeight: '300',
    },
    selectedCabinText: {
        fontWeight: 'bold',
    },
    doneButtonOptions: {
        backgroundColor: '#00BDD5',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginTop: 20,
    },
    doneButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoundTrip;