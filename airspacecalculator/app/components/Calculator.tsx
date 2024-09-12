import Image from 'next/image';
import logo from '../../public/logo.svg';
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

      <div className="flex items-center justify-center mt-4">
        <span className="text-navy text-xs">Powered by</span>

        <a href={process.env.NEXT_PUBLIC_WEBSITE_URL} target="_blank">
          <Image
            src={logo}
            alt="SkyTrade Logo"
            className="scale-75 -ml-2 transition transform hover:scale-[0.80]"
          />
        </a>
      </div>
    </Card>
  );
}

export default Calculator;
