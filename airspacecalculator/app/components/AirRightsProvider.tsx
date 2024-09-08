'use client';

import axios from 'axios';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IAirRightsContext {
  rawAddress: string;
  addressSuggestions: any[];
  loading: boolean;
  data: any;
  updateRawAddress: (address: string) => void;
  getAirRightEstimates: () => Promise<void>;
  clearEstimation: () => void;
}

const Context = createContext<IAirRightsContext>({
  rawAddress: '',
  addressSuggestions: [],
  data: undefined,
  loading: false,
  updateRawAddress: () => null,
  getAirRightEstimates: async () => undefined,
  clearEstimation: () => null,
});

export const useAirRights = (): IAirRightsContext =>
  useContext<IAirRightsContext>(Context);

function AirRightsProvider(props: PropsWithChildren) {
  const [rawAddress, setRawAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);

  const updateRawAddress = (address: string) => {
    setRawAddress(address);
  };

  const getAirRightEstimates = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/air-rights/search/address` +
          `?address=${encodeURIComponent(rawAddress)}`
      );

      const responseData = response.data;
      const result = responseData.status ? (responseData.result as any[]) : [];

      if (result.length > 0) {
        const main = result.find((r) => r.isMain);
        const nearby = result.filter((r) => !r.isMain);

        setData({ main, nearby });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const clearEstimation = () => {
    setData(undefined);
    setRawAddress('');
  };

  useEffect(() => {
    async function getAddressSuggestions() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_MAPBOX_API_URL}/${encodeURIComponent(
            rawAddress
          )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
        );

        const dataFeatures = response.data.features;

        if (dataFeatures && dataFeatures.length > 0) {
          setAddressSuggestions(dataFeatures);
        }
      } catch (error) {
        setAddressSuggestions([]);
      }
    }

    const handler = setTimeout(async () => {
      if (rawAddress !== '') {
        await getAddressSuggestions();
      } else {
        setAddressSuggestions([]);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [rawAddress]);

  return (
    <Context.Provider
      value={{
        rawAddress,
        addressSuggestions,
        loading,
        data,
        updateRawAddress,
        getAirRightEstimates,
        clearEstimation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default AirRightsProvider;
