import React from 'react';
import './Components.css';

const NoNetwork = () => {
  const onRefresh = () => {
    window.location.reload();
  };
  return (
    <div className='nonet-container'>
      <h1>No Network Connection</h1>
      <p>Please check your internet connection and try again.</p>
      <img
        className='nonet-image'
        src={`${process.env.PUBLIC_URL}/images/nonetwork.png`}
        alt='img'
      />
      <br />
      <button className='btn btn-primary mt-5' onClick={onRefresh}>
        Refresh
      </button>
    </div>
  );
};

export default NoNetwork;
