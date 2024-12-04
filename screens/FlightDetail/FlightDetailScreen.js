import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const FlightDetailScreen = ({ route }) => {
  const { flight, travellers, cabinType, tripType } = route.params;
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flight details</Text>
      </View>

      {/* Trip Info */}
      <View style={styles.tripInfo}>
        <Text style={styles.tripInfoText}>Your trip to {flight.depart.country} from {flight.return.country}</Text>
      </View>

      {/* Trip summary */}
      <View style={styles.tripSummary}>
        <Text style={styles.tripTitle}>Your trip to {flight.depart.toCode}</Text>
        <Text style={styles.tripSubtitle}>{flight.depart.fromCode} - {flight.depart.toCode}</Text>
        <Text style={styles.tripDate}>{flight.depart.departTime} - {flight.depart.arriveTime}</Text>
        <Text style={styles.tripInfo}>{flight.depart.stops} stop • {flight.depart.duration}</Text>
      </View>

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <Text style={styles.infoText}>Travellers: {travellers}</Text>
        <Text style={styles.infoText}>Cabin Type: {cabinType}</Text>
        <Text style={styles.infoText}>Trip Type: {tripType}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tripInfo: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  tripInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tripSummary: {
    padding: 16,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tripSubtitle: {
    fontSize: 16,
    color: '#555',
  },
  tripDate: {
    fontSize: 14,
    color: '#777',
  },
  tripInfo: {
    fontSize: 14,
    color: '#777',
  },
  additionalInfo: {
    padding: 16,
    backgroundColor: '#e0e0e0',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default FlightDetailScreen;