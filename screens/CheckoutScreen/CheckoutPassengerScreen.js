import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,Picker, ScrollView, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CheckoutPassengerScreen = () => {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState("");
    const route = useRoute();
    const { flight, travellers, cabinType, tripType, departDay, returnDay, adults, children, infants, price } = route.params;

    return (
        <ScrollView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Traveller information</Text>
          </View>
    
          {/* Step Progress */}
          <View style={styles.stepContainer}>
            <MaterialCommunityIcons name="account" size={24} color="#00aaff" />
            <View style={styles.stepDividerActive} />
            <MaterialCommunityIcons name="suitcase" size={24} color="#ccc" />
            <View style={styles.stepDivider} />
            <MaterialCommunityIcons name="credit-card" size={24} color="#ccc" />
          </View>
    
          {/* Traveller Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Traveller: 1 adult</Text>
            <TextInput
              style={styles.input}
              placeholder="First name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={styles.input}
              placeholder="Last name"
              value={lastName}
              onChangeText={setLastName}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => setGender(itemValue)}
              >
                <Picker.Item label="Select option" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Other" value="other" />
              </Picker>
            </View>
          </View>
    
          {/* Contact Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact details</Text>
            <TextInput
              style={styles.input}
              placeholder="Your email"
              keyboardType="email-address"
              value={contactEmail}
              onChangeText={setContactEmail}
            />
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>+07</Text>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone number"
                keyboardType="phone-pad"
                value={contactPhone}
                onChangeText={setContactPhone}
              />
            </View>
          </View>
    
          {/* Price and Button */}
          <View style={styles.footer}>
            <Text style={styles.totalPrice}>$806</Text>
            <Text style={styles.priceSubText}>1 adult</Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={() => navigation.navigate("NextScreen")}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 16,
      },
      backButton: {
        marginRight: 8,
      },
      headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
      },
      stepContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
      },
      stepDivider: {
        width: 40,
        height: 2,
        backgroundColor: "#ccc",
        marginHorizontal: 4,
      },
      stepDividerActive: {
        width: 40,
        height: 2,
        backgroundColor: "#00aaff",
        marginHorizontal: 4,
      },
      section: {
        padding: 16,
      },
      sectionTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 12,
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
      phoneInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
      },
      countryCode: {
        fontSize: 16,
        marginRight: 8,
      },
      phoneInput: {
        flex: 1,
        height: 48,
      },
      footer: {
        padding: 16,
        alignItems: "center",
      },
      totalPrice: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
      },
      priceSubText: {
        fontSize: 14,
        color: "#555",
        marginBottom: 16,
      },
      nextButton: {
        backgroundColor: "#00aaff",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
      },
      nextButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
    });
    
    export default CheckoutPassengerScreen;