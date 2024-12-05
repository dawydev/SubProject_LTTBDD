import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function HelpScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Help & Support</Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.sectionTitle}>FAQs</Text>
        <Text style={styles.text}>1. How do I book a flight?</Text>
        <Text style={styles.text}>2. How can I change my booking?</Text>
        <Text style={styles.text}>3. How do I cancel my booking?</Text>
        <Text style={styles.text}>4. How do I contact support?</Text>

        <Text style={styles.sectionTitle}>Contact Support</Text>
        <Text style={styles.text}>Email: anhkhoa22022003@gmail.com</Text>
        <Text style={styles.text}>Phone: 0787945874</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});
