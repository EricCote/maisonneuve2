import React from 'react';

interface BoxedProps {
  children: React.ReactNode;
  title?: string;
}

export default function Boxed({title, children}: BoxedProps): JSX.Element {
  return (
    <div className="block boxed my-8  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="flex items-start bg-amber-400 dark:bg-amber-700 justify-between p-4 border-b rounded-t dark:border-gray-600">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h4>
      </div>
      <div className="font-normal p-6 text-gray-700 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
}
