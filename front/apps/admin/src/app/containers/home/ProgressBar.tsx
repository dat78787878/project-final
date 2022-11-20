import React from 'react';

const ProgressBar = ({ bgcolor, completed }: any) => {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
  };

  const fillerStyles: any = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
    position: 'relative',
  };

  const labelStyles: any = {
    padding: 0,
    fontWeight: 'bold',
    fontSize: '1rem',
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translate(0, -50%)',
    color: 'white',
  };
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
