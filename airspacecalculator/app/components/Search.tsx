'use client';
import { PropsWithChildren } from 'react';
import Button from './Button';

interface ISearchProps {}

function Search(props: PropsWithChildren<ISearchProps>) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-medium text-navy">How much is my airspace worth?</h2>
      <span className="text-sm mt-2">
        Use our airspace value estimator to get a free, instant airspace-value estimate, including
        nearby airspaces and market trends.
      </span>

      <Button
        variant="primary"
        label="Estimate my airspace"
        classNames="mt-4"
        onClick={() => {
          console.log('njnmmn');
        }}
      />
    </div>
  );
}

export default Search;
