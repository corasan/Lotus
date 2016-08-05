import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';

export default class NavigationBtn extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
        btnStyle: PropTypes.object,
        imgSource: PropTypes.string.isRequired
    }
    render() {
        return(
            <TouchableHighlight onPress={this.props.onPress} style={[styles.navBtn, this.props.btnStyle]} underlayColor="gray">
                <Image source={require(this.props.imgSource)} style={styles.img}/>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        fontSize: 20,
    },
    img: {
        width: 27,
        height: 27,
    },
    navBtn: {
        height: 100,
        width: 50,
        alignItems: 'center',
        paddingTop: 12
    }
});
