import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { openDatabase, getRandomQuestions } from '../database/db';

const TOTAL_QUESTIONS = 5;
const OPTIONS = ['A', 'B', 'C', 'D'];

export function QuizScreen({ onFinish }) {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answered, setAnswered] = useState(false);
    const scoreRef = useRef(0);

    useEffect(() => {
        async function loadQuestions() {
            const db = await openDatabase();
            const result = await getRandomQuestions(db, TOTAL_QUESTIONS);
            setQuestions(result);
        }
        loadQuestions();
    }, []);

    if (questions.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Carregando perguntas...</Text>
            </View>
        );
    }

    const currentQuestion = questions[currentIndex];
    const optionTexts = [
        currentQuestion.option_a,
        currentQuestion.option_b,
        currentQuestion.option_c,
        currentQuestion.option_d,
    ];

    function answer(index) {
        if (answered) return;

        setSelectedAnswer(index);
        setAnswered(true);

        if (index === currentQuestion.right_answer) {
            scoreRef.current += 1;
            setScore(scoreRef.current);
        }
    }

    function nextQuestion() {
        const next = currentIndex + 1;
        if (next >= TOTAL_QUESTIONS) {
            onFinish(scoreRef.current);
        } else {
            setCurrentIndex(next);
            setSelectedAnswer(null);
            setAnswered(false);
        }
    }

    function getButtonColor(index) {
        if (!answered) return '#487d76';
        if (index === currentQuestion.right_answer) return '#2e7d32';
        if (index === selectedAnswer) return '#c62828';
        return '#9e9e9e';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.progress}>
                Pergunta {currentIndex + 1} de {TOTAL_QUESTIONS}
            </Text>

            <View style={styles.card}>
                <Text style={styles.question}>{currentQuestion.text}</Text>
            </View>

            {optionTexts.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.btn, { backgroundColor: getButtonColor(index) }]}
                    onPress={() => answer(index)}
                >
                    <Text style={styles.btnText}>
                        {OPTIONS[index]}) {option}
                    </Text>
                </TouchableOpacity>
            ))}

            {answered && (
                <TouchableOpacity style={styles.btnNext} onPress={nextQuestion}>
                    <Text style={styles.btnNextText}>
                        {currentIndex + 1 >= TOTAL_QUESTIONS ? 'Ver Resultado →' : 'Próxima →'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f4f2',
        padding: 24,
        justifyContent: 'center',
    },
    progress: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        elevation: 3,
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    btn: {
        padding: 14,
        borderRadius: 8,
        marginBottom: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    btnNext: {
        marginTop: 16,
        alignItems: 'flex-end',
    },
    btnNextText: {
        color: '#487d76',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
