import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutSeatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants, price, travelerDetails, contactDetails, cabinBag, checkedBag, travelProtection } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        {/* Step Progress */}
        <View style={styles.stepContainer}>
          <MaterialCommunityIcons style={{backgroundColor:'#00BDD5', borderRadius: 15, height:25, width: 25}} name="account" size={24} color="white" />
          <View style={styles.stepDividerActive} />
          <MaterialCommunityIcons style={{backgroundColor:'#00BDD5', borderRadius: 15, height:25, width: 25}} name="bag-suitcase" size={24} color="white" />
          <View style={styles.stepDividerActive} />
          <MaterialCommunityIcons style={{backgroundColor:'#00BDD5', borderRadius: 15, height:25, width: 25}} name="seat" size={24} color="white" />
          <View style={styles.stepDividerActive} />
          <MaterialCommunityIcons name="credit-card" size={24} color="#ccc" />
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Select Seats</Text>
      </View>

      {/* Flight Information */}
      <View style={styles.flightInfoContainer}>
        <Text style={styles.flightInfoText}>Flight from {flight.depart.fromCode} to {flight.depart.toCode}</Text>
      </View>

      {/* Depart Flight Seat Selection */}
      <View style={styles.flightCard}>
        <Text style={styles.flightCardTitle}>Depart: {flight.depart.fromCode} to {flight.depart.toCode}</Text>
        <View style={styles.selectSeatButtonContainer}>
          <TouchableOpacity style={styles.selectSeatButton} onPress={() => navigation.navigate('CheckoutSelectSeatScreen', { tripType: 'depart', flight, travellers })}>
            <Text style={styles.selectSeatButtonText}>Select Seat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Return Flight Seat Selection */}
      <View style={styles.flightCard}>
        <Text style={styles.flightCardTitle}>Return: {flight.return.fromCode} to {flight.return.toCode}</Text>
        <View style={styles.selectSeatButtonContainer}>
          <TouchableOpacity style={styles.selectSeatButton} onPress={() => navigation.navigate('CheckoutSelectSeatScreen', { tripType: 'return', flight, travellers })}>
            <Text style={styles.selectSeatButtonText}>Select Seat</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textPrice}>{price}</Text>
          <Text style={{ color: '#555', fontSize: 17, marginLeft: 10 }}>Total price</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('CheckoutPaymentScreen', {
          flight,
          travellers,
          cabinType,
          tripType,
          departDay,
          returnDay,
          adults,
          children,
          infants,
          price,
          travelerDetails,
          contactDetails,
          cabinBag,
          checkedBag,
          travelProtection,
        })}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  stepContainer: {
    marginLeft: '22%',
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  stepDivider: { 
    width: 40, 
    height: 2, 
    backgroundColor: "#ccc", 
    marginHorizontal: 4 
  },
  stepDividerActive: {
    width: 40,
    height: 2,
    backgroundColor: "#00aaff",
    marginHorizontal: 4,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 23,
    fontWeight: "bold",
  },
  flightInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  flightInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  flightCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  flightCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  selectSeatButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  selectSeatButton: {
    backgroundColor: '#00BDD5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectSeatButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  nextButtonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 40,
  },
  nextButton: {
    backgroundColor: '#00BDD5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    width: 250,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  textPrice:{
    marginLeft: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000',
  }
});

export default CheckoutSeatScreen;