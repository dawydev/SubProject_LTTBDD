import React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SettingScreen() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = React.useState(true);
  const navigation = useNavigation();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev);
  };

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
      <View style={[styles.header, isDarkMode && styles.darkHeader]}>
        <Text style={[styles.title, isDarkMode && styles.darkTitle]}>Settings</Text>
      </View>

      <View style={[styles.body, isDarkMode && styles.darkBody]}>
        {/* Cài đặt tài khoản */}
        <TouchableOpacity style={[styles.settingItem, isDarkMode && styles.darkItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Account</Text>
        </TouchableOpacity>

        {/* Ngôn ngữ */}
        <TouchableOpacity style={[styles.settingItem, isDarkMode && styles.darkItem]} onPress={() => navigation.navigate('LanguageScreen')}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Language</Text>
        </TouchableOpacity>

        {/* Chế độ tối */}
        <View style={[styles.settingItem, isDarkMode && styles.darkItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Dark Mode</Text>
          <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>

        <View style={[styles.settingItem, isDarkMode && styles.darkItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Enable Notifications</Text>
          <Switch value={isNotificationsEnabled} onValueChange={toggleNotifications} />
        </View>

        <TouchableOpacity style={[styles.settingItem, isDarkMode && styles.darkItem]}>
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Privacy Policy</Text>
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
  darkContainer: {
    backgroundColor: '#1e1e1e',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e90ff',
    alignItems: 'center',
  },
  darkHeader: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  darkTitle: {
    color: '#f0f8ff',
  },
  body: {
    padding: 20,
  },
  darkBody: {
    backgroundColor: '#121212',
  },
  settingItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  darkItem: {
    backgroundColor: '#333',
  },
  settingText: {
    fontSize: 18,
    color: '#333',
  },
  darkText: {
    color: '#f0f8ff',
  },
});
