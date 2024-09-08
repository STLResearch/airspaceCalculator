import { PropsWithChildren } from 'react';

function AppLayout(props: PropsWithChildren) {
  return (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden">
      {props.children}
    </div>
  );
}

export default AppLayout;
