import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import TimeAgo from 'react-native-timeago';
import ReactionButton from './reactionBtn';

export default class Post extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        postId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId
        }
    }

    componentWillMount() {
        firebase.database().ref(`Posts/${this.state.postId}`).on('value', function(snapshot) {
            let data = snapshot.val();
            this.setState({highFives: data.highFives, likes: data.likes, thumbsUps: data.thumbsUps});
        }.bind(this));
    }

    reactionHandler = (target) => {
        let postRef = firebase.database().ref(`Posts/${this.state.postId}`);
        switch(target) {
            case 'highFive':
                postRef.update({highFives: this.state.highFives + 1});
                break;
            case 'like':
                postRef.update({likes: this.state.likes + 1});
                break;
            case 'thumbsUp':
                postRef.update({thumbsUps: this.state.thumbsUps + 1});
                break;
        }
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

                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <ReactionButton
                        onPress={ () => {this.reactionHandler('highFive')} }
                        imgSource={require('../../img/hand.png')}
                        counterText={this.state.highFives}
                    />

                    <ReactionButton
                        onPress={ () => {this.reactionHandler('thumbsUp')} }
                        imgSource={require('../../img/thumbsUp.png')}
                        counterText={this.state.thumbsUps}
                    />

                    <ReactionButton
                        onPress={ () => {this.reactionHandler('like')} }
                        imgSource={require('../../img/heart.png')}
                        counterText={this.state.likes}
                    />
                </View>
            </View>
        );
    }
}

const styles = {
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
};
