import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
import TimeAgo from 'react-native-timeago';

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
        return(
            <View style={styles.post}>
                <Text style={styles.postTitle}>{data.title}</Text>
                <Text style={styles.postContent}>{data.text}</Text>

                <View style={styles.footer}>
                    <View style={{paddingBottom: 10}}>
                        <TimeAgo time={data.createdAt}/>
                    </View>
                    <TouchableHighlight style={{marginLeft: 160, padding: 10}} underlayColor="gray"
                        onPress={ () => { this.props.navigator.push({name: 'Show Post', id: data.id})} }>
                        <Text style={{fontWeight: '900', fontSize: 14}}>Comment</Text>
                    </TouchableHighlight>
                </View>
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
    post: {
        padding: 15,
        width: 360,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 15,
    },
    postContent: {
        marginBottom: 30
    },
    footer: {
        alignItems: 'flex-end',
        flexDirection: 'row',
    }
})
