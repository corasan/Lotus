import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Score from '../components/Profile/score';
import * as Progress from 'react-native-progress';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
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
                reputation: user.reputation,
                reputationNeeded: user.reputationNeeded,
                progress: (user.reputation/100)/100,
                medals: user.medals
            });
        }.bind(this));
    }

    setProgress = (x) => {
        this.setState({progress: (x/100)/100});
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', marginTop: 35}}>
                    <Text style={styles.name}>{this.state.displayName}</Text>
                    <Text style={{fontSize: 16, marginTop: 8, color: '#95989A'}}>Rank {this.state.rank}</Text>
                </View>

                <View style={{flexDirection: 'row', marginTop: 35, justifyContent: 'space-between'}}>
                    <Score title="Reputation" score={this.state.reputation}/>
                    <Score title="Posts" score={this.state.posts}/>
                    <Score title="Helped" score={this.state.helped}/>
                </View>

                <View style={{flexDirection: 'row', marginTop: 35}}>
                    <Text style={{fontSize: 18, color: '#494D4F'}}>Next Rank</Text>
                    <Image source={require('../img/levelUp.png')} style={{height: 30, width: 30, bottom: 4}}/>
                </View>
                <View style={{marginTop: 10}}>
                    <Progress.Bar
                        progress={this.state.progress}
                        width={260}
                        height={16}
                        borderWidth={2}
                        borderRadius={10}
                        borderColor="#ECF0F1"
                        color="#02C39A"
                    />
                </View>

                <View style={{marginTop: 35, flexDirection: 'row'}}>
                    <Text style={{fontSize: 18, color: '#494D4F'}}>Medals</Text>
                    <Text style={{fontSize: 16, color: '#95989A', marginTop: 3, marginLeft: 10}}>{this.state.medals}</Text>
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
        marginRight: 10,
        color: '#494D4F'
    }
};
