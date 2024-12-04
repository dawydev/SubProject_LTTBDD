import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const flightData = [
  {
    id: '1',
    depart: {
      departTime: '6:30 AM',
      arriveTime: '2:00 PM',
      duration: '7h30m',
      stops: '1 stop',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'SkyHaven',
      fromCode: 'LHR', // London Heathrow
      toCode: 'JFK', // New York JFK
    },
    return: {
      departTime: '10:00 PM',
      arriveTime: '10:15 AM',
      duration: '7h15m',
      stops: 'Direct',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'EcoWings',
      fromCode: 'JFK', // New York JFK
      toCode: 'LHR', // London Heathrow
    },
    price: '$806',
  },
  {
    id: '2',
    depart: {
      departTime: '3:15 PM',
      arriveTime: '6:05 PM',
      duration: '7h50m',
      stops: 'Direct',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'CC Air',
      fromCode: 'LHR', // London Heathrow
      toCode: 'JFK', // New York JFK
    },
    return: {
      departTime: '6:30 PM',
      arriveTime: '6:30 AM',
      duration: '7h00m',
      stops: 'Direct',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'Fendi Air',
      fromCode: 'JFK', // New York JFK
      toCode: 'LHR', // London Heathrow
    },
    price: '$964',
  },
  {
    id: '3',
    depart: {
      departTime: '3:15 PM',
      arriveTime: '7:50 PM',
      duration: '7h30m',
      stops: 'Direct',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'EcoWings',
      fromCode: 'LHR', // London Heathrow
      toCode: 'JFK', // New York JFK
    },
    return: {
      departTime: '7:55 AM',
      arriveTime: '2:55 PM',
      duration: '6h40m',
      stops: 'Direct',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'EcoWings',
      fromCode: 'JFK', // New York JFK
      toCode: 'LHR', // London Heathrow
    },
    price: '$964',
  },
];

const SearchResultScreen = () => {
  const route = useRoute();
  const { fromCity, toCity, departDay, returnDay, adults, children, infants, selectedCabin } = route.params;

  const [favoriteFlights, setFavoriteFlights] = useState({});

  const toggleFavorite = (id) => {
    setFavoriteFlights((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity style={styles.flightCard} onPress={() => console.log('Flight selected', item.id)}>
      <View style={styles.flightRow}>
        <Image source={{ uri: item.depart.airportIconImg }} style={styles.airportIcon} />
        <View style={{ flex: 1 }}>
          <View style={styles.flightRow}>
            <Text style={styles.timeText}>{item.depart.departTime}</Text>
            <Text style={styles.timeText}>—</Text>
            <Text style={styles.timeText}>{item.depart.arriveTime}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.durationText}>{item.depart.duration}</Text>
            </View>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.codeText}>{item.depart.fromCode}</Text>
            <Text style={styles.codeText}>—</Text>
            <Text style={styles.codeText}>{item.depart.toCode}</Text>
            <Text style={styles.airlineText}>{item.depart.airline}, {item.depart.stops}</Text>
          </View>
        </View>
      </View>
  
      <View style={styles.flightRow}>
        <Image source={{ uri: item.return.airportIconImg }} style={styles.airportIcon} />
        <View style={{ flex: 1 }}>
          <View style={styles.flightRow}>
            <Text style={styles.timeText}>{item.return.departTime}</Text>
            <Text style={styles.timeText}>—</Text>
            <Text style={styles.timeText}>{item.return.arriveTime}</Text>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.durationText}>{item.return.duration}</Text>
            </View>
          </View>
          <View style={styles.flightRow}>
            <Text style={styles.codeText}>{item.return.fromCode}</Text>
            <Text style={styles.codeText}>—</Text>
            <Text style={styles.codeText}>{item.return.toCode}</Text>
            <Text style={styles.airlineText}>{item.return.airline}, {item.return.stops}</Text>
          </View>
        </View>
      </View>
  
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: 'gray' }}>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ marginRight: 'auto', marginTop: 10 }}>
          <MaterialCommunityIcons
            name="heart"
            size={27}
            color={favoriteFlights[item.id] ? 'red' : 'gray'}
          />
        </TouchableOpacity>
        <Text style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 10 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.routeText}>{fromCity} - {toCity}</Text>
        <Text style={styles.detailsText}>{departDay.toString()} - {returnDay.toString()}, {adults + children + infants} traveller(s)</Text>
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
    marginBottom: 5,
  },
  timeText: {
    marginLeft: '10',
    fontSize: 20,
    fontWeight: 'bold',
  },
  durationText: {
    color: '#919398',
    fontSize: 14,
  },
  codeText: {
    fontSize: 14,
    color: '#919398',
    marginRight: 10,
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
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  airportIcon: {
    width: 50,
    height: 50,
  },
});

export default SearchResultScreen;