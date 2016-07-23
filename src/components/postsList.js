import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, ListView } from 'react-native';

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
        console.log('getDataSource:', posts);
    }

    componentDidMount() {
        this.setState({dataSource: this.getDataSource(this.props.posts)});
    }

    componentWillReceiveProps(props) {
        this.setState({dataSource: this.getDataSource(props.posts)});
    }

    renderRow = (data) => {
        return(
            <View style={styles.posts}>
                <Text style={styles.postTitle}>{data.title}</Text>
                <Text>{data.text}</Text>
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
        flex: 1,
        padding: 14,
        paddingBottom: 40,
        width: 360,
        elevation: 4,
        backgroundColor: 'white'
    },
    postTitle: {
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 15
    }
})
