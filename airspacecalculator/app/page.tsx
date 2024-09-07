import Card from 'components/Card';
import Search from 'components/Search';
import SearchResult from 'components/SearchResult';

export default function Page() {
  return (
    <Card>
      <Search />
      <SearchResult address="116 Elm Street" placeName="New York, New York, United States" />
    </Card>
  );
}
