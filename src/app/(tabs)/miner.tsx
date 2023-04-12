import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function Miner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> MineZero</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.baseText}>Let us create some workload in the cluster.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25292e',
  },
  baseText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
