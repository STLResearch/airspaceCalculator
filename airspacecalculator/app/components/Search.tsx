'use client';

import AddressInput from './AddressInput';
import { useAirRights } from './AirRightsProvider';
import Button from './Button';

function Search() {
  const { loading, ready, getAirRightEstimates } = useAirRights();

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium text-navy">
        How much is my airspace worth?
      </h2>
      <span className="text-sm mt-2 mb-4">
        Use our airspace value estimator to get a free, instant airspace-value
        estimate, including nearby airspaces and market trends.
      </span>

      <AddressInput />

      <Button
        variant="primary"
        label="Estimate airspace"
        classNames="mt-4"
        progress={loading}
        disabled={loading || !ready}
        onClick={getAirRightEstimates}
      />
    </div>
  );
}

export default Search;
