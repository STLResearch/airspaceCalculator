import axios from 'axios';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface IAirRightsContext {
  rawAddress: string;
  addressSuggestions: any[];
  loading: boolean;
  data: any;
  dataError: string;
  updateRawAddress: (address: string) => void;
  updateAddressSuggestions: (suggestions: any[]) => void;
  getAddressSuggestions: (address: string) => Promise<any[]>;
  getAirRightEstimates: () => Promise<void>;
  clearEstimation: () => void;
}

const Context = createContext<IAirRightsContext>({
  rawAddress: '',
  addressSuggestions: [],
  data: undefined,
  dataError: '',
  loading: false,
  updateRawAddress: () => null,
  updateAddressSuggestions: () => null,
  getAddressSuggestions: async () => [],
  getAirRightEstimates: async () => undefined,
  clearEstimation: () => null,
});

export const useAirRights = (): IAirRightsContext =>
  useContext<IAirRightsContext>(Context);

function AirRightsProvider(props: PropsWithChildren) {
  const [rawAddress, setRawAddress] = useState('');
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const [dataError, setDataError] = useState('');

  const updateRawAddress = (address: string) => {
    setRawAddress(address);
  };

  const updateAddressSuggestions = (suggestions: any[]) => {
    setAddressSuggestions(suggestions);
  };

  const getAirRightEstimates = async () => {
    setDataError('');
    setAddressSuggestions([]);
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
      } else {
        setDataError(responseData.message);
      }
    } catch (error) {
      setData(undefined);
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
        addressSuggestions,
        loading,
        data,
        dataError,
        updateRawAddress,
        updateAddressSuggestions,
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
