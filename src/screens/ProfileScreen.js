import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { fetchUser } from '../api/api';

export default function ProfileScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUser();
      setUser(data);
    };
    loadUser();
  }, []);

  if (!user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4a90e2" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Icon name="account-circle" size={80} color="#4a90e2" />
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.balance}>
            Balance: <Text style={styles.balanceValue}>${user.balance.toFixed(2)}</Text>
          </Text>
          <Text style={styles.record}>
            Record:
            <Text style={styles.win}> {user.stats.wins}W</Text> /
            <Text style={styles.loss}> {user.stats.losses}L</Text> /
            <Text style={styles.pending}> {user.stats.pending}P</Text>
          </Text>
        </View>
      </View>

      {/* Prediction History */}
      <Text style={styles.subHeader}>Prediction History</Text>
      <FlatList
        data={user.predictions}
        keyExtractor={(item) => item.gameId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎮 Game ID: {item.gameId}</Text>

            <View style={styles.cardRow}>
              <Icon name="sports-esports" size={18} color="#3498db" style={styles.icon} />
              <Text style={styles.pickText}>Pick: {item.pick}</Text>
            </View>

            <View style={styles.cardRow}>
              <Icon name="attach-money" size={18} color="#27ae60" style={styles.icon} />
              <Text style={styles.amountText}>Amount: ${item.amount}</Text>
            </View>

            <View style={styles.cardRow}>
              <Icon
                name="flag"
                size={18}
                color={
                  item.result === 'win'
                    ? '#2ecc71'
                    : item.result === 'loss'
                    ? '#e74c3c'
                    : '#f39c12'
                }
                style={styles.icon}
              />
              <Text
                style={[
                  styles.resultText,
                  item.result === 'win' && { color: '#2ecc71' },
                  item.result === 'loss' && { color: '#e74c3c' },
                  item.result !== 'win' && item.result !== 'loss' && { color: '#f39c12' },
                ]}
              >
                Result: {item.result}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No predictions yet.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
    backgroundColor: '#f8f9fa',
    marginHorizontal: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  balance: {
    fontSize: 16,
    marginTop: 5,
    color: '#444',
  },
  balanceValue: {
    color: '#2ecc71',
    fontWeight: 'bold',
  },
  record: {
    fontSize: 16,
    marginTop: 5,
    color: '#444',
  },
  win: { color: '#2ecc71', fontWeight: 'bold' },
  loss: { color: '#e74c3c', fontWeight: 'bold' },
  pending: { color: '#f39c12', fontWeight: 'bold' },
  subHeader: {
    fontSize: 20,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    marginRight: 8,
  },
  pickText: {
    fontSize: 14,
    color: '#2980b9',
  },
  amountText: {
    fontSize: 14,
    color: '#27ae60',
  },
  resultText: {
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginTop: 30,
  },
});
