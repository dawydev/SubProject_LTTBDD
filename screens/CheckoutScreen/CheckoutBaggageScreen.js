import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutBaggageScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants, price, travelerDetails, contactDetails, departPlaneCode, returnPlaneCode, seats } = route.params;

  const [cabinBag, setCabinBag] = useState("personal");
  const [checkedBag, setCheckedBag] = useState("noChecked");
  const [travelProtection, setTravelProtection] = useState("noInsurance");

  const handleCabinBagSelection = (selection) => {
    setCabinBag(selection);
    if (selection === "personal") {
      setCheckedBag("noChecked");
      setTravelProtection("noInsurance");
    }
  };

  const handleCheckedBagSelection = (selection) => {
    setCheckedBag(selection);
    if (selection === "1checked") {
      setCabinBag("");
    }
  };

  const handleTravelProtectionSelection = (selection) => {
    if (checkedBag === "1checked") {
      setTravelProtection(selection);
    }
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
          <MaterialCommunityIcons name="seat" size={24} color="#ccc" />
          <View style={styles.stepDivider} />
          <MaterialCommunityIcons name="credit-card" size={24} color="#ccc" />
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Baggage</Text>
      </View>

      {/* Cabin Bags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cabin bags</Text>
        <View>
          <TouchableOpacity style={styles.option} onPress={() => handleCabinBagSelection("personal")}>
            <MaterialCommunityIcons name="bag-personal" size={24} color="#000" />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.optionText}>Personal item only</Text>
              <Text style={styles.subText}>Include per traveller</Text>
            </View>
            <MaterialCommunityIcons name={cabinBag === "personal" ? "radiobox-marked" : "radiobox-blank"} size={24} color="#000" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Checked Bags */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Checked bags</Text>
        <TouchableOpacity style={styles.option} onPress={() => handleCheckedBagSelection("1checked")}>
          <MaterialCommunityIcons name="bag-checked" size={24} color="#000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.optionText}>1 checked bag</Text>
            <Text style={styles.subText}>From $19.99</Text>
          </View>
          <MaterialCommunityIcons name={checkedBag === "1checked" ? "radiobox-marked" : "radiobox-blank"} size={24} color="#000" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => handleCheckedBagSelection("noChecked")}>
          <MaterialCommunityIcons name="bag-suitcase-off" size={24} color="#000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.optionText}>No checked bag</Text>
            <Text style={styles.subText}>$0.00</Text>
          </View>
          <MaterialCommunityIcons name={checkedBag === "noChecked" ? "radiobox-marked" : "radiobox-blank"} size={24} color="#000" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* Travel Protection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel protection</Text>
        <TouchableOpacity style={styles.option} onPress={() => handleTravelProtectionSelection("1checked")}>
          <MaterialCommunityIcons name="shield-check" size={24} color="#000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.optionText}>Checked bag</Text>
            <Text style={styles.subText}>$19.99</Text>
          </View>
          <MaterialCommunityIcons name={travelProtection === "1checked" ? "radiobox-marked" : "radiobox-blank"} size={24} color="#000" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
        {/* Travel Protection Details */}
        <View style={styles.protectionDetails}>
          <Text style={styles.protectionDetailText}>1. Coverage for lost or damaged bags</Text>
          <Text style={styles.protectionDetailText}>2. Reimbursement for delayed bags</Text>
          <Text style={styles.protectionDetailText}>3. 24/7 customer support</Text>
          <Text style={styles.protectionDetailText}>4. Easy claims process</Text>
        </View>
        <TouchableOpacity style={styles.option} onPress={() => handleTravelProtectionSelection("noInsurance")}>
          <MaterialCommunityIcons name="shield-off" size={24} color="#000" />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.optionText}>No insurance</Text>
          </View>
          <MaterialCommunityIcons name={travelProtection === "noInsurance" ? "radiobox-marked" : "radiobox-blank"} size={24} color="#000" style={{ marginLeft: 'auto' }} />
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <View style={styles.nextButtonContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textPrice}>{price}</Text>
          <Text style={{ color: '#555', fontSize: 17, marginLeft: 10 }}>Total price</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('CheckoutSeatScreen', {
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
          seats
        })}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Display travelerDetails and contactDetails */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traveller Details</Text>
        {travelerDetails.map((traveller, index) => (
          <Text key={index} style={styles.detailText}>{traveller.firstName} {traveller.lastName} ({traveller.gender})</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <Text style={styles.detailText}>Email: {contactDetails.email}</Text>
        <Text style={styles.detailText}>Phone: {contactDetails.phoneNumber}</Text>
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
  section: { 
    padding: 16 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "bold", 
    marginBottom: 12 
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  protectionDetails: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  protectionDetailText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  nextButtonContainer: {
    width: '90%',
    marginTop: 10,
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

export default CheckoutBaggageScreen;