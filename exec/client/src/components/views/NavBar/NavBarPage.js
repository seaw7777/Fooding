import React from 'react';

function NavBarPage() {
  return (
    <div>
      <div
        style={{
          backgroundColor: '#ffe7ba',
          height: '50px',
        }}
      >
        <span style={{ marginLeft: '1rem' }}>
          <img
            src="/images/logo.png"
            alt="logo"
            style={{ margin: '0', maxWidth: '80px', maxHeight: '60px' }}
          />
        </span>
      </div>
    </div>
  );
}

export default NavBarPage;
