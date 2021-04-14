import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ColorBox } from "./components/elements/ColorBox";

const App: React.FC = (): React.ReactElement => {
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Simple Blog</Text>
                <Text>More Text Here</Text>
                <ColorBox colorName="Black" backColor="#000" color="#fff" />
                <StatusBar style="auto" />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    heading: {
        fontSize: 20,
    },
});

export default App;
