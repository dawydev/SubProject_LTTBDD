import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

// Định dạng ngày với thứ viết tắt, tháng viết tắt và ngày
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

const CheckoutPaymentSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, price, travelerDetails } = route.params;

  // Chuyển đổi departDay và returnDay thành đối tượng Date
  const departDate = new Date(departDay);
  const returnDate = new Date(returnDay);

  return (
    <View style={styles.container}>
    <ImageBackground source={require('../../assets/img/background.png')} style={styles.backgroundImage}>
      {/* Header */}
      <View style={styles.header}>
        
      </View>

      {/* Flight Details Card */}
        <View style={styles.card}>
          {/* Success Message */}
          <View style={styles.successContainer}>
            <MaterialCommunityIcons name="check-circle-outline" size={55} color="#834216" />
            <Text style={styles.successText}>Booking Successful!</Text>
          </View>
          <View style={styles.flightCodesContainer}>
            <View style={styles.flightCodeContainer}>
              <Text style={styles.cardText}>{flight.depart.fromCode}</Text>
              <Text style={styles.dateText}>{formatDate(departDate)}</Text>
            </View>
            <AntDesign name="swap" size={24} color="#000" style={styles.swapIcon} />
            <View style={styles.flightCodeContainer}>
              <Text style={styles.cardText}>{flight.depart.toCode}</Text>
              <Text style={styles.dateText}>{formatDate(returnDate)}</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Traveller</Text>
              <Text style={styles.detailText}>{travelerDetails.map(traveller => `${traveller.firstName} ${traveller.lastName}`).join(', ')}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Class</Text>
              <Text style={styles.detailText}>{cabinType}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.detailTitle}>Flight</Text>
              <Text style={styles.detailText}>{tripType}</Text>
            </View>
          </View>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.priceText}>${price}</Text>
          </View>
          {/* Booking Detail Button */}
      <View style={styles.bookingDetailButtonContainer}>
        <TouchableOpacity style={styles.bookingDetailButton} onPress={() => navigation.navigate('BookingDetail', { 
          flight, 
          travellers, 
          cabinType, 
          tripType, 
          departDay, 
          returnDay, 
          price, 
          travelerDetails 
        })}>
          <Text style={styles.bookingDetailButtonText}>Booking Details</Text>
        </TouchableOpacity>
      </View>

      {/* Home Button */}
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.homeButtonText}>Home</Text>
        </TouchableOpacity>
      </View>
        </View>
      </ImageBackground>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16, 
    marginTop: 40, 
  },
  backButton: { 
    marginRight: 8 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successContainer: {
    alignItems: 'center',
    marginVertical: 20,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingBottom: 20,
    width: '100%',
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  successSubText: {
    fontSize: 16,
    color: '#555',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    marginVertical: 20,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flightCodesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 15,
  },
  flightCodeContainer: {
    alignItems: 'center',
  },
  swapIcon: {
    marginHorizontal: 10,
  },
  cardText: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 15,
  },
  detailContainer: {
    flex: 1,
    alignItems: 'center',
  },
  detailTitle: {
    color: '#555',
    fontSize: 16,
    fontWeight: '400',
  },
  detailText: {
    fontSize: 23,
    marginTop: 5,
    fontWeight: 'thin',
    color: '#000',
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    padding: 15,
  },
  bookingDetailButtonContainer: {
    marginTop: 10,
    width: '100%',
  },
  bookingDetailButton: {
    height: 70,
    backgroundColor: '#00BDD5',
    paddingVertical: 1,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingDetailButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 20,
  },
  homeButtonContainer: {
    marginTop: 10,
  },
  homeButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#00BDD5',
    fontWeight: '600',
    fontSize: 20,
  },
});

export default CheckoutPaymentSuccessScreen;