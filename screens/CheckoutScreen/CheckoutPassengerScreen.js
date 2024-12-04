import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutPassengerScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
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
    departPlaneCode,
    returnPlaneCode,
    seats
  } = route.params;

  const [travelerDetails, setTravelerDetails] = useState(
    Array(travellers).fill({
      firstName: "",
      lastName: "",
      gender: "",
    })
  );

  const [contactDetails, setContactDetails] = useState({
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({
    travelers: Array(travellers).fill({
      firstName: false,
      lastName: false,
      gender: false,
    }),
    contact: {
      email: false,
      phoneNumber: false,
    },
  });

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...travelerDetails];
    updatedDetails[index][field] = value;
    setTravelerDetails(updatedDetails);

    // Clear the error if field is filled
    if (value.trim() !== "") {
      const updatedErrors = { ...errors };
      updatedErrors.travelers[index][field] = false;
      setErrors(updatedErrors);
    }
  };

  const handleContactChange = (field, value) => {
    setContactDetails({ ...contactDetails, [field]: value });

    // Clear the error if field is filled
    if (value.trim() !== "") {
      const updatedErrors = { ...errors };
      updatedErrors.contact[field] = false;
      setErrors(updatedErrors);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    // Validate traveler details
    const updatedTravelerErrors = errors.travelers.map((err, index) => {
      const newErr = { ...err };
      if (travelerDetails[index].firstName.trim() === "") {
        newErr.firstName = true;
        isValid = false;
      }
      if (travelerDetails[index].lastName.trim() === "") {
        newErr.lastName = true;
        isValid = false;
      }
      if (!travelerDetails[index].gender) {
        newErr.gender = true;
        isValid = false;
      }
      return newErr;
    });

    // Validate contact details
    const updatedContactErrors = { ...errors.contact };
    if (contactDetails.email.trim() === "") {
      updatedContactErrors.email = true;
      isValid = false;
    }
    if (contactDetails.phoneNumber.trim() === "") {
      updatedContactErrors.phoneNumber = true;
      isValid = false;
    }

    setErrors({
      travelers: updatedTravelerErrors,
      contact: updatedContactErrors,
    });

    return isValid;
  };

  const handleNext = () => {
    if (validateInputs()) {
      navigation.navigate('CheckoutBaggageScreen', {
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
        departPlaneCode,
        returnPlaneCode,
        seats // Truyền thêm seats
          });
    } else {
      console.log("Please fill in all required fields.");
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
            <MaterialCommunityIcons name="bag-suitcase" size={24} color="#ccc" />
            <View style={styles.stepDivider} />
            <MaterialCommunityIcons name="seat" size={24} color="#ccc" />
            <View style={styles.stepDivider} />
            <MaterialCommunityIcons name="credit-card" size={24} color="#ccc" />
        </View>
      </View>
      
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Traveller Information</Text>
      </View>
      {/* Traveller Information Sections */}
      {travelerDetails.map((traveler, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>Traveller {index + 1}</Text>
          <TextInput
            style={[
              styles.input,
              errors.travelers[index].firstName && styles.inputError,
            ]}
            placeholder="First name"
            value={traveler.firstName}
            onChangeText={(text) => handleInputChange(index, "firstName", text)}
          />
          {errors.travelers[index].firstName && <Text style={styles.errorText}>First name is required</Text>}

          <TextInput
            style={[
              styles.input,
              errors.travelers[index].lastName && styles.inputError,
            ]}
            placeholder="Last name"
            value={traveler.lastName}
            onChangeText={(text) => handleInputChange(index, "lastName", text)}
          />
          {errors.travelers[index].lastName && <Text style={styles.errorText}>Last name is required</Text>}

          <View
            style={[
              styles.pickerContainer,
              errors.travelers[index].gender && styles.inputError,
            ]}
          >
            <Picker
              selectedValue={traveler.gender}
              onValueChange={(value) => handleInputChange(index, "gender", value)}
            >
              <Picker.Item label="Select option" value="" />
              <Picker.Item label="Male" value="male" />
              <Picker.Item label="Female" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
          </View>
          {errors.travelers[index].gender && <Text style={styles.errorText}>Gender is required</Text>}
        </View>
      ))}

      {/* Contact Details Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <TextInput
          style={[
            styles.input,
            errors.contact.email && styles.inputError,
          ]}
          placeholder="Email"
          value={contactDetails.email}
          onChangeText={(text) => handleContactChange("email", text)}
        />
        {errors.contact.email && <Text style={styles.errorText}>Email is required</Text>}

        <TextInput
          style={[
            styles.input,
            errors.contact.phoneNumber && styles.inputError,
          ]}
          placeholder="Phone Number"
          value={contactDetails.phoneNumber}
          onChangeText={(text) => handleContactChange("phoneNumber", text)}
        />
        {errors.contact.phoneNumber && <Text style={styles.errorText}>Phone number is required</Text>}
      </View>

      {/* Price and Next Button */}
      <View style={styles.nextButtonContainer}>
        <View style={{ flexDirection: 'column' }}>
          <Text style={styles.textPrice}>{price}</Text>
          <Text style={{ color: '#555', fontSize: 17, marginLeft: 10 }}>Total price</Text>
        </View>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { 
    flexDirection: "row", 
    alignItems: "center", 
    padding: 16,
    marginTop: 20, 

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
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
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

export default CheckoutPassengerScreen;