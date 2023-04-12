import axios from "axios";

export const getCurrentStockPrice = async (ticker) => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/price/${ticker}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getCandleChartStockData = async (ticker, days = '7') => {
  try {
    const response = await axios.get(`http://localhost:5000/api/v1/candlechart/${ticker}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}