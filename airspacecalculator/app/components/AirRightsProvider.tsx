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
  loading: boolean;
  data: any;
  updateRawAddress: (address: string) => void;
  getAddressSuggestions: (address: string) => Promise<any[]>;
  getAirRightEstimates: () => Promise<void>;
  clearEstimation: () => void;
}

const Context = createContext<IAirRightsContext>({
  rawAddress: '',
  data: undefined,
  loading: false,
  updateRawAddress: () => null,
  getAddressSuggestions: async () => [],
  getAirRightEstimates: async () => undefined,
  clearEstimation: () => null,
});

export const useAirRights = (): IAirRightsContext =>
  useContext<IAirRightsContext>(Context);

function AirRightsProvider(props: PropsWithChildren) {
  const [rawAddress, setRawAddress] = useState('');
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

  const getAddressSuggestions = async (address: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_MAPBOX_API_URL}/${encodeURIComponent(
          address
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      );

      const dataFeatures = response.data.features;

      if (dataFeatures && dataFeatures.length > 0) {
        return dataFeatures;
      }
    } catch (error) {
      return [];
    }
  };

  return (
    <Context.Provider
      value={{
        rawAddress,
        loading,
        data,
        updateRawAddress,
        getAddressSuggestions,
        getAirRightEstimates,
        clearEstimation,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default AirRightsProvider;
