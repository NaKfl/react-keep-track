import * as React from 'react';

export const App = () => {
  const URL = process.env.WEB_API;
  return <div>Hello world ! {URL}</div>;
};
