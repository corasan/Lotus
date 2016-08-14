import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Score from '../components/Profile/score';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            posts: '',
            rank: '',
            helped: '',
            reputation: ''
        }
    }

    componentWillMount() {
        let uid = this.props.userId.replace(/["]+/g, '');
        firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
            let user = snapshot.val();
            this.setState({
                displayName: user.displayName,
                posts: user.posts,
                rank: user.rank,
                helped: user.helped,
                reputation: user.reputation
            });
        }.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginTop: 35}}>
                    <Text style={styles.name}>{this.state.displayName}</Text>
                    <Text style={{fontSize: 18, marginTop: 6, color: '#95989A'}}>Rank {this.state.rank}</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 35, justifyContent: 'space-between'}}>
                    <Score title="Reputation" score={this.state.reputation}/>
                    <Score title="Posts" score={this.state.posts}/>
                    <Score title="Helped" score={this.state.helped}/>
                </View>
            </View>
        );
    }
}


const styles = {
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 35,
        paddingRight: 35
    },
    name: {
        fontSize: 24,
        fontWeight: '900',
        marginRight: 10
    }
};
