import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 20px;
  border-radius: 10px;
  margin-top: 15px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.bgColor};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const OverviewPercent = styled.span<{ percent: number }>`
  color: ${(props) => (props.percent < 0 ? "#457BFF" : "#FF4545")};
  flex-direction: column;
  align-items: center;
`;

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface CharProps {
  coinId: string;
}

function Price({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTickers(coinId)
  );

  return (
    <>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <div>
          <Overview>
            <OverviewItem>
              <span>Weekly change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_7d ?? 0}
              >
                {data?.quotes.USD.percent_change_7d} %
              </OverviewPercent>
            </OverviewItem>
            <OverviewItem>
              <span>Daily change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_24h ?? 0}
              >
                {data?.quotes.USD.percent_change_24h} %
              </OverviewPercent>
            </OverviewItem>
            <OverviewItem>
              <span>12 Hours change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_12h ?? 0}
              >
                {data?.quotes.USD.percent_change_12h} %
              </OverviewPercent>
            </OverviewItem>
          </Overview>

          <Overview>
            <OverviewItem>
              <span>6 Hours change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_15m ?? 0}
              >
                {data?.quotes.USD.percent_change_15m} %
              </OverviewPercent>
            </OverviewItem>
            <OverviewItem>
              <span>1 Hour change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_15m ?? 0}
              >
                {data?.quotes.USD.percent_change_15m} %
              </OverviewPercent>
            </OverviewItem>
            <OverviewItem>
              <span>15 Minutes change:</span>
              <OverviewPercent
                percent={data?.quotes.USD.percent_change_15m ?? 0}
              >
                {data?.quotes.USD.percent_change_15m} %
              </OverviewPercent>
            </OverviewItem>
          </Overview>
        </div>
      )}
    </>
  );
}
export default Price;

/*    <div>
      <h1>{data?.quotes.USD.percent_change_15m}</h1>
      <h1>{data?.quotes.USD.percent_change_30m}</h1>
      <h1>{data?.quotes.USD.percent_change_1h}</h1>
      <h1>{data?.quotes.USD.percent_change_6h}</h1>
      <h1>{data?.quotes.USD.percent_change_12h}</h1>
      <h1>{data?.quotes.USD.percent_change_24h}</h1>
      <h1>{data?.quotes.USD.percent_change_7d}</h1>
    </div> */
