import icons from 'lib/icon-paths';

interface IIconProps {
  name: keyof typeof icons;
  classNames?: string;
  customSize?: string;
  beforePaths?: React.ReactNode;
  afterPaths?: React.ReactNode;
}

const defaultClassNames = 'inline-block overflow-visible transition-all';

function Icon(props: IIconProps) {
  const paths = icons[props.name] || [];

  return (
    <svg
      className={`${props.classNames} ${defaultClassNames} ${props.customSize || 'w-4 h-4'}`}
      viewBox="0 0 48 48"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      {props.beforePaths}

      {paths.map((path, i) => (
        <path key={i} d={path} />
      ))}

      {props.afterPaths}
    </svg>
  );
}

export default Icon;
