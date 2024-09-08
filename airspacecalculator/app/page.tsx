import AirRightsProvider from 'components/AirRightsProvider';
import Calculator from 'components/Calculator';

export default function Page() {
  return (
    <AirRightsProvider>
      <Calculator />
    </AirRightsProvider>
  );
}
