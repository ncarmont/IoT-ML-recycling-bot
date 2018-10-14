import React from 'react';
import { Meteor } from 'meteor/meteor';

import PrivateHeader from './PrivateHeader';



export default () => {
  return (
    <div>
      <PrivateHeader title="ML Recycling IoT Bot"/>
      <div className="page-content">
        Dashboard page content
      </div>
    </div>
  );
};
