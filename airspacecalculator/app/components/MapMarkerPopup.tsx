import { formatAmount } from 'lib/currency';
import Card from './Card';
import Icon from './Icon';

const amountLabelClassNames = 'text-sm font-semibold text-icon ml-1';

function getIcon(iconName: any) {
  return <Icon classNames="fill-blue" name={iconName} customSize="w-3 h-3" />;
}

interface IMapMarkerPopupProps {
  estimatedValue: string;
  estimatedAnnualProjection: string;
}

function MapMarkerPopup(props: IMapMarkerPopupProps) {
  return (
    <Card paddingStyle="none" classNames="rounded p-1">
      <div className="flex items-center justify-between">
        <div>
          {getIcon('buildings')}
          <span className={amountLabelClassNames}>
            {formatAmount(Number(props.estimatedValue))}
          </span>
        </div>

        <div>
          {getIcon('priceCoin')}
          <span className={amountLabelClassNames}>
            {formatAmount(Number(props.estimatedAnnualProjection))}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default MapMarkerPopup;
