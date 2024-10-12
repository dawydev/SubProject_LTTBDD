// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import các màn hình
import HomeScreen from './screens/HomeScreen/HomeScreen.js';
import UserScreen from './screens/UserScreen/UserScreen.js';
import MoreScreen from './screens/ExploreScreen/ExploreScreen.js';

// Tạo Bottom Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          // Cấu hình icon cho từng tab
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-outline'
                : 'home-outline';
            } else if (route.name === 'User') {
              iconName = focused ? 'account' : 'account-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'earth' : 'earth';
            }

            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00BDDA',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // Ẩn header mặc định
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 1,
            borderTopColor: '#e5e5e5',
            elevation: 5, // Thêm đổ bóng cho tab bar trên Android
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={MoreScreen}/>
        <Tab.Screen name="User" component={UserScreen} />
        
      </Tab.Navigator>
    </NavigationContainer>
  );
}
