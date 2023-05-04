import axios from "axios";
import axiosRetry from "axios-retry";
import process from 'process';

const tzp_port = process.env.TZP_PORT || 8080;
const tzp_host = process.env.TZP_HOST || "localhost";

axiosRetry(axios, {
  retries: 30,
  retryDelay: (retryCount) => {
      console.log(`retry attempt: ${retryCount}`);
      return retryCount * 2000;
  },
  retryCondition: (error) => {
      return error.response.status === 503;
  },
});

export const getCurrentStockPrice = async (ticker) => {
  try {
    const response = await axios.get(`http://${tzp_host}:${tzp_port}/api/v1/price/${ticker}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export const getCandleChartStockData = async (ticker, days = '10') => {
  try {
    const response = await axios.get(`http://${tzp_host}:${tzp_port}/api/v1/candlechart/${ticker}`)
    return response.data;
  } catch (e) {
    console.log(e);
  }
}