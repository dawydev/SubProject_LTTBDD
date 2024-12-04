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

const CheckoutSelectSeatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { tripType, flight, travellers, planeCode, seats, cabinType, departDay, returnDay, adults, children, infants, price, travelerDetails, contactDetails, cabinBag, checkedBag, travelProtection, departPlaneCode, returnPlaneCode } = route.params;

  const [selectedSeat, setSelectedSeat] = useState(null);
  const seatPrice = 5.99; // Giá tiền của mỗi ghế

  const handleSeatSelection = (seatId) => {
    const seat = seats.find(s => s.id === seatId);
    if (seat.status === "unavailable") return;

    if (selectedSeat === seatId) {
      setSelectedSeat(null);
    } else {
      setSelectedSeat(seatId);
    }
  };

  const renderSeat = (seat) => {
    const isSelected = selectedSeat === seat.id;
    const isUnavailable = seat.status === "unavailable";

    return (
      <TouchableOpacity
        key={seat.id}
        style={[
          styles.seat,
          isSelected && styles.selectedSeat,
          isUnavailable && styles.unavailableSeat,
        ]}
        onPress={() => handleSeatSelection(seat.id)}
        disabled={isUnavailable}
      >
        {isUnavailable ? (
          <MaterialCommunityIcons name="close" size={24} color="#fff" />
        ) : isSelected ? (
          <MaterialCommunityIcons name="check" size={24} color="#fff" />
        ) : null}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Select Seats</Text>
        </View>

        {/* Flight Information */}
        <View style={styles.flightInfoContainer}>
          <Text style={styles.flightInfoText}>
            {tripType === 'depart' ? `Flight from ${flight.depart.fromCode} to ${flight.depart.toCode}` : `Flight from ${flight.return.fromCode} to ${flight.return.toCode}`}
          </Text>
          <Text style={styles.flightInfoText}>Plane code: {planeCode}</Text>
        </View>

        {/* Seat Legend */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={styles.seat}></View>
            <Text style={styles.legendText}>Available seat</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seat, styles.unavailableSeat]}>
              <MaterialCommunityIcons name="close" size={24} color="#fff" />
            </View>
            <Text style={styles.legendText}>Unavailable seat</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.seat, styles.selectedSeat]}>
              <MaterialCommunityIcons name="check" size={24} color="#fff" />
            </View>
            <Text style={styles.legendText}>Selected seat</Text>
          </View>
        </View>

        {/* Seat Selection */}
        <View style={styles.seatMap}>
          <View style={styles.seatRow}>
            <Text style={styles.seatLabel}></Text>
            {["1", "2", "3", "4"].map((col) => (
              <Text key={col} style={styles.seatLabel}>{col}</Text>
            ))}
          </View>
          {["A", "B", "C", "D", "E", "F"].map((row) => (
            <View key={row} style={styles.seatRow}>
              <Text style={styles.seatLabel}>{row}</Text>
              {["1", "2", "3", "4"].map((col) => renderSeat(seats.find(seat => seat.id === `${row}${col}`)))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      {selectedSeat && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Seat {selectedSeat} - ${seatPrice}</Text>
          <TouchableOpacity style={styles.selectButton} onPress={() => {
            const totalPrice = parseFloat(price) + seatPrice; // Đảm bảo price là số trước khi cộng
            navigation.navigate('CheckoutSeatScreen', {
              flight,
              travellers,
              cabinType,
              tripType,
              departDay,
              returnDay,
              adults,
              children,
              infants,
              price: totalPrice.toFixed(2), // Cộng giá tiền của ghế vào tổng giá
              travelerDetails,
              contactDetails,
              cabinBag,
              checkedBag,
              travelProtection,
              departPlaneCode,
              returnPlaneCode,
              selectedSeat, // Truyền mã số ghế đã chọn
              seatPrice // Truyền giá tiền của ghế
            });
          }}>
            <Text style={styles.selectButtonText}>Select</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  legendItem: {
    alignItems: 'center',
  },
  legendText: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  seatMap: {
    alignItems: 'center',
  },
  seatRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  seatLabel: {
    width: 50,
    height: 50,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  seat: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedSeat: {
    backgroundColor: '#00BDD5',
    borderColor: '#00BDD5',
  },
  unavailableSeat: {
    backgroundColor: '#ccc',
    borderColor: '#ccc',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#00BDD5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
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

export default CheckoutSelectSeatScreen;