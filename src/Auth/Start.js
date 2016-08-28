import React, { Component, PropTypes } from 'react';
import { View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    Animated,
    Alert,
    ToastAndroid,
    StatusBar,
    AsyncStorage
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {animating: true}
    }

    componentWillMount() {
        StatusBar.setHidden(true);
        AsyncStorage.getItem('User', (err, user) => {
            user = JSON.parse(user);
            if(user) {
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(() => {
                    ToastAndroid.show(`Logged in as ${user.email}`, ToastAndroid.SHORT);
                    setTimeout( () => {
                        Actions.posts({type: ActionConst.RESET});
                    }, 600 );
                }).catch((error) => Alert.alert('Login error', error.message))
            } else {
                setTimeout( () => {
                    Actions.login({type: ActionConst.RESET});
                }, 600 );
            }
        });
    }

    render () {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});
