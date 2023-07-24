interface ExchangeRates {
  base: string;
  date: string;
  timestamp: string;
  rates: Record<string, number>;
}

export const getExchangeRate = async (): Promise<ExchangeRates> => {
  return await fetch(
    'http://data.fixer.io/api/latest?access_key=325a01b7534e5b4f80c59de9595584c1'
  ).then((response) => response.json());
};
