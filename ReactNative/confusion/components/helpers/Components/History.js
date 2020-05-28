import React from 'react';
import { Text, Tile, Card } from 'react-native-elements';

export default function History() {
  return (
    <>
      <Tile
        title="Our Leadership"
        featured
        // eslint-disable-next-line global-require
        imageSrc={{ url: 'http://localhost:3000/images/history.png' }}
      >
        <Card style={{ margin: 10 }}>
          Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong
          Kong.
          {'\n'}
          {'\n'}With its unique brand of world fusion cuisine that can be found nowhere else,it enjoys patronage from
          the A-list clientele in Hong Kong.
          {'\n'}
          {'\n'}Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on
          your plate the next time you visit us.
          {'\n'}
          {'\n'}
          {'\n'}
          The restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr.
          Peter Pan, that featured for the first time the world's best cuisines in a pan.
        </Card>
      </Tile>
    </>
  );
}
