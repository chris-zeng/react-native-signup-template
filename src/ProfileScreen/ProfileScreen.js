import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  AsyncStorage,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2986d3',
  },
  text: {
    color: '#fff',
  },
});

export default ProfileScreen;
