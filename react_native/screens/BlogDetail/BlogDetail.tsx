import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from "react-native";

const BlogDetail: React.FC = (): React.ReactElement => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Blog Detail</Text>
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

export default BlogDetail;
