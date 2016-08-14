import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import TimeAgo from 'react-native-timeago';

export default class Post extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        postId: PropTypes.string
    }

    constructor(props) {
        super(props);
        this.state = {
            highFives: '0',
            thumbsUps: '0',
            likes: '0',
            postId: this.props.postId,
        }
    }

    componentWillMount() {
        firebase.database().ref(`Posts/${this.state.postId}`).on('value', function(snapshot) {
            let data = snapshot.val();
            this.setState({highFives: data.highFives, likes: data.likes, thumbsUps: data.thumbsUps});
        }.bind(this));
    }

    reactioHandler = (target) => {
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
                    <TouchableHighlight onPress={ () => {this.reactioHandler('highFive')} }>
                        <Image source={require('../../img/hand.png')} style={styles.img}/>
                    </TouchableHighlight>
                    <Text style={{marginTop: 4, marginRight: 6}}>{this.state.highFives}</Text>

                    <TouchableHighlight onPress={ () => {this.reactioHandler('thumbsUp')} }>
                        <Image source={require('../../img/thumbsUp.png')} style={styles.img}/>
                    </TouchableHighlight>
                    <Text style={{marginTop: 4, marginRight: 6, marginLeft: 4}}>{this.state.thumbsUps}</Text>

                    <TouchableHighlight onPress={ () => {this.reactioHandler('like')} }>
                        <Image source={require('../../img/heart.png')} style={styles.img}/>
                    </TouchableHighlight>
                    <Text style={{marginTop: 4, marginLeft: 4}}>{this.state.likes}</Text>
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
