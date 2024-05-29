import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const QuizScreen = ({ route, navigation }) => {
    const { questions, timeDuration } = route.params;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(timeDuration * 60);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(interval);
                    navigation.replace('QuizResult', { score, total: questions.length, incorrectAnswers });
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [navigation, questions.length, score, timer]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => true;

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [])
    );

    const handleAnswer = (answer) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        } else {
            setIncorrectAnswers([...incorrectAnswers, { question: currentQuestion.question, correctAnswer: currentQuestion.answer, selectedOption: answer }]);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigation.replace('QuizResult', { score, total: questions.length, incorrectAnswers });
        }
    };

    if (!questions || questions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: Question data is missing or malformed.</Text>
            </View>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <ImageBackground source={require('./assets/login_background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.timer}>Time Left: {Math.floor(timer / 60)}:{('0' + timer % 60).slice(-2)}</Text>
                <Text style={styles.question}>{currentQuestion.question}</Text>
                <FlatList
                    data={currentQuestion.options}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.option} onPress={() => handleAnswer(item)}>
                            <Text style={styles.optionText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // White background with some transparency
        padding: 20,
        width: '100%',
    },
    timer: {
        fontSize: 18,
        marginBottom: 10,
        color: 'red',
        fontWeight: 'bold',
    },
    question: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    option: {
        backgroundColor: '#f7b731', // Matching yellow color for options
        padding: 15,
        marginVertical: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    optionText: {
        fontSize: 18,
        color: 'white', // Changed text color to white
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default QuizScreen;
