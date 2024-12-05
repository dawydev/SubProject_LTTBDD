import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BookingDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, price, travelerDetails } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      {/* Flight Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flight Information</Text>
        <Text style={styles.sectionText}>From: {flight.depart.fromCode}</Text>
        <Text style={styles.sectionText}>To: {flight.depart.toCode}</Text>
        <Text style={styles.sectionText}>Depart Date: {departDay}</Text>
        <Text style={styles.sectionText}>Return Date: {returnDay}</Text>
      </View>

      {/* Traveller Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traveller Information</Text>
        {travelerDetails.map((traveller, index) => (
          <Text key={index} style={styles.sectionText}>{traveller.firstName} {traveller.lastName}</Text>
        ))}
      </View>

      {/* Other Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Other Details</Text>
        <Text style={styles.sectionText}>Class: {cabinType}</Text>
        <Text style={styles.sectionText}>Trip Type: {tripType}</Text>
        <Text style={styles.sectionText}>Price: ${price}</Text>
      </View>

      {/* Home Button */}
      <View style={styles.homeButtonContainer}>
        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.homeButtonText}>Home</Text>
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
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 5,
  },
  homeButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  homeButton: {
    backgroundColor: '#00BDD5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default BookingDetail;