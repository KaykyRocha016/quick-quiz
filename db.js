import * as SQLite from 'expo-sqlite';

export async function openDatabase() {
    return await SQLite.openDatabaseAsync('quick_quiz');
}

export async function getPerguntasAleatorias(db, quantidade) {
    return await db.getAllAsync(
        'SELECT * FROM questions ORDER BY RANDOM() LIMIT ?', [quantidade]
    );
}
