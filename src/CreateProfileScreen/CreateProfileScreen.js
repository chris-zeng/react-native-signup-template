import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class CreateProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      phone: null,
      gender: null,
      birthdate: null,
    };
    this.createProfile = this.createProfile.bind(this);
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Profile');
    }
  };

  componentDidMount() {
    this._loadInitialState().done;
  }

  login() {
    fetch('https://chriszeng.ca/createprofile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => {
        console.log(response);
        response.json();
      })
      .done();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> Login </Text>
          <TextInput
            style={styles.textInput}
            placeholder="First name"
            onChange={name => {
              this.setState({name});
            }}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Last name (never shared)"
            onChange={lastname => {
              this.setState({lastname});
            }}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            placeholder="Phone number (never shared)"
            onChange={phone => {
              this.setState({phone});
            }}
            underlineColorAndroid="transparent"
          />
          <Picker
            selectedValue={this.state.language}
            style={styles.textInput}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({gender: itemValue})
            }>
            <Picker.Item label="Male" value={0} />
            <Picker.Item label="Female" value={1} />
          </Picker>
          <TouchableOpacity
            title="Login"
            onPress={this.login}
            style={styles.button}>
            <Text>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#2986d3',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 60,
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 20,
  },
  button: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },
});
