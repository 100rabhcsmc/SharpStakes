import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { fetchGames, submitPrediction } from '../api/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function GameDetailScreen({ route }) {
  const { gameId } = route.params;
  const [game, setGame] = useState(null);

  useEffect(() => {
    const loadGame = async () => {
      const data = await fetchGames();
      const selected = data.find((g) => g.id === gameId);
      setGame(selected);
    };
    loadGame();
  }, []);

  const handlePrediction = async (pick) => {
    await submitPrediction({ gameId, pick, amount: 100 });
    alert(`Prediction submitted for ${pick}`);
  };

  if (!game) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Loading game...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Game Header */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.teamName}>{game.awayTeam.name}</Text>
          <Icon name="sports-esports" size={24} color="#f39c12" style={{ marginHorizontal: 8 }} />
          <Text style={styles.teamName}>{game.homeTeam.name}</Text>
        </View>
        <Text style={styles.status}>Status: <Text style={styles.statusValue}>{game.status}</Text></Text>
        <Text style={styles.odds}>
          Odds: {game.odds ? `${game.odds.favorite} (${game.odds.spread})` : 'N/A'}
        </Text>
      </View>

      {/* Prediction Section */}
      <Text style={styles.predictionTitle}>Make a Prediction</Text>

      <View style={styles.predictionContainer}>
        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => handlePrediction(game.homeTeam.abbreviation)}
        >
          <Icon name="thumb-up" size={20} color="#fff" />
          <Text style={styles.buttonText}>Pick {game.homeTeam.abbreviation}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.awayButton]}
          onPress={() => handlePrediction(game.awayTeam.abbreviation)}
        >
          <Icon name="thumb-down" size={20} color="#fff" />
          <Text style={styles.buttonText}>Pick {game.awayTeam.abbreviation}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f4f6f8',marginHorizontal:20,marginTop:100 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#666' },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  status: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  statusValue: {
    fontWeight: 'bold',
    color: '#27ae60',
  },
  odds: {
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 5,
  },

  predictionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },

  predictionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  homeButton: {
    backgroundColor: '#2ecc71',
  },
  awayButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});
