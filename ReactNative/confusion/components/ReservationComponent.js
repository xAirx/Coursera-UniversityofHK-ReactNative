import React, { Component } from 'react';

import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  Modal,
  SafeAreaView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20,
  },
  formLabel: {
    fontSize: 18,
    flex: 2,
  },
  formItem: {
    flex: 1,
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
  handleReservation() {
    console.log(JSON.stringify(this.state));
    this.toggleModal();
  }

  render() {
    const { guests, date, smoking, showModal } = this.state;

    return (
      <ScrollView>
        <Animatable.View animation={zoomOut}>
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
              style={{ flex: 2, marginRight: 20 }}
              date={date}
              format=""
              mode="datetime"
              placeholder="select date and Time"
              minDate="2017-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0,
                },
                dateInput: {
                  marginLeft: 36,
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
          <Modal
            animationType="slide"
            transparent={false}
            visible={showModal}
            onDismiss={() => this.dismissModal()}
            onRequestClose={() => this.dismissModal()}
          >
            <SafeAreaView>
              <View style={styles.modal}>
                <Text style={styles.modalTitle}>Is your Reservation okay?</Text>
                <Text style={styles.modalText}>Number of Guests: {guests}</Text>
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
                    this.dismissModal();
                    this.resetForm();
                  }}
                  color="#512DA8"
                  title="OK"
                />
              </View>
            </SafeAreaView>
          </Modal>
        </Animatable.View>
      </ScrollView>
    );
  }
}

export default Reservation;
