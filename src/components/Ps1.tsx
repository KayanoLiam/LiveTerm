import React from 'react';
import envConfig from '../utils/env-config';

export const Ps1 = () => {
  return (
    <div>
      <span className="text-light-yellow dark:text-dark-yellow">
        {envConfig.ps1_username}
      </span>
      <span className="text-light-gray dark:text-dark-gray">@</span>
      <span className="text-light-green dark:text-dark-green">
        {envConfig.ps1_hostname}
      </span>
      <span className="text-light-gray dark:text-dark-gray">:$ ~ </span>
    </div>
  );
};

export default Ps1;
