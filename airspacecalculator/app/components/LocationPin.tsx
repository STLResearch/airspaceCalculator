import { PropsWithChildren } from 'react';
import Icon from './Icon';

interface ILocationPinProps {
  variant: 'primary' | 'secondary' | 'outline';
}

function LocationPin(props: PropsWithChildren<ILocationPinProps>) {
  let iconFill = 'fill-none';
  if (props.variant === 'primary') {
    iconFill = 'fill-navy';
  } else if (props.variant === 'secondary') {
    iconFill = 'fill-sky';
  }

  const iconStroke = props.variant === 'outline' ? 'stroke-icon' : 'stroke-white';

  return (
    <Icon
      name="locationPin"
      customSize="w-6 h-6"
      classNames={`${iconFill} ${iconStroke} stroke-2`}
      beforePaths={
        props.variant === 'outline' ? (
          <circle
            cx="24"
            cy="20"
            r="6"
            stroke="#222222"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : undefined
      }
      afterPaths={
        props.variant !== 'outline' ? (
          <ellipse cx="24" cy="20.0007" rx="6" ry="6" fill="white" />
        ) : undefined
      }
    />
  );
}

export default LocationPin;
