import { useAirRights } from './AirRightsProvider';
import Card from './Card';

const defaultClassNames =
  'w-full p-3 rounded bg-grey text-black focus:outline-none focus:ring-1 focus:ring-sky';

function AddressInput() {
  const {
    loading,
    rawAddress,
    updateRawAddress,
    addressSuggestions,
    updateAddressSuggestions,
    getAddressSuggestions,
    dataError,
    getAirRightEstimates,
  } = useAirRights();

  const handleInputChange = async (v: string) => {
    updateRawAddress(v);

    if (v === '') {
      updateAddressSuggestions([]);
    } else {
      setTimeout(async () => {
        const suggestions = await getAddressSuggestions(v);
        updateAddressSuggestions(suggestions);
      }, 300);
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
          disabled={loading}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Enter address here"
          className={defaultClassNames}
        />

        {dataError && (
          <span className="text-sm text-danger mt-1">{dataError}</span>
        )}

        {rawAddress !== '' && addressSuggestions.length > 0 && (
          <Card
            paddingStyle="none"
            classNames="absolute rounded-lg w-full max-h-[400px] top-14 z-20"
          >
            {addressSuggestions.map((s, i) => (
              <div
                key={i}
                className={`p-2 ${i !== addressSuggestions.length - 1 ? 'border-b' : ''} border-b-grey cursor-pointer hover:bg-grey`}
                onClick={async () => {
                  updateRawAddress(s.place_name);
                  await getAirRightEstimates(s.place_name);
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
