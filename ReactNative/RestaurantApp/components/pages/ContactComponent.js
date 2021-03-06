/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon, Tile } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';
import * as Animatable from 'react-native-animatable';
import { baseUrl } from '../../shared/baseurl';

export default class Contact extends PureComponent {
  sendMail() {
    MailComposer.composeAsync({
      recipients: ['confusion@food.net'],
      subject: 'Enquiry',
      body: 'To whom it may concern:',
    });
  }

  render() {
    return (
      <Animatable.View animation="fadeInDown" duration={500} delay={1000}>
        <Tile title="Contact Information" featured imageSrc={{ url: 'http://localhost:3000/images/maps.png' }}></Tile>
        <Card>
          <Text style={{ margin: 10 }}>
            121, Clear Water Bay Road{'\n'}
            {'\n'}
            Clear Water Bay, Kowloon{'\n'}
            {'\n'}
            HONG KONG{'\n'}
            {'\n'}
            Tel: +852 1234 5678{'\n'}
            {'\n'}
            Fax: +852 8765 4321{'\n'}
            {'\n'}
            Email:confusion@food.net{'\n'}
            {'\n'}
          </Text>
          <Button
            title="Contact us"
            buttonStyle={{ backgroundColor: '#1a515b' }}
            /* icon={<Icon name="envelope-o" type="font-awesome" color="white" />} */
            onPress={this.sendMail}
          />
        </Card>
      </Animatable.View>
    );
  }
}
