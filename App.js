import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import các màn hình
import HomeScreen from './screens/HomeScreen/HomeScreen.js';
import UserScreen from './screens/UserScreen/UserScreen.js';
import ExploreScreen from './screens/ExploreScreen/ExploreScreen.js';
import SearchingFlightScreen from './screens/SearchingFlightScreen/SearchingFlightScreen.js';  // Màn hình mới

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Tạo Stack Navigator cho Home Tab (bao gồm cả SearchingFlightScreen)

export default function App() {
  return (
    <NavigationContainer>
          <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }}  // Ẩn header mặc định
      />
      <Stack.Screen 
        name="SearchingFlight" 
        component={SearchingFlightScreen} 
        options={{ headerShown: false }}  // Ẩn header mặc định

      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
