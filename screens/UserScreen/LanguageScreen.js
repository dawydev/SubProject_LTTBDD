import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function LanguageScreen({ navigation }) {
  const languages = ['English', 'Vietnamese'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Language</Text>
      </View>

      <View style={styles.body}>
        {languages.map((language, index) => (
          <TouchableOpacity key={index} style={styles.languageItem}>
            <Text style={styles.languageText}>{language}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Back</Text>
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
  languageItem: {
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
  languageText: {
    fontSize: 18,
    color: '#333',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
