import { PropsWithChildren } from 'react';

interface ICardProps {
  classNames?: string;
  children?: React.ReactNode;
}

function Card(props: PropsWithChildren<ICardProps>) {
  return (
    <div className={`${props.classNames} p-8 rounded-xl bg-white border border-sky shadow-lg`}>
      {props.children}
    </div>
  );
}

export default Card;
