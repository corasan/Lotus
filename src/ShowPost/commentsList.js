import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, TouchableHighlight } from 'react-native';
// TODO: make comments have the time they were posted
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
                <Text style={{fontSize: 16, color: '#494D4F'}}>{data.comment}</Text>
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

const styles = {
    comment: {
        minHeight: 100,
        maxHeight: 400,
        padding: 16,
        backgroundColor: 'white',
        borderColor: '#ECF0F1',
        borderWidth: 1,
        paddingTop: 10,
        paddingBottom: 10
    }
};
