import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Score from './score';
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
        let userRef = firebase.database().ref(`Users/${uid}`);
        userRef.on('value', function(snapshot) {
            let user = snapshot.val();
            let rep = user.reputation;                  // User total reputation
            let repNeeded = Math.pow(40*user.rank, 2);  // Total reputation needed
            let nextRankRep = user.nextRankRep;         // Reputation needed to advance to next Rank
            let currentRankRep = user.currentRankRep;   // Current reputation to advance to next level
            this.setState({
                displayName: user.displayName,
                posts: user.posts,
                rank: user.rank,
                helpful: user.helpful,
                reputation: rep,
                nextRankRep: nextRankRep,
                repNeeded: repNeeded,
                progress: (currentRankRep/nextRankRep),
                medals: user.medals
            });
            if (currentRankRep >= nextRankRep) {
                let nextRank = user.rank + 1;
                let num = Math.pow(40*nextRank, 2)
                console.log(num);
                userRef.update({
                    rank: nextRank,
                    repNeeded: num,
                    currentRankRep: 0,
                    nextRankRep: num - rep
                });
                this.setState({progress: 0});
            }
        }.bind(this));
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.label}>
                    <Text style={styles.name}>{this.state.displayName}</Text>
                    <Text style={[styles.subLabel, {marginTop: 8}]}>Rank {this.state.rank}</Text>
                </View>

                <View style={[styles.label, {justifyContent: 'space-between'}]}>
                    <Score title="Reputation" score={this.state.reputation}/>
                    <Score title="Posts" score={this.state.posts}/>
                    <Score title="Helpful" score={this.state.helpful}/>
                </View>

                <View style={styles.label}>
                    <Text style={styles.labelName}>Next Rank</Text>
                    <Image source={require('../img/levelUp.png')} style={styles.img}/>
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
                    <Text>Needed: {this.state.nextRankRep}</Text>
                </View>

                <View style={styles.label}>
                    <Text style={styles.labelName}>Medals</Text>
                    <Text style={[styles.subLabel, {marginTop: 3}]}>{this.state.medals}</Text>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: 35,
        paddingRight: 35
    },
    name: {
        fontSize: 24,
        fontWeight: '900',
        color: '#494D4F'
    },
    label: {
        marginTop: 35,
        flexDirection: 'row'
    },
    labelName: {
        fontSize: 18,
        color: '#494D4F'
    },
    subLabel: {
        fontSize: 16,
        color: '#95989A',
        marginLeft: 10
    },
    img: {
        height: 30,
        width: 30,
        bottom: 4
    }
});
