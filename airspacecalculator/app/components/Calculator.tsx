'use client';

import { useAirRights } from 'components/AirRightsProvider';
import Card from 'components/Card';
import Search from 'components/Search';
import SearchResult from 'components/SearchResult';

function Calculator() {
  const { data: airRightsData } = useAirRights();

  return (
    <Card paddingStyle="thin">
      {airRightsData ? <SearchResult /> : <Search />}
    </Card>
  );
}

export default Calculator;
