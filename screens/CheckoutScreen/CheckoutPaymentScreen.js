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

  const handleCheckoutPayment = () => {
    navigation.navigate('CheckoutPaymentSuccessScreen', {
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
      departPlaneCode,
      returnPlaneCode,
      selectedSeat,
      seatPrice,
    });
  };

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
          <Text style={styles.newCardButtonText}>New Card +</Text>
        </TouchableOpacity>
      </View>

      {/* Traveller Detail */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Traveller Detail</Text>
        {travelerDetails.map((traveller, index) => (
          <View key={index} style={styles.detailRow}>
            <View style={{width:30}}>
              <MaterialCommunityIcons name="account-outline" size={34} color="#6D6F73" />
            </View>
              <Text style={styles.detailText}>{traveller.firstName} {traveller.lastName} </Text>
              <Text style={styles.detailText}>({traveller.gender})</Text>
          </View>
        ))}
      </View>

      {/* Contact Detail */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Contact Detail</Text>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="email-outline" size={34} color="#6D6F73" />
          <Text style={styles.detailText}>{contactDetails.email}</Text>
        </View>
        <View style={styles.detailRow}>
          <MaterialCommunityIcons name="phone-hangup" size={34} color="#6D6F73" />
          <Text style={styles.detailText}>{contactDetails.phoneNumber}</Text>
        </View>
      </View>

      {/* checkout Button */}
      <View style={styles.checkoutButtonContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textPrice}>${price}</Text>
          <Text style={{ color: '#555', fontSize: 17, marginLeft: 10 }}>Total price</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckoutPayment}>
          <Text style={styles.checkoutButtonText}>Next</Text>
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
    fontSize: 24,
    fontWeight: '500',
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
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.4,
    borderTopColor: '#dcdcdc',
    borderTopWidth: 0.4,
    padding: 20,
  },
  detailText: {
    fontSize: 20,
    marginLeft: 15,
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
  checkoutButtonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 40,
  },
  checkoutButton: {
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
  checkoutButtonText: {
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

export default CheckoutPaymentScreen;