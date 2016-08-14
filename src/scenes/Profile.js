import React, { Component, PropTypes } from 'react';
import { View, Text, Dimensions } from 'react-native';
let height = Dimensions.get('window').height;

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: ''
        }
    }

    componentWillMount() {
        let uid = this.props.userId.replace(/["]+/g, '');
        firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
            let user = snapshot.val();
            console.log(user);
            this.setState({displayName: user.displayName});
        }.bind(this));
    }

    render() {
        return (
            <View style={{backgroundColor: 'white', height: height}}>
                <Text style={{marginTop: 100}}>{this.state.displayName}</Text>
            </View>
        );
    }
}
