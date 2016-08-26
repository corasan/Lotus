import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight, Image } from 'react-native';
import TimeAgo from 'react-native-timeago';
import { Actions } from 'react-native-router-flux';

export default class PostsList extends Component {
    static propTypes = {
        posts: PropTypes.array.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        }
    }

    getDataSource(posts: Array<any>): ListView.DataSource {
        if(!posts) return;
        return this.state.dataSource.cloneWithRows(posts);
    }

    componentDidMount() {
        this.setState({dataSource: this.getDataSource(this.props.posts)});
    }

    componentWillReceiveProps(props) {
        this.setState({dataSource: this.getDataSource(props.posts)});

    }

    renderRow = (data) => {
        return(
            <View style={styles.post}>
                <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                    <Text style={styles.postTitle}>{data.title}</Text>
                    <View style={{paddingTop: 6}}>
                        <TimeAgo time={data.createdAt}/>
                    </View>
                </View>
                <Text style={styles.postContent}>{data.text}</Text>
                {/*TODO: Show the posts points and increment the user reputation depending on the points a post has*/}
                <View style={{alignItems: 'flex-end'}}>
                    <TouchableHighlight onPress={ () => Actions.showPost({postId: data.id}) } underlayColor="transparent">
                        <View style={{flexDirection: 'row'}}>
                            <Image source={require('../img/comments.png')} style={styles.commentImg}/>
                            <Text style={styles.commentText}>Comment</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }

    render() {
        return(
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                enableEmptySections={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    post: {
        padding: 16,
        backgroundColor: 'white',
        borderBottomColor: '#E5E5E5',
        borderStyle: 'solid',
        borderBottomWidth: 1,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 15,
        color: '#494D4F'
    },
    postContent: {
        marginBottom: 30,
        fontSize: 15
    },
    footer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    },
    commentText: {
        fontWeight: '900',
        fontSize: 16,
        color: '#02C39A',
    },
    commentImg: {
        height: 28,
        width: 28,
        marginBottom: 5,
        marginRight: 5
    }
});
