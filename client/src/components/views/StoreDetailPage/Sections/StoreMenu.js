import React from 'react';
import './StoreDetailPage.css';
import InfiniteScroll from 'react-infinite-scroll-component';

function StoreMenu(props) {
  let Menus = props.Menus;
  const renderMenu = Menus.map((menu, indx) => {
    return (
      <p>
        {menu.name} {menu.price}
      </p>
    );
  });
  return (
    <div
      style={{
        height: '280px',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <InfiniteScroll
        dataLength={Menus.length}
        style={{
          width: '340px',
          backgroundSize: '100%',
          backgroundImage: `URL('/images/menu.png')`,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '6rem auto',
          }}
        >
          {Menus.map((menu, indx) => (
            <p style={{ margin: '0.5rem auto' }}>
              {menu.name} {menu.price}
            </p>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default StoreMenu;
