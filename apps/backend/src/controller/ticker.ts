import axios from "axios";
import type { Request, Response, NextFunction } from "express";
import { BACKPACK_TICKERS } from "../utils/env.js";
import type { TickerResponse } from "../utils/types.js";


const ALLOWED_BASES = [
    "BTC_USDC",
    "ETH_USDC", 
    "SOL_USDC", 
] as const;


function filterTickers(tickers: TickerResponse[]): TickerResponse[] {
    const result: TickerResponse[] = [];
    for (let i = 0; i < tickers.length; i++) {
        if (ALLOWED_BASES.includes(tickers[i]!.symbol as typeof ALLOWED_BASES[number])) {
            result.push(tickers[i]!);
        }
    }
    return result;
}


export const GetTickers = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { data } = await axios.get<TickerResponse[]>(BACKPACK_TICKERS);
        const filtered = filterTickers(data);
        res.json(filtered);
    } catch (error) {
        next(error);
    }
};