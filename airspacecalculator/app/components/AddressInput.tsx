import { useAirRights } from './AirRightsProvider';

const defaultClassNames =
  'w-full p-3 rounded bg-grey text-black focus:outline-none focus:ring-1 focus:ring-sky';

function AddressInput() {
  const { rawAddress, updateRawAddress } = useAirRights();

  const handleInputChange = (v: string) => {
    updateRawAddress(v);
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

        {/* <Card classNames="absolute bg-white w-full top-14">Meee</Card> */}
      </div>
    </div>
  );
}

export default AddressInput;
