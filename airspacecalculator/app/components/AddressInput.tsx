import { useState } from 'react';
import { useAirRights } from './AirRightsProvider';
import Card from './Card';

const defaultClassNames =
  'w-full p-3 rounded bg-grey text-black focus:outline-none focus:ring-1 focus:ring-sky';

function AddressInput() {
  const [addressSuggestions, setAddressSuggestions] = useState<any[]>([]);

  const { rawAddress, updateRawAddress, getAddressSuggestions } =
    useAirRights();

  const handleInputChange = async (v: string) => {
    updateRawAddress(v);

    if (v === '') {
      setAddressSuggestions([]);
    } else {
      const handler = setTimeout(async () => {
        if (handler) {
          clearTimeout(handler);
        }

        const suggestions = await getAddressSuggestions(v);
        setAddressSuggestions(suggestions);
      }, 500);
    }
  };

  return (
    <div className="grow">
      <label className="block text-disabled text-sm">Address</label>

      <div className="relative flex flex-col">
        <input
          type="text"
          inputMode="text"
          autoComplete="off"
          value={rawAddress}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter address here"
          className={defaultClassNames}
        />

        {rawAddress !== '' && addressSuggestions.length > 0 && (
          <Card
            paddingStyle="none"
            classNames="absolute rounded-lg w-full max-h-[400px] top-14"
          >
            {addressSuggestions.map((s, i) => (
              <div
                key={i}
                className={`p-2 ${i !== addressSuggestions.length - 1 ? 'border-b' : ''} border-b-grey cursor-pointer hover:bg-grey`}
                onClick={() => {
                  updateRawAddress(s.place_name);
                  setAddressSuggestions([]);
                }}
              >
                <div className="flex items-center">
                  <span className="text-sm">{s.place_name}</span>
                </div>
              </div>
            ))}
          </Card>
        )}
      </div>
    </div>
  );
}

export default AddressInput;
