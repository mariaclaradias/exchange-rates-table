export interface ExchangeRates {
  base: string;
  date: string;
  timestamp: string;
  rates: Record<string, number>;
  success: boolean;
}

// It was not possible to receive the data with the base as BRL because the free plan doesn't allow so
export const getExchangeRate = async (): Promise<ExchangeRates | null> => {
  if (!process.env.REACT_APP_API_KEY) return null;
  return fetch(
    `http://data.fixer.io/api/latest?access_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((response) => response.json())
    .catch((error) => {
      throw new Error(error);
    });
};
