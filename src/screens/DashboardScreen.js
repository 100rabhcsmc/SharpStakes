import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { fetchGames } from '../api/api';
import GameCard from '../components/GameCard';

export default function DashboardScreen({ navigation }) {
  const [games, setGames] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      const data = await fetchGames();
      setGames(data);
      setLoading(false);
    };
    loadGames();
  }, []);

  const filteredGames =
    statusFilter === 'all'
      ? games
      : games.filter((game) => game.status === statusFilter);

  return (
    <SafeAreaView style={styles.container}>
    <View style={{marginHorizontal:20,marginTop:20}}>
      <Text style={styles.header}>🏟️ Games Dashboard</Text>

      {/* Filters */}
      <View style={styles.filters}>
        {['all', 'scheduled', 'inProgress', 'final'].map((status) => (
          <TouchableOpacity
            key={status}
            onPress={() => setStatusFilter(status)}
            style={[
              styles.filterButton,
              statusFilter === status && styles.activeFilterButton,
            ]}
          >
            <Text style={styles.filterButtonText}>{status}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Game List */}
      {loading ? (
        <ActivityIndicator size="large" color="#4a90e2" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredGames}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('GameDetail', { gameId: item.id })}
            >
              <GameCard game={item} />
            </TouchableOpacity>
          )}
        />
      )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFB',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ced4da',
    marginVertical: 5,
  },
  activeFilterButton: {
    backgroundColor: '#007BFF',
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
