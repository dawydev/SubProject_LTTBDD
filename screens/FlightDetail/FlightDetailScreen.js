import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FlightDetailScreen = ({ route }) => {
  const { flight } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết chuyến bay</Text>
      <Text style={styles.detail}>Từ: {flight.depart.fromCode}</Text>
      <Text style={styles.detail}>Đến: {flight.depart.toCode}</Text>
      <Text style={styles.detail}>Hãng: {flight.depart.airline}</Text>
      <Text style={styles.detail}>Giờ khởi hành: {flight.depart.departTime}</Text>
      <Text style={styles.detail}>Giờ đến: {flight.depart.arriveTime}</Text>
      <Text style={styles.detail}>Thời gian bay: {flight.depart.duration}</Text>
      <Text style={styles.detail}>Số điểm dừng: {flight.depart.stops}</Text>
      <Text style={styles.detail}>Giá: {flight.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default FlightDetailScreen;