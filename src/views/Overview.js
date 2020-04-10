import React from 'react';
import { Redirect } from 'react-router-dom';



const Overview = () => (
  <Redirect to={new Date().toISOString().slice(0, 10)} />
);

export default Overview;
