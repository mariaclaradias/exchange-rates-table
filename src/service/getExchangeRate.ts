interface ExchangeRates {
  base: string;
  date: string;
  timestamp: string;
  rates: Record<string, number>;
}

export const getExchangeRate = async (): Promise<ExchangeRates> => {
  return await fetch(
    `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_API_KEY}`
  ).then((response) => response.json());
};
