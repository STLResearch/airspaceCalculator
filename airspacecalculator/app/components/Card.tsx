import { PropsWithChildren } from 'react';

interface ICardProps {
  classNames?: string;
  paddingStyle: 'none' | 'thin' | 'thick';
}

const defaultClassNames = 'bg-white border border-sky shadow-card';

function Card(props: PropsWithChildren<ICardProps>) {
  let padding = 'p-0';
  if (props.paddingStyle === 'thin') {
    padding = 'p-4';
  } else if (props.paddingStyle === 'thick') {
    padding = 'p-8';
  }
  return (
    <div className={`${defaultClassNames} ${padding} ${props.classNames}`}>
      {props.children}
    </div>
  );
}

export default Card;
