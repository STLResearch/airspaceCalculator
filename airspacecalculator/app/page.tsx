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

        <div className="absolute">
          <Calculator />
        </div>
      </AirRightsProvider>
    </AppLayout>
  );
}
