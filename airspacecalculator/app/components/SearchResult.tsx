import { useAirRights } from './AirRightsProvider';
import Button from './Button';
import LocationPin from './LocationPin';
import SearchResultMetadata from './SearchResultMetadata';

function SearchResult() {
  const { data: airRightsData, rawAddress, clearEstimation } = useAirRights();

  const shortAddress = rawAddress.split(',')[0];
  const addressSuffix = rawAddress.split(',').slice(1).join(',');

  return (
    <div className="flex flex-col">
      <div className="flex items-center p-4">
        <LocationPin variant="outline" />

        <div className="flex flex-col ml-3">
          <h3 className="text-lg font-medium text-navy">{shortAddress}</h3>
          <span className="text-sm text-navy">{addressSuffix}</span>
        </div>
      </div>

      <div className="my-4">
        <SearchResultMetadata
          icon="buildings"
          title="Estimated price per square foot"
          value={
            airRightsData.main.estimate
              ? airRightsData.main.estimate.value
              : '0'
          }
        />
      </div>

      <SearchResultMetadata
        icon="priceCoin"
        title="Estimated annual passive income"
        value={
          airRightsData.main.estimate
            ? airRightsData.main.estimate.annualProjection
            : '0'
        }
      />

      <div className="flex flex-col gap-3 mt-4">
        <Button
          variant="primary"
          label="Join trading waitlist"
          href={process.env.NEXT_PUBLIC_TRADING_WAITLIST_URL}
        />

        <Button
          variant="secondary"
          label="Claim my airspace"
          href={
            `${process.env.NEXT_PUBLIC_AIRSPACE_CLAIM_URL}` +
            `?propertyAddress=${encodeURIComponent(rawAddress)}`
          }
        />

        <Button
          variant="tertiary"
          label="Estimate another airspace"
          onClick={clearEstimation}
        />
      </div>
    </div>
  );
}

export default SearchResult;
