import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Animated } from 'react-native';

export default class OptionsMenu extends Component {
    static get defaultProps() {
        return { open: false }
    }

    constructor(props) {
        super(props);
        this.state = {
            expand: new Animated.Value(0)
        }
    }

    componentDidMount() {
        if(this.props.open === true) {
            Animate.spring(this.state.expand, {toValue: 200}).start();
        }
    }

    render() {
        return (
            <View>
                <Animated.View style={[styles.menu, {height: this.state.expand}]}>
                    {/*{this.props.children}*/}
                    <Text>Hello</Text>
                </Animated.View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        width: 100,
        backgroundColor: 'white',
    }
});
