import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            }),
        }
    }

    getDataSource(comments: Array<any>): ListView.DataSource {
        if(!comments) return;
        return this.state.dataSource.cloneWithRows(comments);
    }

    componentDidMount() {
        this.setState({dataSource: this.getDataSource(this.props.comments)});
    }

    componentWillReceiveProps(props) {
        this.setState({dataSource: this.getDataSource(props.comments)});
    }

    renderRow = (data) => {
        return(
            <View style={styles.comment}>
                <Text style={{fontSize: 16}}>{data.comment}</Text>
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
    comment: {
        padding: 15,
        width: 360,
        elevation: 3,
        backgroundColor: 'white',
        marginBottom: 15,
    }
})
