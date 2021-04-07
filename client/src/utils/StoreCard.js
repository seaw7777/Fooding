import React, { useState } from 'react';
import { Card, Image } from 'react-bootstrap';
import { fetchDeleteStore } from '../_api/User';
import { AiFillHeart } from 'react-icons/ai';

function StoreCard(props) {
  const [checkLike, setcheckLike] = useState(props.like);
  const dislikeStoreHandler = () => {
    if (checkLike === true) {
      setcheckLike(false);
      props.onRemove(props.store.id);
      fetchDeleteStore(props.user, props.store.id)
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      setcheckLike(true);
    }
  };
  return (
    <div>
      <Card style={{ width: '18rem', margin: '1rem auto' }}>
        <div
          style={{
            display: 'flex',
            margin: '0.5rem',
          }}
        >
          <Image
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            roundedCircle
            style={{ width: '50px', height: '50px' }}
          />
          <div style={{ marginLeft: '0.8rem', width: '100%' }}>
            <Card.Title style={{ fontSize: '18px', margin: '0.3rem' }}>
              {props.store.store_name}
            </Card.Title>
            <Card.Text
              style={{
                marginRight: '0.4rem',
                marginLeft: '0.4rem',
                fontSize: '12px',
              }}
            >
              리뷰 개수 : {props.store.review_cnt}
            </Card.Text>
          </div>
          <div>
            {checkLike && (
              <AiFillHeart
                style={{ fontSize: '28px', color: '#faad14' }}
                onClick={dislikeStoreHandler}
              />
            )}
          </div>
        </div>
        <a href={`/store/${props.store.id}`}>
          <Card.Img
            variant="top"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        </a>
        <Card.Body style={{ textAlign: 'center' }}>
          <Card.Text>{props.store.address}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default StoreCard;
