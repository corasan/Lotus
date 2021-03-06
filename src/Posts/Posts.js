import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    TouchableHighlight,
    Text,
    Image,
    Dimensions,
    StatusBar,
    DrawerLayoutAndroid
} from 'react-native';
import PostsList from './postsList';
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
        StatusBar.setHidden(false);
        StatusBar.setBackgroundColor('#235546');
        StatusBar.setTranslucent(false);
        firebase.database().ref('Posts').on('value', function(data) {
            let posts = data.val();
            let sortedPosts = Object.keys(posts).reverse().map((date) => posts[date])
            this.setState({posts: sortedPosts});
        }.bind(this));

    }

    render() {
        return (
            <View style={styles.posts}>
                <PostsList posts={this.state.posts}/>

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
        backgroundColor: '#02C39A'
    }
});
