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

const CheckoutPaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants, price, travelerDetails, contactDetails, cabinBag, checkedBag, travelProtection, departPlaneCode, returnPlaneCode, selectedSeat, seatPrice } = route.params;

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
          <MaterialCommunityIcons style={{backgroundColor:'#00BDD5', borderRadius: 15, height:25, width: 25}} name="credit-card" size={24} color="white" />
        </View>
      </View>

      {/* Flight Information */}
      <View style={styles.flightInfoContainer}>
        <Text style={styles.flightInfoText}>Flight from {flight.depart.fromCode} to {flight.depart.toCode}</Text>
        <Text style={styles.flightInfoText}>Plane code: {departPlaneCode}</Text>
        <Text style={styles.flightInfoText}>Selected Seat: {selectedSeat}</Text>
        <Text style={styles.flightInfoText}>Total Price: ${price}</Text>
      </View>

      {/* Payment Form */}
      <View style={styles.paymentForm}>
        <Text style={styles.paymentFormTitle}>Payment Details</Text>
        {/* Add your payment form fields here */}
      </View>

      {/* Confirm Button */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={() => {
          // Handle payment confirmation
        }}>
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
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
  flightInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  flightInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentForm: {
    marginVertical: 20,
  },
  paymentFormTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  confirmButtonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmButton: {
    backgroundColor: '#00BDD5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default CheckoutPaymentScreen;