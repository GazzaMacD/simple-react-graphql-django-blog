import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { Home } from "./pages/Home";
import { ColorBox } from "./components/elements/ColorBox";

const App: React.FC = (): React.ReactElement => {
    return (
        <SafeAreaView style={styles.container}>
            <Home />
            <StatusBar style="auto" />
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
});

export default App;
