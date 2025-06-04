import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment'; // format start time (you may need to install this)

const GameCard = ({ game }) => {
  const startTime = moment(game.startTime).format('MMM D, h:mm A');

  return (
    <View style={styles.card}>
    
      <View style={styles.row}>
        <Text style={styles.teamText}>{game.awayTeam.abbreviation}</Text>
        <Icon name="sports-basketball" size={20} color="#3498db" style={styles.vsIcon} />
        <Text style={styles.teamText}>{game.homeTeam.abbreviation}</Text>
      </View>

      <View style={styles.detailsRow}>
        <View style={styles.teamDetail}>
          <Text style={styles.teamName}>{game.awayTeam.name}</Text>
          <Text style={styles.recordText}>Record: {game.awayTeam.record}</Text>
        </View>
        <View style={styles.teamDetail}>
          <Text style={styles.teamName}>{game.homeTeam.name}</Text>
          <Text style={styles.recordText}>Record: {game.homeTeam.record}</Text>
        </View>
      </View>

      {/* Game Info */}
      <View style={styles.infoRow}>
        <Text style={styles.infoText}>
          <Icon name="event" size={16} /> {startTime}
        </Text>
        <Text style={styles.infoText}>
          <Icon name="hourglass-bottom" size={16} /> Status: <Text style={styles.statusValue}>{game.status}</Text>
        </Text>
        <Text style={styles.infoText}>
          <Icon name="attach-money" size={16} /> Odds: {game.odds ? `${game.odds.favorite} (${game.odds.spread})` : 'N/A'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  vsIcon: {
    marginHorizontal: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  teamDetail: {
    flex: 1,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
  },
  recordText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  infoRow: {
    marginTop: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#2c3e50',
    marginBottom: 2,
  },
  statusValue: {
    fontWeight: '600',
    color: '#27ae60',
  },
});

export default GameCard;
