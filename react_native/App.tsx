import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { Home } from "./screens/Home";

const App: React.FC = (): React.ReactElement => {
    return (
        <NavigationContainer>
            <SafeAreaView style={styles.container}>
                <Home />
                <StatusBar style="auto" />
            </SafeAreaView>
        </NavigationContainer>
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
