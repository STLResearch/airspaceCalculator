import { useAirRights } from './AirRightsProvider';
import Card from './Card';
import Search from './Search';
import SearchResult from './SearchResult';

function Calculator() {
  const { data: airRightsData } = useAirRights();

  return (
    <Card
      paddingStyle="thin"
      classNames="flex flex-col sm:rounded-xl sm:w-[450px]"
    >
      {airRightsData ? <SearchResult /> : <Search />}
    </Card>
  );
}

export default Calculator;
