import { fetchData } from "./utils.js";

export const availableCryptos = async () => {
    const data = await fetchData("https://api.coingecko.com/api/v3/coins/markets",
        {
            vs_currency: "USD",
            order: "market_cap_desc",
            per_page: 20
        });
    return data.map(x => ({
        name: x.name,
        symbol: x.symbol
    }));
};