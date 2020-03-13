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
    this.signup = this.signup.bind(this);
  }

  _loadInitialState = async () => {
    var value = await AsyncStorage.getItem('user');
    if (value !== null) {
      this.props.navigation.navigate('Profile');
    }
  };

  componentDidMount() {
    this._loadInitialState();
  }

  signup() {
    alert('sign up');
    console.log('signing up');
    fetch('https://chriszeng.ca/signup', {
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
        console.log(response['status'])
        if(response['status'] === 200){
            alert("sign up complete!")
            this.state.navigation.navigate("Profile");
        }
        else{
            alert("sign up failed!")
        }
      })
      .done();
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.wrapper}>
        <View style={styles.container}>
          <Text style={styles.header}> Sign-up </Text>
          <TextInput
            style={styles.textInput}
            placeholder="e-mail"
            onChangeText ={email => {
              this.setState({email});
            }}
            underlineColorAndroid="transparent"
          />
          <TextInput
            style={styles.textInput}
            placeholder="password"
            onChangeText ={password => {
              this.setState({password});
            }}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity
            title="signup"
            onPress={this.signup}
            style={styles.button}>
            <Text>Sign Up</Text>
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
    borderWidth : 5,
  },
});
