import AddressInput from './AddressInput';
import { useAirRights } from './AirRightsProvider';
import Button from './Button';

function Search() {
  const { loading, rawAddress, getAirRightEstimates } = useAirRights();

  const onSubmitForm = async (e: any) => {
    e.preventDefault();
    await getAirRightEstimates(rawAddress);
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium text-navy">
        How much is my airspace worth?
      </h2>
      <span className="text-sm mt-2 mb-4">
        Use our airspace value estimator to get a free, instant airspace-value
        estimate, including nearby airspaces and market trends.
      </span>

      <form onSubmit={onSubmitForm}>
        <AddressInput />

        <Button
          type="submit"
          variant="primary"
          label="Estimate airspace"
          classNames="mt-4"
          progress={loading}
          disabled={loading || !rawAddress}
        />
      </form>
    </div>
  );
}

export default Search;
