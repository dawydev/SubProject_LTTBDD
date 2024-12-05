import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function NotificationScreen() {
  const notifications = [
    { id: 1, title: 'Flight Reminder', description: 'Your flight to New York is scheduled at 10:00 AM tomorrow.' },
    { id: 2, title: 'Promotion', description: 'Save 20% on your next flight booking! Offer valid until Dec 31.' },
    { id: 3, title: 'Booking Update', description: 'Your flight to Paris has been rescheduled to 2:00 PM.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
      </View>
      <View style={styles.body}>
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationItem}>
            <Text style={styles.notificationTitle}>{notification.title}</Text>
            <Text style={styles.notificationDescription}>{notification.description}</Text>
          </View>
        ))}
        {notifications.length === 0 && (
          <Text style={styles.noNotifications}>You have no notifications at the moment.</Text>
        )}
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
    padding: 20,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  body: {
    padding: 20,
  },
  notificationItem: {
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
  notificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  noNotifications: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
