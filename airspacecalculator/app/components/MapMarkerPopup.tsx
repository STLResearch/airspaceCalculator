import { formatAmount } from 'lib/currency';
import Icon from './Icon';

const amountLabelClassNames =
  'text-sm font-semibold text-icon ml-1 font-campton';

function getIcon(iconName: any) {
  return <Icon classNames="fill-blue" name={iconName} customSize="w-3 h-3" />;
}

interface IMapMarkerPopupProps {
  estimatedValue: string;
  estimatedAnnualProjection: string;
  isAverageEstimate?: boolean;
  classNames?: string;
}

function MapMarkerPopup(props: IMapMarkerPopupProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-1">
          {getIcon('buildings')}
          <span className={amountLabelClassNames}>
            {formatAmount(Number(props.estimatedValue))}
          </span>
        </div>

        <div className="flex items-center ml-1">
          {getIcon('priceCoin')}
          <span className={amountLabelClassNames}>
            {formatAmount(Number(props.estimatedAnnualProjection))}
          </span>
        </div>
      </div>

      {props.isAverageEstimate && (
        <span className="text-xs text-icon font-campton">
          Estimated value is based on area statistics.
        </span>
      )}
    </div>
  );
}

export default MapMarkerPopup;
