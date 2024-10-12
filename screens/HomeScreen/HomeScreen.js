// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList } from 'react-native';
import { Card, Provider as PaperProvider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import promoteData from '../../data/promoteData';

const HomeScreen = () => {
    return(
        <PaperProvider>
            <SafeAreaView style={styles.container}>
                {/* Thanh Chào */}
                <View style={styles.welcomeBarContainer}>
                    <View style={styles.planeIcon}> 
                        <MaterialCommunityIcons name="airplane" size={40} color="white"/>
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
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={styles.searchingBar}
                        placeholder='Find a flight'
                        placeholderTextColor="#9E9E9E"
                    />
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
                        renderItem={({item}) => (
                            <View style={styles.customCard}>
                                <Image source={item.img} style={styles.cardImage}/>
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
            </SafeAreaView>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    welcomeBarContainer:{
        marginTop: 30,
        height: 80,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        backgroundColor: 'white', // Đặt màu nền cho thanh chào
        borderRadius: 10,
        marginHorizontal: 10,
    },
    planeIcon:{
        height: 55,
        width: 55,
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
    userImg:{
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
    searchingBarContainer:{
        marginTop: 30,
        height: 50,
        backgroundColor: '#EEEEEE',
        marginHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    searchingBar:{
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
        height: 0, // Đảm bảo separator không hiển thị
    },
});

export default HomeScreen;