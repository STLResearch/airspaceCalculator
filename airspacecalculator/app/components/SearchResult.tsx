'use client';

import Button from './Button';
import LocationPin from './LocationPin';
import SearchResultMetadata from './SearchResultMetadata';

function SearchResult(props: any) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center p-4">
        <LocationPin variant="outline" />

        <div className="flex flex-col ml-3">
          <h3 className="text-lg font-medium text-navy">{props.address}</h3>
          <span className="text-sm text-navy">{props.placeName}</span>
        </div>
      </div>

      <div className="my-4">
        <SearchResultMetadata
          icon="buildings"
          title="Estimated price per square foot"
          value="$50"
        />
      </div>

      <SearchResultMetadata
        icon="priceCoin"
        title="Estimated annual passive income"
        value="$1000"
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
          href={`${process.env.NEXT_PUBLIC_AIRSPACE_CLAIM_URL}?propertyAddress=${props.address}`}
        />

        <Button variant="tertiary" label="Estimate another airspace" onClick={() => {}} />
      </div>
    </div>
  );
}

export default SearchResult;
