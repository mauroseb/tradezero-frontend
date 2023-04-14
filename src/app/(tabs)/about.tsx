import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TradeZero Crew</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.baseText}>Well, clearly noone works here (we HireZero).</Text>
      <Text style={styles.baseText}>This is a test microservice application for Up and Running with Red Hat OpenShift.</Text>
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
    marginVertical: 10,
	letterSpacing: 5,
    fontSize: 50,
    fontWeight: 'bold',
	textAlign: 'center',
    alignItems: 'center',
    color: 'white',
    textShadow: '1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
