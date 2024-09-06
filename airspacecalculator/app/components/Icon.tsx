import icons from 'lib/icon-paths';

interface IIconProps {
  name: keyof typeof icons;
  customSize?: string;
}

const classNames = `inline-block fill-current overflow-visible transition-all`;

function Icon(props: IIconProps) {
  const paths = icons[props.name] || [];

  return (
    <svg
      className={`${classNames} ${props.customSize || 'w-4 h-4'}`}
      viewBox="0 0 48 48"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      {paths.map((path, i) => (
        <path key={i} d={path} />
      ))}
    </svg>
  );
}

export default Icon;
