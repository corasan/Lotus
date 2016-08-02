import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';

export default class PostsList extends Component {
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
        console.log(data);
        return(
            <View style={styles.posts}>
                <Text style={styles.postTitle}>{data.title}</Text>
                <Text>{data.text}</Text>

                <TouchableHighlight onPress={this.getPostId}>
                    <Text>Reply</Text>
                </TouchableHighlight>
            </View>
        )
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
    posts: {
        padding: 14,
        paddingBottom: 40,
        width: 360,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 15,
    }
})
