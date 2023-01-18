import React from "react";
import { ActivityIndicator, Modal } from "react-native";
import Color from "../theme/color";



export default class Loader extends React.Component {
  
    render() {
        return (
            <Modal visible = {this.props.animating} transparent = {true}>
                <ActivityIndicator style = {{flex:1}} size = "large" color = {Color.themeColorOne} animating={this.props.animating} />
            </Modal>
        )
    }
}