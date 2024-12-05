import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import các màn hình
import HomeScreen from './screens/HomeScreen/HomeScreen.js';
import UserScreen from './screens/UserScreen/UserScreen.js';
import ExploreScreen from './screens/ExploreScreen/ExploreScreen.js';
import SearchingFlightScreen from './screens/SearchingFlightScreen/SearchingFlightScreen.js';
import SearchResultScreen from './screens/SearchResultScreen/SearchResultScreen.js';
import FlightDetailScreen from './screens/FlightDetail/FlightDetailScreen.js';
import CheckoutPassengerScreen from './screens/CheckoutScreen/CheckoutPassengerScreen.js';
import CheckoutBaggageScreen from './screens/CheckoutScreen/CheckoutBaggageScreen.js';
import CheckoutSeatScreen from './screens/CheckoutScreen/CheckoutSeatScreen.js';
import CheckoutSelectSeatScreen from './screens/CheckoutScreen/CheckoutSelectSeatScreen.js';
import CheckoutPaymentScreen from './screens/CheckoutScreen/CheckoutPaymentScreen.js';
import LoginScreen from './screens/Login/LoginScreen.js'; // Import LoginScreen
import CheckoutPaymentSuccessScreen from './screens/CheckoutScreen/CheckoutPaymentSuccessScreen.js';

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tạo Stack Navigator cho Home Tab (bao gồm cả SearchingFlightScreen)

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="SearchingFlight" 
          component={SearchingFlightScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="SearchResultScreen" 
          component={SearchResultScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="UserScreen" 
          component={UserScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="FlightDetailScreen" 
          component={FlightDetailScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutPassengerScreen" 
          component={CheckoutPassengerScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutBaggageScreen" 
          component={CheckoutBaggageScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutSeatScreen" 
          component={CheckoutSeatScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutSelectSeatScreen" 
          component={CheckoutSelectSeatScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutPaymentScreen" 
          component={CheckoutPaymentScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
        <Stack.Screen 
          name="CheckoutPaymentSuccessScreen" 
          component={CheckoutPaymentSuccessScreen} 
          options={{ headerShown: false }}  // Ẩn header mặc định
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}