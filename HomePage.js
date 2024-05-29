import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

const HomePage = ({ navigation }) => {
  const classes = [
    { id: 1, name: 'Class 1' },
    { id: 2, name: 'Class 2' },
    { id: 3, name: 'Class 3' },
    { id: 4, name: 'Class 4' },
    { id: 5, name: 'Class 5' },
  ];

  const handleClassPress = (classId) => {
    navigation.navigate('SubjectQuiz', { classId });
  };

  const handleCustomQuizPress = () => {
    navigation.navigate('CustomQuiz');
  };

  const renderClassItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleClassPress(item.id)}>
      <View style={styles.classItem}>
        <Text style={styles.classText}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground source={require('./assets/login_background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Classes</Text>
        <FlatList
          data={classes}
          renderItem={renderClassItem}
          keyExtractor={item => item.id.toString()}
        />
        <TouchableOpacity onPress={handleCustomQuizPress} style={styles.customQuizButton}>
          <Text style={styles.customQuizButtonText}>Custom Quiz</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  classItem: {
    backgroundColor: '#f7b731', // Same color as Custom Quiz button
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  classText: {
    fontSize: 18,
    color: 'white', // Changed text color to white
    fontWeight: 'bold',
  },
  customQuizButton: {
    backgroundColor: '#f7b731', // Bright yellow
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  customQuizButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomePage;
