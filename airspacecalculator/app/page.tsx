'use client';

import AirRightsProvider from 'components/AirRightsProvider';
import AppLayout from 'components/AppLayout';
import Calculator from 'components/Calculator';
import Map from 'components/Map';

export default function Page() {
  return (
    <AppLayout>
      <AirRightsProvider>
        <Map />

        <div className="absolute w-full sm:w-auto sm:top-1/2 sm:-mt-[250px] sm:left-4">
          <Calculator />
        </div>
      </AirRightsProvider>
    </AppLayout>
  );
}
