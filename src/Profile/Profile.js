import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Score from './score';
import * as Progress from 'react-native-progress';
// TODO: Show earned medals
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
        }
    }

    componentWillMount() {
        let userRef = firebase.database().ref(`Users/${this.props.uid}`);
        userRef.on('value', function(snapshot) {
            let user = snapshot.val();
            let rep = user.reputation;                                // User total reputation
            let repNeeded = user.repNeeded;
            let currentRankRep = user.currentRankRep;                 // Current reputation to advance to next level
            this.setState({
                displayName: user.displayName,
                posts: user.posts,
                rank: user.rank,
                helpful: user.helpful,
                reputation: rep,
                repNeeded: repNeeded,
                progress: (currentRankRep/repNeeded),
                medals: user.medals
            });
            this.rankUp(rep, user.rank, currentRankRep, repNeeded, userRef);
        }.bind(this));
    }

    rankUp = (rep, rank, currentRankRep, repNeeded, userRef) => {
        let oldRepNeeded = repNeeded
        if (currentRankRep >= repNeeded) {
            let nextRank = rank + 1;
            let num = oldRepNeeded*nextRank;
            userRef.update({
                rank: nextRank,
                repNeeded: num,
                currentRankRep: 0,
            });
            this.setState({progress: 0});
        }
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

                <View style={{marginTop: 10, flexDirection: 'row'}}>
                    <Progress.Bar
                        progress={this.state.progress}
                        width={260}
                        height={16}
                        borderWidth={4}
                        borderColor="#ECF0F1"
                        color="#02C39A"
                    />
                    <Text style={{fontSize: 12, marginLeft: 10}}>{this.state.nextRankRep}</Text>
                </View>

                {/*<View style={styles.label}>
                    <Text style={styles.labelName}>Medals</Text>
                    <Text style={[styles.subLabel, {marginTop: 3}]}>{this.state.medals}</Text>
                </View>*/}
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
