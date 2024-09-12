import axios from 'axios';
import useDebounce from 'lib/debounce';
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
  dataError: string;
  updateRawAddress: (address: string) => void;
  getAirRightEstimates: (address: string) => Promise<void>;
  clearEstimation: () => void;
}

const Context = createContext<IAirRightsContext>({
  rawAddress: '',
  addressSuggestions: [],
  data: undefined,
  dataError: '',
  loading: false,
  updateRawAddress: () => null,
  getAirRightEstimates: async () => undefined,
  clearEstimation: () => null,
});

export const useAirRights = (): IAirRightsContext =>
  useContext<IAirRightsContext>(Context);

function AirRightsProvider(props: PropsWithChildren) {
  const [rawAddress, setRawAddress] = useState('');
  const addressValue = useDebounce(rawAddress, 300);

  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(undefined);
  const [dataError, setDataError] = useState('');

  const updateRawAddress = (address: string) => {
    setRawAddress(address);
  };

  useEffect(() => {
    async function getAddressSuggestions(address: string) {
      if (addressValue === '') {
        setAddressSuggestions([]);
      } else {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_MAPBOX_API_URL}/${encodeURIComponent(
              address
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
    }

    getAddressSuggestions(addressValue);
  }, [addressValue]);

  const getAirRightEstimates = async (address: string) => {
    setDataError('');
    setAddressSuggestions([]);
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/air-rights/search/address` +
          `?address=${encodeURIComponent(address)}`
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

  return (
    <Context.Provider
      value={{
        rawAddress,
        addressSuggestions,
        loading,
        data,
        dataError,
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
