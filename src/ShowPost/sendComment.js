import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TextInput, Dimensions, Alert, AsyncStorage } from 'react-native';

export default class WriteComment extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            commentText: '',
            height: 0
        }
    }

    componentWillMount() {
        AsyncStorage.getItem('User', (err, result) => {
            let uid = result.replace(/["]+/g, '');
            firebase.database().ref(`Users/${uid}`).on('value', function(snapshot) {
                let data = snapshot.val();
                this.setState({
                    posts: data.posts,
                    uid: uid,
                    currentRankRep: data.currentRankRep,
                    rep: data.reputation
                });
            }.bind(this));
        });
    }

    handleComment = (commentText) => {
        this.setState({commentText});
    }

    updateReputation = () => {
        firebase.database().ref(`Users/${this.state.uid}`).update({
            currentRankRep: this.state.currentRankRep + 2,
            reputation: this.state.rep + 2
        });
    }

    sendComment = () => {
        let commentsRef = `Comments/${this.state.postId}`;
        let commentId = firebase.database().ref(commentsRef).push().key;

        if (!this.state.commentText) {
            Alert.alert('Error', 'You must type something to post a comment.');
        } else {
            firebase.database().ref(`${commentsRef}/${commentId}`).update({
                comment: this.state.commentText,
                id: this.state.postId,
                commentId: commentId
            });
            this.setState({commentText: '', height: 50});
            this.updateReputation();
        }
    }

    render() {
        return (
            <View style={styles.content}>
                <TextInput value={this.state.commentText}
                    onChangeText={this.handleComment}
                    autoCapitalize="sentences"
                    underlineColorAndroid="transparent"
                    multiline={true}
                    placeholder="Write something..."
                    onChange={(event) => {
                        this.setState({
                            commentText: event.nativeEvent.commentText,
                            height: event.nativeEvent.contentSize.height,
                        });
                    }}
                    style={{height: Math.max(50, this.state.height > 200 ? 200 : this.state.height), fontSize: 18, flex: 1}}
                />

                <View>
                    <TouchableHighlight underlayColor="#16a085" onPress={this.sendComment} style={styles.sendBtn}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        elevation: 3,
        // paddingTop: 5,
        // paddingBottom: 5,
        // paddingRight: 5,
        flexDirection: 'row',
    },
    sendBtn: {
        height: 50,
        alignItems: 'center',
        width: 60,
        paddingTop: 10,
        // marginRight: 5,
        // borderRadius: 8,
        backgroundColor: '#02C39A'
    },
    sendText: {
        marginTop: 4,
        marginRight: 6,
        marginLeft: 4,
        fontWeight: '900',
        fontSize: 18,
        // color: '#02C39A'
        color: 'white'
    }
});
