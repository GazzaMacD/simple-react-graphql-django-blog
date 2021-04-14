import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ICBProps } from "./types";

const ColorBox: React.FC<ICBProps> = ({
    colorName,
    backColor,
    color,
}): React.ReactElement => {
    const boxColor = {
        backgroundColor: backColor,
    };
    const textColor = {
        color: color,
    };
    return (
        <View style={[styles.box, boxColor]}>
            <Text style={textColor}>The Box is this color {colorName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        padding: 10,
        marginBottom: 10,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default ColorBox;
