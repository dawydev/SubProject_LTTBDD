import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UserScreen() {
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={require('../../assets/img/user.png')} // Đường dẫn ảnh đại diện
        />
        <Text style={styles.name}>Anh Khoa</Text>
        <Text style={styles.email}>anhkhoa22022003@gmail.com</Text>
      </View>

      <View style={styles.body}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Payment Methods</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => navigation.navigate('NotificationScreen')}
        >
        <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.menuItem}
         onPress={() => navigation.navigate('HelpScreen')}
        >
        <Text style={styles.menuText}>Help & Support</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate('SettingScreen')}
        >
        <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, styles.logout]} onPress={handleLogout}>
          <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1e90ff',
    paddingVertical: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  body: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  logout: {
    backgroundColor: '#ff4d4d',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
