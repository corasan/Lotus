import React, { Component, PropTypes } from 'react';
import { View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableHighlight,
    ToastAndroid,
    AsyncStorage
} from 'react-native';

export default class ChangeName extends Component {
    static propTypes = {
        uid: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            firstN: '',
            lastN: '',
        }
    }

    saveName = () => {
        if (this.state.firstN === '' && this.state.lastN === '') {
            Alert.alert('Error', 'Please enter a new first and last name');
        } else {
            firebase.database().ref(`Users/${this.props.uid}`).update({
                firstName: this.state.firstN,
                lastName: this.state.lastN,
                displayName: `${this.state.firstN} ${this.state.lastN}`
            });
            ToastAndroid.show('Saved', ToastAndroid.SHORT);
            this.setState({firstN: '', lastN: ''});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputs}>
                    <TextInput
                        value={this.state.firstN}
                        onChangeText={ (firstN) => this.setState({firstN}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="First name"
                        autoCapitalize="sentences"
                    />

                    <TextInput
                        value={this.state.lastN}
                        onChangeText={ (lastN) => this.setState({lastN}) }
                        style={[styles.input, {width: 160}]}
                        underlineColorAndroid='#02C39A'
                        placeholder="Last name"
                        autoCapitalize="sentences"
                    />
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10, marginBottom: 5}}>
                    <TouchableHighlight style={styles.saveName} onPress={this.saveName}>
                        <Text style={styles.saveText}>Save</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingRight: 16,
        paddingLeft: 16
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        paddingBottom: 6,
        fontSize: 16,
    },
    saveName: {
        height: 40,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        backgroundColor: '#02C39A'
    },
    saveText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
})
