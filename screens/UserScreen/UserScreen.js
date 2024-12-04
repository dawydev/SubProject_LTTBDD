import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const UserScreen = ({ route }) => {
  const navigation = useNavigation();
  const { favoriteFlights } = route.params || { favoriteFlights: [] };
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => setShowFavorites(!showFavorites)}>
        <Text style={styles.screenText}>Chuyến bay yêu thích</Text>
      </TouchableOpacity>
      {showFavorites && (
        <FlatList
          data={favoriteFlights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.flightItem}>
              <Text style={styles.flightText}>
                {item.depart.fromCode} - {item.depart.toCode}
              </Text>
              <Text style={styles.airlineText}>
                {item.depart.airline}, {item.price}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  screenText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flightItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  flightText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airlineText: {
    fontSize: 14,
    color: 'gray',
  },
});

export default UserScreen;