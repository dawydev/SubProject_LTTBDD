import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const flightData = [
  {
    id: '1',
    departTime: '6:30 AM',
    arriveTime: '2:00 PM',
    duration: '7h30m',
    stops: '1 stop',
    airline: 'SkyHaven',
    price: '$806',
    returnDepart: '10:00 PM',
    returnArrive: '10:15 AM',
    returnDuration: '7h15m',
    returnAirline: 'EcoWings',
    returnStops: 'Direct',
  },
  {
    id: '2',
    departTime: '3:15 PM',
    arriveTime: '6:05 PM',
    duration: '7h50m',
    stops: 'Direct',
    airline: 'CC Air',
    price: '$964',
    returnDepart: '6:30 PM',
    returnArrive: '6:30 AM',
    returnDuration: '7h00m',
    returnAirline: 'Fendi Air',
    returnStops: 'Direct',
  },
  {
    id: '3',
    departTime: '3:15 PM',
    arriveTime: '7:50 PM',
    duration: '7h30m',
    stops: 'Direct',
    airline: 'EcoWings',
    price: '$964',
    returnDepart: '7:55 AM',
    returnArrive: '2:55 PM',
    returnDuration: '6h40m',
    returnAirline: 'EcoWings',
    returnStops: 'Direct',
  },
];

const SearchResultScreen = () => {
  const renderFlightItem = ({ item }) => (
    <View style={styles.flightCard}>
      <View style={styles.flightRow}>
        <Text style={styles.timeText}>{item.departTime}</Text>
        <Text style={styles.timeText}>—</Text>
        <Text style={styles.timeText}>{item.arriveTime}</Text>
        <Text style={styles.durationText}>{item.duration}</Text>
      </View>
      <Text style={styles.airlineText}>{item.airline}, {item.stops}</Text>

      <View style={styles.flightRow}>
        <Text style={styles.timeText}>{item.returnDepart}</Text>
        <Text style={styles.timeText}>—</Text>
        <Text style={styles.timeText}>{item.returnArrive}</Text>
        <Text style={styles.durationText}>{item.returnDuration}</Text>
      </View>
      <Text style={styles.airlineText}>{item.returnAirline}, {item.returnStops}</Text>

      <Text style={styles.priceText}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.routeText}>London - New York</Text>
        <Text style={styles.detailsText}>Jul 14 - Jul 17, 1 traveller</Text>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Sort & Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Best</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Stops</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>Time</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={flightData}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  routeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsText: {
    color: '#919398',
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  filterButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
  },
  filterText: {
    fontSize: 14,
    color: '#000',
  },
  flightCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  flightRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  durationText: {
    color: '#919398',
    fontSize: 14,
  },
  airlineText: {
    color: '#919398',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default SearchResultScreen;
