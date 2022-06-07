/* eslint-disable no-console */
import React from 'react';

const useLog = (args: unknown) => {
  React.useEffect(() => {
    console.log(args);
  }, [args]);
};

export default useLog;
