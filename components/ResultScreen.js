import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TOTAL_QUESTIONS = 5;

export function ResultScreen({ route, navigation }) {
    const { score } = route.params;

    function getEmoji() {
        if (score === TOTAL_QUESTIONS) return '🏆';
        if (score >= 3) return '😊';
        if (score >= 1) return '😅';
        return '😢';
    }

    function getMessage() {
        if (score === TOTAL_QUESTIONS) return 'Perfeito! Você é um mestre dos animes!';
        if (score >= 3) return 'Muito bom! Você conhece bastante!';
        if (score >= 1) return 'Quase lá! Precisa estudar mais um pouco...';
        return 'Que pena! Tente novamente!';
    }

    return (
        <View style={styles.container}>
            <Text style={styles.emoji}>{getEmoji()}</Text>
            <Text style={styles.title}>Resultado</Text>
            <Text style={styles.message}>{getMessage()}</Text>
            <View style={styles.scoreCard}>
                <Text style={styles.scoreLabel}>Você acertou</Text>
                <Text style={styles.scoreValue}>
                    {score}<Text style={styles.scoreTotal}>/{TOTAL_QUESTIONS}</Text>
                </Text>
                <Text style={styles.scoreLabel}>perguntas</Text>
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.btnText}>Jogar Novamente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#e8f4f2', alignItems: 'center', justifyContent: 'center', padding: 24 },
    emoji: { fontSize: 72, marginBottom: 16 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#333', marginBottom: 8 },
    message: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 32 },
    scoreCard: { backgroundColor: '#fff', borderRadius: 16, padding: 32, alignItems: 'center', elevation: 3, marginBottom: 40, width: '60%' },
    scoreLabel: { fontSize: 14, color: '#888' },
    scoreValue: { fontSize: 64, fontWeight: 'bold', color: '#487d76' },
    scoreTotal: { fontSize: 32, color: '#aaa' },
    btn: { backgroundColor: '#487d76', paddingVertical: 14, paddingHorizontal: 48, borderRadius: 10 },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
