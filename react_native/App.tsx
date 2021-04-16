import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./screens/Home";
import { BlogDetail } from "./screens/BlogDetail";
//types
import { RootStackParamList } from "./appTypes";
const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = (): React.ReactElement => {
    return (
        <NavigationContainer>
            <RootStack.Navigator>
                <RootStack.Screen name="Home" component={Home} />
                <RootStack.Screen name="BlogDetail" component={BlogDetail} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
