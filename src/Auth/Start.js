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
// Test
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
                        Actions.posts({type: ActionConst.RESET, animation: 'fade'});
                    }, 1000 );
                }).catch((error) => Alert.alert('Login error', error.message))
            } else {
                setTimeout( () => {
                    Actions.login({type: ActionConst.RESET});
                }, 1000 );
            }
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <Image source={require('../img/lotus-logo-big.png')} style={styles.logo}/>
                <Text style={styles.name}>Lotus</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    name: {
        fontSize: 40,
        marginTop: 200,
        color: '#95a5a6'
    },
    logo: {
        height: 100,
        width: 170,
        marginTop: 80
    }
});
