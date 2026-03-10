import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as SQlite from 'expo-sqlite'
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    async function setup() {
      await CreateDatabase()
    }
    setup()
  }, [])

  return (
    <View style={styles.container}>
      <Text>gilgabusha</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const CreateDatabase = async () => {
  const db = await SQlite.openDatabaseAsync('quick_quiz')
  let createCommand =
    "CREATE TABLE IF NOT EXISTS questions" +
    " (id INTEGER PRIMARY KEY AUTOINCREMENT,text TEXT NOT NULL,"
    + "option_a TEXT NOT NULL,option_b TEXT NOT NULL,"
    + "option_c TEXT NOT NULL," +
    "option_d TEXT NOT NULL,right_answer INTEGER NOT NULL);"
  await db.execAsync(createCommand)

  insertScript = `
    INSERT INTO questions (text, option_a, option_b, option_c, option_d, right_answer) VALUES
    ('Qual é o nome do protagonista de Attack on Titan?', 'Levi Ackerman', 'Eren Yeager', 'Armin Arlert', 'Jean Kirstein', 1),
    ('Em Death Note, qual fruta Ryuk ama comer?', 'Laranjas', 'Uvas', 'Maçãs', 'Bananas', 2),
    ('Qual é o nome do mundo virtual em Sword Art Online?', 'Alfheim', 'GGO', 'Aincrad', 'Underworld', 2),
    ('Em One Punch Man, qual é o nome do protagonista?', 'Genos', 'Saitama', 'Bang', 'King', 1),
    ('Em Fullmetal Alchemist: Brotherhood, o que Edward Elric perdeu ao tentar ressuscitar sua mãe?', 'Braço direito e perna esquerda', 'Braço esquerdo e perna direita', 'Visão e audição', 'Memória e alma', 0),
    ('Qual é a Quirk do Deku em My Hero Academia?', 'Zero Gravity', 'One For All', 'Explosion', 'Engine', 1),
    ('Em Naruto, qual é o nome do jutsu mais famoso de Naruto?', 'Chidori', 'Rasengan', 'Kage Bunshin', 'Amaterasu', 1),
    ('Em Hunter x Hunter, como se chama o sistema de energia usado pelos personagens?', 'Chakra', 'Reiatsu', 'Nen', 'Haki', 2),
    ('Quem é o capitão da tripulação dos Chapéus de Palha em One Piece?', 'Zoro', 'Sanji', 'Luffy', 'Nami', 2),
    ('Em Demon Slayer, qual é o nome da técnica de respiração usada por Tanjiro?', 'Respiração do Trovão', 'Respiração da Água', 'Respiração do Fogo', 'Respiração do Vento', 1),
    ('Em Steins;Gate, qual objeto é usado para enviar mensagens ao passado?', 'Smartphone', 'Forno de micro-ondas', 'Computador quântico', 'Relógio', 1),
    ('Qual personagem de Code Geass possui o poder do Geass?', 'Suzaku', 'Charles', 'Lelouch', 'C.C.', 2),
    ('Em Dragon Ball Z, quem é o príncipe dos Saiyajins?', 'Goku', 'Gohan', 'Broly', 'Vegeta', 3),
    ('Em Cowboy Bebop, qual é o nome da nave da tripulação?', 'Hammerhead', 'Swordfish', 'Bebop', 'Red Tail', 2),
    ('Em Bleach, qual é o nome do poder espiritual dos Shinigami?', 'Reiatsu', 'Reiryoku', 'Zanpakuto', 'Bankai', 3),
    ('Em Neon Genesis Evangelion, como se chama o protagonista?', 'Rei Ayanami', 'Shinji Ikari', 'Asuka Langley', 'Kaworu Nagisa', 1),
    ('Qual é o anime sobre um estudante que vira ghoul em Tokyo Ghoul?', 'Ken Kaneki', 'Hide', 'Touka', 'Juuzou', 0),
    ('Em Sword Art Online, qual é o nome completo do protagonista?', 'Kazuto Kirigaya', 'Akihiko Kayaba', 'Ryoutarou Tsuboi', 'Kouki Azuma', 0),
    ('Em Frieren: Beyond Journey''s End, qual é a raça de Frieren?', 'Humana', 'Anã', 'Elfa', 'Meio-elfa', 2),
    ('Em Jujutsu Kaisen, qual é a técnica inata de Gojo Satoru?', 'Seis Olhos e Infinito', 'Troca de Corpos', 'Dez Sombras', 'Chama Divina', 0);`;
  const count = await db.getFirstAsync('SELECT COUNT(*) as total FROM questions')
  if (count.total === 0) {
    await db.execAsync(insertScript)
  }
  await db.closeAsync()

}
