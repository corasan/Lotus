import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ToastAndroid, AsyncStorage } from 'react-native';

export default class ChangeName extends Component {
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
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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

                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
                    <TouchableHighlight style={styles.closeBtn} onPress={this.props.hide}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableHighlight>

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
        justifyContent: 'center'
    },
    input: {
        paddingBottom: 6,
        fontSize: 16,
    },
    saveName: {
        height: 45,
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
    closeText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    closeBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        backgroundColor: '#ecf0f1',
        height: 45,
        width: 70,
        borderRadius: 6,
    }
})
