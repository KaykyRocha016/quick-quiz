import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export function HomeScreen({ onStart }) {
    return (
        <ImageBackground
            source={require('../assets/icon.png')}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>⚡ Quick Quiz</Text>
                <Text style={styles.subtitle}>Teste seu conhecimento em animes!</Text>

                <TouchableOpacity style={styles.btn} onPress={onStart}>
                    <Text style={styles.btnText}>Iniciar Quiz</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginBottom: 40,
    },
    btn: {
        backgroundColor: '#487d76',
        paddingVertical: 14,
        paddingHorizontal: 48,
        borderRadius: 10,
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
