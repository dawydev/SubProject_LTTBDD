import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutPaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants, price, travelerDetails = [], contactDetails = {}, cabinBag, checkedBag, travelProtection, departPlaneCode, returnPlaneCode, selectedSeat, seatPrice } = route.params;

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const paymentMethods = [
    { name: "Visa", icon: require('../../assets/img/visa.png'), cardNumber: "**** **** **** 1234" },
    { name: "MasterCard", icon: require('../../assets/img/mastercard.png'), cardNumber: "**** **** **** 5678" },
  ];

  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPayment = () => {
    // Thực hiện logic xác nhận thanh toán ở đây
    alert('Payment confirmed');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* Payment Method */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        {paymentMethods.map((method) => (
          <TouchableOpacity key={method.name} style={styles.paymentMethod} onPress={() => handlePaymentMethodSelect(method.name)}>
            <Image source={method.icon} style={styles.paymentIcon} resizeMode="contain" />
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentMethodText}>{method.name}</Text>
              <Text style={styles.cardNumberText}>{method.cardNumber}</Text>
            </View>
            {selectedPaymentMethod === method.name && (
              <MaterialCommunityIcons name="check-circle" size={24} color="#00BDD5" />
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.newCardButton} onPress={() => alert('Add new card')}>
          <MaterialCommunityIcons name="plus-circle-outline" size={24} color="#00BDD5" />
        </TouchableOpacity>
      </View>

      {/* Traveller Detail */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Traveller Detail</Text>
        {travelerDetails.map((traveller, index) => (
          <Text key={index} style={styles.detailText}>{traveller.firstName} {traveller.lastName} ({traveller.gender})</Text>
        ))}
      </View>

      {/* Contact Detail */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Detail</Text>
        <Text style={styles.detailText}>Email: {contactDetails.email}</Text>
        <Text style={styles.detailText}>Phone: {contactDetails.phoneNumber}</Text>
      </View>

      {/* Confirm Button */}
      <View style={styles.confirmButtonContainer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
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
  flightInfoContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  flightInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    marginBottom: 10,
  },
  paymentIcon: {
    width: 40,
    height: 40,
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 10,
  },
  paymentMethodText: {
    fontSize: 16,
  },
  cardNumberText: {
    fontSize: 14,
    color: '#555',
  },
  newCardButton: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00BDD5',
    borderRadius: 5,
    alignItems: 'center',
  },
  newCardButtonText: {
    fontSize: 16,
    color: '#00BDD5',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
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