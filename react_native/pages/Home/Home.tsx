import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { getPosts } from "./apiServices";
import { IAllPosts } from "./types";
import { ColorBox } from "../../components/elements/ColorBox";

const Home: React.FC = (): React.ReactElement => {
    const [posts, setPosts] = useState<Array<IAllPosts> | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const response = getPosts();
        response
            .then((resp: any) => {
                setPosts(resp);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []); // end useEffect

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.heading}>Simple Blog Home</Text>
                <ColorBox colorName="Black" backColor="#000" color="#fff" />
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

export default Home;
