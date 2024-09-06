'use client';

import React from 'react';
import axios from 'axios';
import Estimate from '../component/estimate';
import Map from '../component/Map';

function Modal() {
  const [address, setAddress] = React.useState('');
  const [addresses, setAddresses] = React.useState([]);
  const [showOptions, setShowOptions] = React.useState(false);
  const [loadingEstimate, setLoadingEstimate] = React.useState(false);
  const [showEstimateModal, setShowEstimateModal] = React.useState(false);

  const [apidata, setApiData] = React.useState([]);
  const [apiError, setApiError] = React.useState('');

  const handleChangeAddress = (value) => {
    setAddress(value);
    setShowOptions(true);
  };

  const handleSelectAddress = async (address) => {
    setAddress(address);
    setShowOptions(false);
  };

  const handleReEstimate = () => {
    setAddress('');
    setAddresses([]);
    setApiData([]);
    setShowEstimateModal(false);
  };

  const getSkyTradeData = async () => {
    setLoadingEstimate(true);

    try {
      const encodedAddress = encodeURIComponent(address);
      const skyTradeApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/air-rights/search/address?address=${encodedAddress}`;
      const apidata = await axios.get(skyTradeApiUrl);

      if (!apidata.data.status) {
        setApiError(apidata.data.message);
        setApiData([]);
      } else {
        setApiError('');
        setApiData(apidata.data.result);
      }

      setLoadingEstimate(false);
    } catch (error) {}
  };

  React.useEffect(() => {
    if (!address) return setShowOptions(false);

    let timeoutId;

    const getAddresses = async () => {
      timeoutId = setTimeout(async () => {
        try {
          const mapboxGeocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

          const response = await fetch(mapboxGeocodingUrl);

          if (!response.ok) throw new Error('Error while getting addresses');

          const data = await response.json();
          if (data.features && data.features.length > 0) {
            setAddresses(data.features);
          } else {
            setAddresses([]);
          }
        } catch (error) {}
      }, 500);
    };

    getAddresses();

    return () => clearTimeout(timeoutId);
  }, [address, showEstimateModal]);

  return (
    <>
      <div className="container flex h-screen items-center justify-between md:p-24 p-7 ">
        {' '}
        {!showEstimateModal ? (
          <div className="bg-white shadow-md rounded-[12px] md:p-12 p-5  mx-auto  w-full">
            <h2 className="text-[2.625rem] text-center text-[campton] text-[#0E2B56] font-medium mb-4 tracking-[-.1rem]">
              How much is my airspace worth?
            </h2>
            <p className="text-center text-gray-600 mb-12 h-[60px] leading-[30px]">
              Use our airspace value estimator to get a free, instant airspace-value estimate, see nearby airspaces and
              market trends.
            </p>
            <div className="relative w-full md:w-[90%] my-auto mx-auto flex flex-col gap-[10px]">
              <input
                required
                type="text"
                autoComplete="off"
                value={address}
                onChange={(e) => handleChangeAddress(e.target.value)}
                placeholder="search airspace"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-[#ECECEC] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {showOptions && (
                <div className="absolute left-0 top-[55px] w-full flex-col bg-white max-h-[250px] overflow-auto ">
                  {addresses.map((item) => {
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectAddress(item.place_name)}
                        className="w-full rounded-xl p-5 text-left text-[#222222] hover:bg-gray-500 cursor-pointer hover:text-white mb-2"
                        style={{
                          borderTop: '0.2px solid #222222',
                        }}
                      >
                        {item.place_name}
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => {
                  getSkyTradeData();
                  setShowEstimateModal(true);
                }}
                className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:border-[#ECECEC]"
              >
                Estimate my Airspace
              </button>
            </div>
          </div>
        ) : (
          showEstimateModal && (
            <Estimate address={address} apidata={apidata} loading={loadingEstimate} onReEstimate={handleReEstimate} />
          )
        )}
        <Map coordinates={apidata} />
      </div>
    </>
  );
}

export default Modal;
