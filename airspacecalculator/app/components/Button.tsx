import { PropsWithChildren } from 'react';

interface IButtonProps {
  classNames?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  href?: string;
  onClick?: () => any;
  children?: React.ReactNode;
}

const defaultClassNames =
  'w-full p-3 rounded-lg flex items-center justify-center focus:outline-none';

function Button(props: PropsWithChildren<IButtonProps>) {
  let style = defaultClassNames;

  if (props.variant === 'primary') {
    style += ' bg-blue text-white';
  } else if (props.variant === 'secondary') {
    style += ' bg-navy text-white';
  } else {
    style += ' bg-transparent border border-blue text-blue';
  }

  const handleClick = () => {
    if (props.href) {
      window.open(props.href, '_blank');
      return;
    }

    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button
      className={`${props.classNames} ${style}`}
      type="button"
      disabled={props.disabled}
      onClick={handleClick}
    >
      <span className="text-sm">{props.label}</span>
    </button>
  );
}

export default Button;
