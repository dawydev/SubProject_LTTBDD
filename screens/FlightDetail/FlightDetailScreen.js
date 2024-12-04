import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

const FlightDetailScreen = ({ route }) => {
  const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants } = route.params;
  const navigation = useNavigation();
  const [showFeatures, setShowFeatures] = useState(false); // State để quản lý việc hiển thị tiện ích


  const formattedDepartDay = formatDate(new Date(departDay)); // Định dạng ngày đi
  const formattedReturnDay = formatDate(new Date(returnDay)); // Định dạng ngày về

  // Hàm dùng để hiển thị thông tin chuyến bay (có thể dùng cho cả chuyến đi và chuyến về)
  const renderFlightInfo = (title, flightDetails, date, flightId) => (
    <View style={styles.flightSection}>
      {/* Tiêu đề chuyến bay (ví dụ: "Departure Flight" hoặc "Return Flight") */}
      <Text style={styles.flightTitle}>{title}</Text>

      {/* Thông tin tuyến đường và thời gian bay */}
      <View style={styles.flightRow}>
        <Text style={styles.flightRoute}>
        {flightDetails.departTime}        
        </Text>
        {/* Duration & stop */}
        <View style={{flexDirection: 'column'}}>
            <Text style={styles.flightDuration}>
            {flightDetails.stops} 
            </Text>
            <Text style={styles.flightDuration}>
            {flightDetails.duration}
            </Text>
        </View>
        <Text style={styles.flightRoute}>
            {flightDetails.arriveTime}
        </Text>
        
      </View>

      {/* Giờ khởi hành, giờ đến và ngày bay */}
      <View style={styles.flightRow}>
        <Text style={styles.flightDate}>{formattedDepartDay}</Text>
        <Text style={styles.flightDate}>{formattedReturnDay}</Text>
      </View>

     {/* Nút More Info / Less Info */}
     <TouchableOpacity onPress={() => setShowFeatures(prev => ({ ...prev, [flightId]: !prev[flightId] }))} style={styles.moreInfoButtonContainer}>
        <Text style={styles.moreInfoButton}>
          {showFeatures[flightId] ? "Less Info" : "More Info"}
        </Text>
      </TouchableOpacity>

      {/* Các tiện ích của chuyến bay */}
      {showFeatures[flightId] && (
        <View style={styles.flightFeatures}>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="seat-recline-extra" size={18} color="#000" />
            <Text style={styles.featureText}>28" seat pitch</Text>
          </View>
          <View style={styles.feature}>
            <FontAwesome name="cutlery" size={18} color="#000" />
            <Text style={styles.featureText}>Light meal</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="wifi" size={18} color="#000" />
            <Text style={styles.featureText}>Chance of WiFi</Text>
          </View>
          <View style={styles.feature}>
            <MaterialCommunityIcons name="power-plug-off" size={18} color="#000" />
            <Text style={styles.featureText}>No power outlet</Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header của màn hình chi tiết chuyến bay */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight details</Text>
      </View>

      {/* Thông tin tổng quan về chuyến đi */}
      <View style={styles.tripInfo}>
        <Text style={styles.tripInfoText}>
          <View style={{flexDirection: 'column'}}>
            <Text style={styles.tripInfoText}>Your trip to {flight.depart.country} </Text>
            <Text style={styles.tripInfoText1}>from {flight.depart.country} </Text>
          </View>
        </Text>
        <View style={styles.tripDatesContainer}>
          <Text style={styles.tripDates}>
            {formattedDepartDay} - {formattedReturnDay}
          </Text>
        </View>
        <View style={styles.tripDetailsContainer}>
          <Text style={styles.tripDetails}>
            <MaterialCommunityIcons 
              name={
                adults + children + infants > 2 
                ? "account-group" 
                : adults + children + infants === 2 
                ? "account-multiple" 
                : "account"
              } 
              size={20} 
              color="#000" 
            /> {travellers} traveller • 
            <MaterialCommunityIcons 
              name={
                cabinType === "Economy"
                ? "seat-passenger"
                : cabinType === "Premium Economy"
                ? "seat-passenger"
                : cabinType === "Business"
                ? "briefcase-outline"
                : "star-outline"
              } 
              size={20} 
              color="#000" 
            /> {cabinType} • 
            <MaterialCommunityIcons name="airplane" size={20} color="#000" /> {tripType}
          </Text>
        </View>
      </View>

      {/* Hiển thị thông tin chuyến đi (departure flight) */}
      {renderFlightInfo("Departure Flight", flight.depart, formattedDepartDay)}

      {/* Hiển thị thông tin chuyến về (return flight) */}
      {renderFlightInfo("Return Flight", flight.return, formattedReturnDay)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  header: {
    flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1, // Đường kẻ dưới header
    borderBottomColor: '#ddd',
    marginTop: 20, // Khoảng cách giữa header và nội dung
  },
  backButton: {
    marginRight: 16, // Khoảng cách giữa nút "Back" và tiêu đề
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold', // Chữ đậm
  },
  tripInfo: {
    padding: 16,
    backgroundColor: 'white', // Màu nền nhạt để phân biệt
  },
  tripInfoText: {
    fontSize: 23,
    fontWeight: '700',
    marginBottom: 4, // Khoảng cách phía dưới
  },
  tripInfoText1: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 4, // Khoảng cách phía dưới
    color: '#9E9E9E', // Màu xám nhạt
  },
  tripDates: {
    fontSize: 21,
    fontWeight: '600',
    color: 'white', // Màu xám nhẹ
    marginBottom: 4,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  tripDatesContainer: {
    marginTop: 10,
    backgroundColor: '#313842',
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 5,
  },
  tripDetailsContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderTopWidth: 0.4,
    borderBottomWidth: 0.4,
    padding: 15,
    marginTop: 20,
  },
  tripDetails: {
    fontSize: 18,
    color: '#555',
    justifyContent: 'space-between',
  },
  flightSection: {
    padding: 16,
    borderWidth: 1, // Đường kẻ viền
    backgroundColor: 'white', 
    width: 500,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    borderColor: '#ddd',
  },
  flightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flightRow: {
    flexDirection: 'row', // Sắp xếp các phần tử theo hàng ngang
    justifyContent: 'space-between', // Cách đều các phần tử
    marginBottom: 4,
  },
  flightRoute: {
    fontSize: 27,
    fontWeight: 'bold',
  },
  flightDuration: {
    fontSize: 14,
    color: '#777',
  },
  flightTime: {
    fontSize: 14,
    color: '#555',
  },
  flightDate: {
    fontSize: 18,
    color: 'black',
    fontWeight: '400',
  },
  moreInfoButton: {
    fontSize: 16,
    color: '#007BFF',
    marginTop: 10,
    alignSelf: 'center',
  },
  flightFeatures: {
    flexDirection: 'row', // Sắp xếp các tiện ích thành hàng
    flexWrap: 'wrap', // Nếu tiện ích dài quá, sẽ xuống dòng
    marginTop: 8,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16, // Khoảng cách giữa các tiện ích
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 4, // Khoảng cách giữa icon và text
  },
  moreInfoButtonContainer: {
    justifyContent: 'center', // Căn giữa nút More Info
    alignSelf: 'center',
    alignItems: 'center', // Căn giữa nút More Info
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    width: '100%',
  },
});

export default FlightDetailScreen;