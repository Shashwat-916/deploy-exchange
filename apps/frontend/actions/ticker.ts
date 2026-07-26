import { BASE_BACKEND_URL_TICKERS } from "@/env";
import axios from "axios";

export async function GetTickers() {

  const response = await axios.get(BASE_BACKEND_URL_TICKERS);
  const data = response.data;

  return data
}