import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import OneWayScreen from './OneWayScreen.js';
import RoundTripScreen from './RoundTripScreen.js';
import MultiCityScreen from './MultiCityScreen.js';

const Tab = createMaterialTopTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'black', // Color when tab is active
      tabBarInactiveTintColor: 'gray', // Color when tab is inactive
      tabBarStyle: {
        backgroundColor: 'white',
        width: '100%',
        elevation: 1, // Remove shadow on Android
        shadowOpacity: 0, // Remove shadow on iOS
        borderWidth: 0, // Remove border
      },
      tabBarLabelStyle: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'none',
      },
      tabBarIndicatorStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 3,
      },
    })}
  >
  
      <Tab.Screen
        name="RoundTripScreen"
        component={RoundTripScreen}
        options={{
          tabBarLabel: 'Round-Trip',
        }} />
      <Tab.Screen
        name="OneWayScreen"
        component={OneWayScreen}
        options={{
          tabBarLabel: 'One-way',
        }} />
      <Tab.Screen
        name="MultiCityScreen"
        component={MultiCityScreen}
        options={{
          tabBarLabel: 'Multi-city',
        }} />
    </Tab.Navigator>
  );
}

const SearchingFlightScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.topBarIcon}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons name="window-close" size={20} color="black" />
          
        </TouchableOpacity>
        <Text style={styles.topBarText}>
          Flight
        </Text>
        <View style={styles.topBarIcon} />
      </View>
      <TabStack />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // To spread icons and text evenly
    paddingHorizontal: 20,
    height: 60,
  },
  topBarText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1, // Takes up the remaining space to center text
  },
  topBarIcon: {
    width: 40, // Ensure the icons on both sides have the same width
  },
});

export default SearchingFlightScreen;
