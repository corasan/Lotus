import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableHighlight, Text, AsyncStorage, Image, Dimensions } from 'react-native';
import PostsList from '../components/Posts/postsList';
import firebase from '../../firebaseInit';
import { Actions } from 'react-native-router-flux';

const height = Dimensions.get('window').height;

export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            nav: this.props.navigator,
        }
    }

    componentWillMount() {
        firebase.database().ref('Posts').on('value', function(data) {
            let posts = data.val();
            let sortedPosts = Object.keys(posts).reverse().map((date) => posts[date])
            this.setState({posts: sortedPosts});
        }.bind(this));

    }

    logout = () => {
        AsyncStorage.removeItem('User', () => {
            Actions.login();
        });
    }

    render() {
        return (
            <View style={styles.posts}>
                <TouchableHighlight style={{marginTop: 60}} onPress={this.logout}>
                    <Text>Sign out</Text>
                </TouchableHighlight>
                <ScrollView>
                    <PostsList posts={this.state.posts} navigator={ this.state.nav}/>
                </ScrollView>

                    <TouchableHighlight
                        underlayColor="#16a085"
                        onPress={ () => Actions.newPost() }
                        style={styles.newPost}
                    >
                        <View style={{alignItems: 'center', marginTop: -2}}>
                            <Text style={{fontSize: 40, color: 'white'}}>+</Text>
                        </View>
                    </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    posts: {
        flex: 1,
        height: height
    },
    newPost: {
        height: 60,
        width: 60,
        top: -95,
        left: 290,
        elevation: 10,
        borderRadius: 100,
        backgroundColor: '#1ABC9C'
    }
});
