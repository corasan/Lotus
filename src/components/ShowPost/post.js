import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import TimeAgo from 'react-native-timeago';

export default class Post extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired
    }
    render() {
        return (
            <View style={styles.post}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.postTitle}>{this.props.title}</Text>
                    <View style={{paddingTop: 6}}>
                        <TimeAgo time={this.props.createdAt}/>
                    </View>
                </View>

                <Text style={styles.postContent}>{this.props.text}</Text>

                <View style={{flexDirection: 'row', left: 200}}>
                    <TouchableHighlight>
                        <Image source={require('../../img/hand.png')} style={styles.img}/>
                    </TouchableHighlight><Text style={{marginTop: 4, marginRight: 6}}>0</Text>

                    <TouchableHighlight>
                        <Image source={require('../../img/thumbsUp.png')} style={styles.img}/>
                    </TouchableHighlight><Text style={{marginTop: 4, marginRight: 6, marginLeft: 4}}>0</Text>

                    <TouchableHighlight>
                        <Image source={require('../../img/heart.png')} style={styles.img}/>
                    </TouchableHighlight><Text style={{marginTop: 4, marginLeft: 4}}>0</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    post: {
        backgroundColor: 'white',
        padding: 16,
        elevation: 3
    },
    postTitle: {
        fontSize: 22,
        fontWeight: '900',
        marginBottom: 15,
    },
    postContent: {
        marginBottom: 30
    },
    time: {
        alignItems: 'flex-end'
    },
    img: {
        height: 26,
        width: 26,
    }
});
