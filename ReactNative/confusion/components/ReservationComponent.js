/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-datepicker';
import { Card, Tile } from 'react-native-elements';
import * as Calendar from 'expo-calendar';
/* import { Appearance, useColorScheme } from 'react-native-appearance';
 */
const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    marginTop: 100,
  },
  formLabel: {
    marginTop: -100,
    fontSize: 15,
    flex: 2,
  },
  formItem: {
    flex: 1,
    marginTop: -100,
  },
  modal: {
    justifyContent: 'center',
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
  },
});

const zoomOut = {
  0: {
    opacity: 0,
    scale: 0,
  },
  0.5: {
    opacity: 0.5,
    scale: 0.5,
  },
  1: {
    opacity: 1,
    scale: 1,
  },
};
class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: '',
      showModal: false,
    };
  }

  static navigationOptions = {
    title: 'Reserve Table',
  };

  toggleModal() {
    this.setState({ showModal: true });
  }

  dismissModal() {
    this.setState({ showModal: false });
  }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: '',
      showModal: false,
    });
  }

  handleReservation() {
    console.log(JSON.stringify(this.state));
    const message = `Number of guests: ${this.state.guests}\nSmoking? ${this.state.smoking}Date and Time: ${this.state.date}`;
    Alert.alert(
      'Your Reservation OK?',
      message,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Reservation Cancelled');
            this.resetForm();
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('Reservation Submitted');
            this.resetForm();
            this.presentLocalNotification(this.state.date);
            this.addReservationToCalendar(this.state.date);
          },
          style: 'ok',
        },
      ],
      { cancelable: false }
    );
    console.log(JSON.stringify(this.state));
    /* this.toggleModal(); */
  }

  // /////////////NOTIFICATIONS//////////////////////
  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    console.log('THIS IS STATUS FROM NOTIFICATION', permission.status);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    console.log('THIS IS OUR FINAL PERMISSION', permission);
    return permission;
  }

  async presentLocalNotification(date) {
    console.log('PRESENTLOCALNOTIFICATION I AM CALLED FORM MODAL');
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: `Reservation for ${date} requested`,
      ios: {
        sound: true,
      },
      android: {
        sound: true,
        vibrate: true,
        color: '#512DA8',
      },
    });
  }

  async obtainCalendarPermission() {
    let permission = await Permissions.getAsync(Permissions.CALENDAR);
    console.log('THIS IS STATUS FROM NOTIFICATION', permission.status);
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(Permissions.CALENDAR);
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    console.log('THIS IS OUR FINAL PERMISSION', permission);
    return permission;
  }

  /* async grabCalendar() {
    const Calendars = await Calendar.getCalendarsAsync();
    console.log('THIS IS CALENDAR FROM GRABCALENDAR', Calendars);
    return Calendars;
  } */

  /*  async addReservationToCalendar(date) {
     console.log('PRESENTLOCALNOTIFICATION I AM CALLED FORM MODAL');
     await this.obtainCalendarPermission();
     Calendar.createEventAsync(Calendar.DEFAULT, {
       title: 'Con Fusion Table Reservation',
       body: `Reservation for ${new Date(Date.parse(date))} requested`,
       location:
         '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
       timeZone: 'Asia/Hong_Kong',
       ios: {
         sound: true,
       },
       android: {
         sound: true,
         vibrate: true,
         color: '#512DA8',
       },
     });
   } */

  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();
    const startDate = new Date(Date.parse(date));
    const endDate = new Date(Date.parse(date) + 2 * 60 * 60 * 1000); // 2 hours
    Calendar.createEventAsync(Calendar.DEFAULT, {
      title: 'Con Fusion Table Reservation',
      location:
        '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
      startDate,
      endDate,
      timeZone: 'Asia/Hong_Kong',
    });
    Alert.alert('Reservation has been added to your calendar');
  }

  // ///////////////////////////////////////////////
  /*   handleReservation() {
      Alert.alert(
          'Your Reservation OK?',
          'Number of guests: ' + this.state.guests + '\n' + 'Smoking? ' + (this.state.smoking ? 'Yes' : 'No') + '\n' + 'Date and Time: ' + this.state.date,
          [
              {
                  text: 'Cancel',
                  style: 'cancel',
                  onPress: () => this.resetForm(),
              },
              {
                  text: 'OK',
                  onPress: () => {
                      console.log(JSON.stringify(this.state));
                      this.resetForm();
                  },
              },
          ],
          { cancelable: false },
      );
  }

  resetForm() {
      this.setState({
          guests: 1,
          smoking: false,
          date: '',
          showModal: false
      });
  } */

  render() {
    const { guests, date, smoking, showModal } = this.state;

    /*    const colorScheme = useColorScheme;
       const isDarkModeEnabled = colorScheme === 'dark'; */

    return (
      <ScrollView>
        {/* <Animatable.View animation={zoomOut}> */}
        <Animatable.View animation="fadeInDown" duration={500} delay={1000}>
          <Tile
            title="Reserve Table"
            featured
            imageSrc={{ url: 'http://localhost:3000/images/reserved.png' }}
          ></Tile>
          <Card>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Number of Guests</Text>
              <Picker
                style={styles.formItem}
                selectedValue={guests}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ guests: itemValue })
                }
              >
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
                <Picker.Item label="6" value="6" />
              </Picker>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
              <Switch
                style={styles.formItem}
                value={smoking}
                onTintColor="#512DA8"
                onValueChange={value => this.setState({ smoking: value })}
              ></Switch>
            </View>
            <View style={styles.formRow}>
              <Text style={styles.formLabel}>Date and Time</Text>
              <DatePicker
                /* isDarkModeEnabled={isDarkModeEnabled} */
                style={{ flex: 2, marginRight: 20 }}
                date={date}
                format=""
                mode="datetime"
                placeholder="select date and Time"
                minDate="2017-01-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  datePicker: {
                    /*                   backgroundColor: useColorScheme === 'dark' ? '#222' : 'white',
                     */ backgroundColor: '#222',
                  },
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    marginLeft: 36,
                    Color: 'black',
                  },
                  // ... You can check the source to find the other keys.
                }}
                // eslint-disable-next-line no-shadow
                onDateChange={date => {
                  this.setState({ date });
                }}
              />
            </View>
            <View style={styles.formRow}>
              <Button
                onPress={() => this.handleReservation()}
                title="Reserve"
                color="#512DA8"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </Card>
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onDismiss={() => this.dismissModal()}
            onRequestClose={() => this.dismissModal()}
          >
            <Card>
              <SafeAreaView>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>
                    Is your Reservation okay?
                  </Text>
                  <Text style={styles.modalText}>
                    Number of Guests: {guests}
                  </Text>
                  <Text style={styles.modalText}>
                    Smoking?: {smoking ? 'Yes' : 'No'}
                  </Text>
                  <Text style={styles.modalText}>Date and Time: {date}</Text>
                  <Button
                    onPress={() => {
                      this.dismissModal();
                      this.resetForm();
                    }}
                    color="#512DA8"
                    title="Cancel"
                  />
                  <Button
                    onPress={() => {
                      this.presentLocalNotification(this.state.date);
                      this.dismissModal();
                      this.resetForm();
                    }}
                    color="#512DA8"
                    title="OK"
                  />
                </View>
              </SafeAreaView>
            </Card>
          </Modal>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Reservation;
