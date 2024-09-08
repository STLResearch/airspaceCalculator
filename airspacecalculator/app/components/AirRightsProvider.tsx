'use client';

import axios from 'axios';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface IAirRightsContext {
  rawAddress: string;
  loading: boolean;
  data: any;
  updateRawAddress: (address: string) => void;
  getAirRightEstimates: () => Promise<void>;
  clearEstimation: () => void;
}

const Context = createContext<IAirRightsContext>({
  rawAddress: '',
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

  return (
    <Context.Provider
      value={{
        rawAddress,
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
