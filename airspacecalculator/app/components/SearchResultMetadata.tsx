import { formatAmount } from 'lib/currency';
import Icon from './Icon';

interface ISearchResultMetadataProps {
  icon: string;
  title: string;
  value: string;
}

function SearchResultMetadata(props: ISearchResultMetadataProps) {
  return (
    <div className="flex items-center bg-sky p-4 rounded-xl">
      <Icon classNames="fill-blue" name={props.icon as any} />

      <div className="flex flex-col ml-3">
        <span className="text-sm text-navy">{props.title}</span>
        <span className="text-lg font-bold text-navy mt-1">
          {formatAmount(Number(props.value))}
        </span>
      </div>
    </div>
  );
}

export default SearchResultMetadata;
