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
import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      email: '',
      password: '',
    };
    this.login = this.login.bind(this);
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
    fetch('https://chriszeng.ca/users', {
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
      .then(res => {
        if (res.success !== null && res.success === true) {
          AsyncStorage.setItem('user', res.user);
          this.props.navigation.navigate('Profile');
        } else {
          alert(res.message);
        }
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
            placeholder="email"
            onChange={email => {
              this.setState({email});
            }}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChange={password => {
              this.setState({password});
            }}
            underlineColorAndroid="transparent"
          />
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
