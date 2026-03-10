import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getPerguntasAleatorias, openDatabase } from '../db';

const TOTAL_PERGUNTAS = 5;
const opcoes = ['A', 'B', 'C', 'D'];

export function QuizScreen({ onFinalizar }) {
    const [perguntas, setPerguntas] = useState([]);
    const [indiceAtual, setIndiceAtual] = useState(0);
    const [acertos, setAcertos] = useState(0);
    const [respostaSelecionada, setRespostaSelecionada] = useState(null); 
    const [respondido, setRespondido] = useState(false);  responder

    useEffect(() => {
        async function carregarPerguntas() {
            const db = await openDatabase();
            const questoes = await getPerguntasAleatorias(db, TOTAL_PERGUNTAS);
            setPerguntas(questoes);
        }
        carregarPerguntas();
    }, []);

    if (perguntas.length === 0) {
        return (
            <View style={styles.container}>
                <Text>Carregando perguntas...</Text>
            </View>
        );
    }

    const perguntaAtual = perguntas[indiceAtual];
    const opcoesTexto = [
        perguntaAtual.option_a,
        perguntaAtual.option_b,
        perguntaAtual.option_c,
        perguntaAtual.option_d,
    ];

    function responder(indice) {
        if (respondido) return;

        setRespostaSelecionada(indice);
        setRespondido(true);

        const acertou = indice === perguntaAtual.right_answer;
        if (acertou) setAcertos((a) => a + 1);
    }

    function proximaPergunta() {
        const proximo = indiceAtual + 1;
        if (proximo >= TOTAL_PERGUNTAS) {
            onFinalizar(acertos + (respostaSelecionada === perguntaAtual.right_answer ? 1 : 0));
        } else {
            setIndiceAtual(proximo);
            setRespostaSelecionada(null);
            setRespondido(false);
        }
    }

    function getCorBotao(indice) {
        if (!respondido) return '#487d76'; 
        if (indice === perguntaAtual.right_answer) return '#2e7d32';  
        if (indice === respostaSelecionada) return '#c62828';  
        return '#9e9e9e';  
    }

    return (
        <View style={styles.container}>
            <Text style={styles.progresso}>
                Pergunta {indiceAtual + 1} de {TOTAL_PERGUNTAS}
            </Text>

            <View style={styles.card}>
                <Text style={styles.pergunta}>{perguntaAtual.text}</Text>
            </View>

            {opcoesTexto.map((opcao, indice) => (
                <TouchableOpacity
                    key={indice}
                    style={[styles.btn, { backgroundColor: getCorBotao(indice) }]}
                    onPress={() => responder(indice)}
                >
                    <Text style={styles.btnText}>
                        {opcoes[indice]}) {opcao}
                    </Text>
                </TouchableOpacity>
            ))}

            {respondido && (
                <TouchableOpacity style={styles.btnProxima} onPress={proximaPergunta}>
                    <Text style={styles.btnProximaText}>
                        {indiceAtual + 1 >= TOTAL_PERGUNTAS ? 'Ver Resultado →' : 'Próxima →'}
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
    progresso: {
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
    pergunta: {
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
    btnProxima: {
        marginTop: 16,
        alignItems: 'flex-end',
    },
    btnProximaText: {
        color: '#487d76',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
