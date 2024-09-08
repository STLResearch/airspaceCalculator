interface IButtonProps {
  classNames?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  disabled?: boolean;
  progress?: boolean;
  href?: string;
  onClick?: () => any;
}

const defaultClassNames =
  'w-full p-3 rounded-lg flex items-center justify-center focus:outline-none';

function getButtonStyle(props: IButtonProps) {
  if (props.disabled || props.progress) {
    return `bg-disabled text-grey ${props.progress ? 'animate-pulse' : ''}`;
  }

  if (props.variant === 'primary') {
    return 'bg-blue text-white';
  } else if (props.variant === 'secondary') {
    return 'bg-navy text-white';
  } else if (props.variant === 'tertiary') {
    return 'bg-transparent border border-blue text-blue';
  }
}

function Button(props: IButtonProps) {
  const style = getButtonStyle(props);

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
      className={`${defaultClassNames} ${style} ${props.classNames} ${style}`}
      type="button"
      disabled={props.disabled}
      onClick={handleClick}
    >
      <span className="text-sm">{props.label}</span>
    </button>
  );
}

export default Button;
