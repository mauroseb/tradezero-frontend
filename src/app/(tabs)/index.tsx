import { StyleSheet, ImageBackground, FlatList, ActivityIndicator, Dimensions, Button } from 'react-native';
import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import HomeCategory from '../../components/HomeCategory';
import dataset from '../../assets/data/dataset';
import { Ionicons, FontAwesome, AntDesign } from "@expo/vector-icons";
import { LineChart, CandlestickChart, TCandle } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  getCurrentStockPrice,
  getCandleChartStockData,
} from "../../services/requests.js";

const BGImage = require('../../assets/images/tradezero-bg.jpg');


const candledefault = [
  {"open": 101.70999908447266, "high": 104.19000244140625, "low": 101.44000244140625, "close": 104.0, "timestamp": 1680235200.0}, 
  {"open": 102.66999816894531, "high": 104.94999694824219, "low": 102.37999725341797, "close": 104.91000366210938, "timestamp": 1680494400.0}, 
  {"open": 104.83999633789062, "high": 106.0999984741211, "low": 104.5999984741211, "close": 105.12000274658203, "timestamp": 1680580800.0}, 
  {"open": 106.12000274658203, "high": 106.54000091552734, "low": 104.10199737548828, "close": 104.94999694824219, "timestamp": 1680667200.0}, 
  {"open": 105.7699966430664, "high": 109.62999725341797, "low": 104.81500244140625, "close": 108.9000015258789, "timestamp": 1680753600.0}, 
  {"open": 107.38999938964844, "high": 107.97000122070312, "low": 105.5999984741211, "close": 106.94999694824219, "timestamp": 1681099200.0}, 
  {"open": 106.91999816894531, "high": 107.22000122070312, "low": 105.27999877929688, "close": 106.12000274658203, "timestamp": 1681185600.0}
];

export const {width: SIZE} = Dimensions.get('window');



export default function HomeScreen() {

  const [loading, setLoading] = useState(false);
  const [stockValue, setStockValue] = useState(0);
  const [stockVolume, setStockVolume] = useState(0);
  const [stockMarketcap, setStockMarketcap] = useState(0);
  const [stockCandleChartData, setStockCandleChartData] = useState<TCandle[]>(candledefault);
  const [ticker, setTicker] = useState("IBM");
  
  const fetchStockData = async () => {
    setLoading(true);
    const fetchedStockData = await getCurrentStockPrice(ticker);
    setStockValue(fetchedStockData['price']);
    setStockVolume(fetchedStockData['volume']);
    setStockMarketcap(fetchedStockData['marketcap']);
    setLoading(false);
  };
  
  const fetchCandleChartData = async (days: string) => {
    setLoading(true);
    const fetchedSelectedCandleChartData = await getCandleChartStockData(
      ticker,
      days
    );
    setStockCandleChartData(fetchedSelectedCandleChartData);
    setLoading(false);
  };
  
  const handleStockChange = (selectedStock: string) => { 
    setLoading(true); 
    setTicker(selectedStock);
    fetchStockData();
    fetchCandleChartData('7');
    setLoading(false)
  };
  
  const screenWidth = Dimensions.get("window").width;
  
  const chartColor = 'black';
  
  useEffect(() => {
    handleStockChange(ticker);
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }
 
  return (
    <View style={styles.container}>
      <ImageBackground source={BGImage} style={styles.image}>
          <View style={styles.imageContainer}>
            <Text style={styles.title}>TradeZer0</Text>
            <Text style={styles.baseText}>Because the safest strategy is to TradeZero.</Text>
          </View>
      </ImageBackground>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	    <View style={styles.contentContainer}>
        <View style={styles.chartContainer}>
          <Text style={styles.graphText}>{ticker}</Text>
          <Text style={styles.graphTextSmall}>Current Price: USD {stockValue}</Text>
          <Text style={styles.graphTextSmall}>Volume: {stockVolume}</Text>
          <Text style={styles.graphTextSmall}>MarketCap: {stockMarketcap}</Text>
          <CandlestickChart.Provider data={stockCandleChartData}>
            <CandlestickChart  height={screenWidth / 4} width={screenWidth / 6} >
              <CandlestickChart.Candles />
              <CandlestickChart.Crosshair />
            </CandlestickChart>
          </CandlestickChart.Provider>
        </View>
        <FlatList
          data={dataset.items}
          renderItem={({item}) => <HomeCategory currentStock={ticker} onStockChange={handleStockChange}  category={item} />}
          showHorizontalScrollIndicator={false}
        />
	    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#25292e',
    height: '100%',
  },
  title: {
    marginVertical: 10,
	  letterSpacing: 5,
    fontSize: 50,
    fontWeight: 'bold',
	  textAlign: 'center',
    alignItems: 'center',
    color: 'white',
  },
  baseText: {
    fontSize: 20,
	  textAlign: 'center',
    color: '#ffffff',
  },
  graphText: {
    fontSize: 15,
	  textAlign: 'left',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  graphTextSmall: {
    fontSize: 10,
	  textAlign: 'left',
    color: '#ffffff',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  contentContainer: {
	  backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
	  backgroundColor: '25292e',
    borderRadius: 20,
  },
  chartContainer: {
    width: 300,
	  backgroundColor: 'black',
    borderRadius: 20,
    tintColor: 'black',
    padding: 15,
    justifyContent: 'center',
  },
  image: {
	  backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: 'black',
    height: '60%',
    width: '100%',
    flex: 1,
  },
});
