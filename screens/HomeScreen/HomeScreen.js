// screens/HomeScreen/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import promoteData from '../../data/promoteData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ExploreScreen from '../ExploreScreen/ExploreScreen.js';
import UserScreen from '../UserScreen/UserScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        // Cấu hình icon cho từng tab
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home-outline' : 'home-outline';
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
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="User" component={UserScreen} />
    </Tab.Navigator>
  );
}

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Thanh Chào */}
        <View style={styles.welcomeBarContainer}>
          <View style={styles.planeIcon}>
            <MaterialCommunityIcons name="airplane" size={40} color="white" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Explore Flight</Text>
            <Text style={styles.subtitle}>Welcome to flight booking</Text>
          </View>
          <View style={styles.userImg}>
            <Image
              source={require('../../assets/img/user.png')}
              style={styles.imageUser}
            />
          </View>
        </View>

        {/* Thanh Tìm Kiếm */}
        <View style={styles.searchingBarContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#9E9E9E" />
          <TouchableOpacity onPress={() => navigation.navigate('SearchingFlight')}>
            <Text style={{ marginLeft: 10, fontSize: 15, color: "#9E9E9E" }}>
              Find a flight
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tiêu đề Danh sách Promotion */}
        <View>
          <Text style={styles.promoteTitle}>The best cities for you</Text>
        </View>

        {/* Danh Sách Promotion - Chế Độ Ngang */}
        <View style={styles.promoteListContainer}>
          <FlatList
            data={promoteData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.customCard}>
                <Image source={item.img} style={styles.cardImage} />
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
              </View>
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.flatListContent}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>

        {/* Tiêu đề Explore Destinations */}
        <View>
          <Text style={styles.promoteTitle}>Explore Destinations</Text>
        </View>

        {/* Hình ảnh Explore */}
        <View>
          <Image
            style={styles.exploreImg}
            source={require('../../assets/img/explore.png')}
          />
        </View>
      </ScrollView>

      {/* Nút Chat treo lơ lửng */}
      <TouchableOpacity style={styles.chatButton} onPress={() => navigation.navigate('ChatScreen')}>
        <MaterialCommunityIcons name="chat" size={28} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  welcomeBarContainer: {
    marginTop: 10,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
  },
  planeIcon: {
    height: 50,
    width: 50,
    backgroundColor: '#00BDDA',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    color: '#393D43',
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#b6b8b8',
    marginBottom: 4,
    fontWeight: '600',
  },
  userImg: {
    height: 55,
    width: 55,
    backgroundColor: '#fff',
    borderRadius: 100,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUser: {
    height: 55,
    width: 55,
    borderRadius: 100,
  },
  searchingBarContainer: {
    marginTop: 30,
    height: 50,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchingBar: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
  },
  promoteTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 40,
    color: '#393D43',
  },
  promoteListContainer: {
    marginTop: 20,
    paddingLeft: 20,
  },
  flatListContent: {
    paddingRight: 20,
  },
  customCard: {
    marginRight: 10,
    borderRadius: 10,
    width: 250,
    backgroundColor: '#fff',
  },
  cardImage: {
    width: 250,
    height: 220,
    borderRadius: 10,
  },
  cardContent: {
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#393D43',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 16,
    color: '#b6b8b8',
    marginTop: 5,
    fontWeight: '400',
  },
  separator: {
    width: 10,
    height: 0,
  },
  exploreImg: {
    marginTop: 20,
    width: '90%',
    height: 400,
    borderRadius: 10,
    alignSelf: 'center',
  },
  chatButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#00BDDA',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Thêm đổ bóng cho nút trên Android
  },
});

export default BottomTabNavigator;