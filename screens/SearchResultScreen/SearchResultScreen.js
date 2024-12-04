import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import a from '@ant-design/react-native/lib/modal/alert';

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
      country: 'United States',
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
      country: 'United Kingdom',
    },
    price: '$654',
  },
  {
    id: '2',
    depart: {
      departTime: '3:15 PM',
      arriveTime: '6:05 PM',
      duration: '7h50m',
      stops: '2 stop',
      airportIconImg: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Approve_icon.svg/900px-Approve_icon.svg.png',
      airline: 'CC Air',
      fromCode: 'LHR', // London Heathrow
      toCode: 'JFK', // New York JFK
      country: 'United States',
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
      country: 'United Kingdom',
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
      country: 'United States',
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
      country: 'United Kingdom',
    },
    price: '$964',
  },
];

const SearchResultScreen = () => {
  const route = useRoute();
  const { fromCity, toCity, departDay, returnDay, adults, children, infants, cabinType, tripType } = route.params;
  const navigation = useNavigation();
  const [favoriteFlights, setFavoriteFlights] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Best");
  const [selectedStops, setSelectedStops] = useState("Any stops");
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [filteredData, setFilteredData] = useState(flightData);
  const stopsOptions = ["Any stops", "1 stop or nonstop", "Nonstop only"];
  const airlinesOptions = ["SkyHaven", "EcoWings", "AirFly"];

  const travellers = adults + children + infants;

  const toggleFavorite = (id) => {
    setFavoriteFlights((prevFavorites) => {
      const updatedFavorites = {
        ...prevFavorites,
        [id]: !prevFavorites[id],
      };
      return updatedFavorites;
    });
  };

  const toggleAirline = (airline) => {
    setSelectedAirlines((prev) =>
      prev.includes(airline)
        ? prev.filter((item) => item !== airline)
        : [...prev, airline]
    );
  };

  const handleClearAll = () => {
    setSelectedSort("Best");
    setSelectedStops("Any stops");
    setSelectedAirlines([]);
    setFilteredData(flightData);
  };

  const handleApply = () => {
    let data = [...flightData];

    // Lọc theo giá
    if (selectedSort === "Cheap") {
      data = data.filter(item => parseFloat(item.price.replace('$', '')) < 700);
    }

    // Lọc theo số điểm dừng
    if (selectedStops === "1 stop or nonstop") {
      data = data.filter(item => item.depart.stops === 'Direct' || item.depart.stops === '1 stop');
    } else if (selectedStops === "Nonstop only") {
      data = data.filter(item => item.depart.stops === 'Direct');
    }

    // Lọc theo hãng hàng không
    if (selectedAirlines.length > 0) {
      data = data.filter(item => selectedAirlines.includes(item.depart.airline));
    }

    setFilteredData(data);
    setModalVisible(false);
  };

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity style={styles.flightCard} onPress={() => navigation.navigate('FlightDetailScreen', { 
      flight: item, 
      travellers, 
      cabinType, 
      tripType, 
      departDay, 
      returnDay // Truyền thêm departDay và returnDay
    })}>
      <View style={styles.flightRow}>
        <Image source={{ uri: item.depart.airportIconImg }} style={styles.airportIcon} />
        <View style={{ flex: 1, marginLeft: 10 }}>
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
            <Text style={styles.codeText}> — </Text>
            <Text style={styles.codeText}>{item.depart.toCode} {item.depart.airline}</Text>
            <Text style={styles.airlineText}> {item.depart.stops}</Text>
          </View>
        </View>
      </View>

      <View style={styles.flightRow}>
        <Image source={{ uri: item.return.airportIconImg }} style={styles.airportIcon} />
        <View style={{ flex: 1, marginLeft: 10 }}>
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
            <Text style={styles.codeText}> — </Text>
            <Text style={styles.codeText}>{item.return.toCode} {item.return.airline}</Text>
            <Text style={styles.airlineText}>, {item.return.stops}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderColor: 'gray' }}>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={{ marginRight: 'auto', marginTop: 10 }}>
          <MaterialCommunityIcons name="heart" size={27} color={favoriteFlights[item.id] ? 'red' : 'gray'} />
        </TouchableOpacity>
        <Text style={{ marginLeft: 'auto', fontSize: 18, fontWeight: 'bold', color: '#000', marginTop: 10 }}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.routeText}>{fromCity} - {toCity}</Text>
        <Text style={styles.detailsText}>{departDay.toString()} - {returnDay.toString()}, {travellers} traveller(s)</Text>
      </View>

      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setModalVisible(true)}>
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
        data={filteredData}
        renderItem={renderFlightItem}
        keyExtractor={(item) => item.id}
      />

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort & Filters</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <MaterialCommunityIcons name="close" size={27} color="#919398" />
            </TouchableOpacity>

            {/* Sort By */}
            <Text style={styles.sectionTitle}>Sort by</Text>
            {["Best", "Cheap", "Fast"].map((sortOption) => (
              <TouchableOpacity key={sortOption} style={styles.cabinOption} onPress={() => setSelectedSort(sortOption)}>
                <Text style={[styles.cabinText, selectedSort === sortOption && styles.selectedCabinText]}>
                  {sortOption}
                </Text>
                {selectedSort === sortOption && (
                  <MaterialCommunityIcons name="check" size={20} color="#000" />
                )}
              </TouchableOpacity>
            ))}

            {/* Stops */}
            <Text style={styles.sectionTitle}>Stops</Text>
            {stopsOptions.map((option) => (
              <TouchableOpacity key={option} style={styles.cabinOption} onPress={() => setSelectedStops(option)}>
                <Text style={[styles.cabinText, selectedStops === option && styles.selectedCabinText]}>
                  {option}
                </Text>
                {selectedStops === option && (
                  <MaterialCommunityIcons name="check" size={20} color="#000" />
                )}
              </TouchableOpacity>
            ))}

            {/* Airlines */}
            <Text style={styles.sectionTitle}>Airlines</Text>
            <TouchableOpacity style={styles.cabinOption} onPress={() => {
              if (selectedAirlines.length === airlinesOptions.length) {
                setSelectedAirlines([]);
              } else {
                setSelectedAirlines(airlinesOptions);
              }
            }}>
              <Text style={[styles.cabinText, selectedAirlines.length === airlinesOptions.length && styles.selectedCabinText]}>
                Select all
              </Text>
              {selectedAirlines.length === airlinesOptions.length && (
                <MaterialCommunityIcons name="check" size={20} color="#000" />
              )}
            </TouchableOpacity>
            {airlinesOptions.map((airline) => (
              <TouchableOpacity key={airline} style={styles.cabinOption} onPress={() => toggleAirline(airline)}>
                <Text style={[styles.cabinText, selectedAirlines.includes(airline) && styles.selectedCabinText]}>
                  {airline}
                </Text>
                {selectedAirlines.includes(airline) && (
                  <MaterialCommunityIcons name="check" size={20} color="#000" />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  flightRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  timeText: {
    fontSize: 22,
    fontWeight: '600',
    marginRight: 10,
  },
  durationText: {
    color: '#919398',
    fontSize: 18,
  },
  codeText: {
    fontSize: 18,
    color: '#919398',
  },
  airlineText: {
    color: '#919398',
    marginBottom: 5,
    marginLeft: 'auto',
    fontSize: 18,
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
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  cabinOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dcdcdc',
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cabinText: {
    fontSize: 14,
    color: '#000',
  },
  selectedCabinText: {
    fontWeight: 'bold',
    color: 'black',
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchResultScreen;
