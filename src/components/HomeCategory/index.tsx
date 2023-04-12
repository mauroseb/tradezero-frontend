import * as React from 'react';
import { StyleSheet, Image, FlatList, View, Pressable } from 'react-native';
import {ArtDesign} from "@expo/vector-icons";
import { Text } from '../../components/Themed';


export default function HomeCategory(props) {

  const { cat } = props.category;
  const current = props.currentStock;
  const [stock, setStock] = React.useState('IBM');

  const isStockSelected = (ticker: string) => ticker == stock;

    return (
     <>
      <Text style={styles.title}>{props.category.title}</Text>
      <FlatList
           data={props.category.stocks}
           renderItem={({item}) => (
            <Pressable
            style={{
              backgroundColor: isStockSelected(item.ticker) ? "#1e1e1e" : "transparent",
              borderRadius: 10,
              borderColor:  isStockSelected(item.ticker) ? "white" :  "transparent",
              borderWidth: isStockSelected(item.ticker) ? 3 : 0,
            }}
            onPress={() => {
              setStock(item.ticker);
              props.onStockChange(item.ticker);
            }}
            >
              <View style={styles.container}>
                <Image style={styles.image} source={ item.logo } />
                <View>
                   <Text style={styles.ticker}>{item.ticker}</Text>
                   <View style={styles.containerPrice}>
                     <Text style={styles.priceChange}>{item.intraday} %</Text>
                     <Text style={styles.volume}>MCap {item.marketcap}</Text>
                   </View>
                </View>
              </View>
            </Pressable>
           )}
           horizontal
           />
           
     </>
  );
  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'row',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    margin: 4,
  },
  containerPrice: {
    flexDirection: 'column',
    backgroundColor: "#585858",
    padding: 5,
    borderRadius: 10,
  },
  title: {
    margin: 5,
    fontSize: 20,
  },
  ticker: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  priceChange: {
    fontSize: 10,
    color: '#ffffff',
  },
  volume: {
    fontSize: 10,
    color: '#ffffff',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 10,
    margin: 5,
    marginRight: 30
  },
});

