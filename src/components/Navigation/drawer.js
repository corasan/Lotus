import React, { Component, PropTypes } from 'react';
import { StyleSheet, DrawerLayoutAndroid, Text } from 'react-native';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from './sideMenu';

export default class Drawer extends Component {
    // render() {
    //     return (
    //         <DrawerLayoutAndroid
    //             drawerWidth={300}
    //             drawerPosition={DrawerLayoutAndroid.positions.Left}
    //         >
    //             <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
    //         </DrawerLayoutAndroid>
    //     );
    // }
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="displace"
                content={<SideMenu/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                 main: { opacity:Math.max(0.54,1-ratio) }
            })}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
