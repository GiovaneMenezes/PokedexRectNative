import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import HomeScreenItem from "./components/HomeScreenItem";

const DATA = [
    {
        id: 1,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 2,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 3,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 4,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 5,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 6,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    },
    {
        id: 7,
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
    }
]

const HomeScreen = () => {
    return(
        <View style={styles.container}>
            <Text style={styles.title}>POKEDEX</Text>
            <FlatList 
                data={DATA}
                renderItem={({item}) => <HomeScreenItem id={item.id} name={item.name} /> }
                keyExtractor={item => item.id}
                numColumns={2}
                style={styles.flatlist}
                columnWrapperStyle={{justifyContent: 'space-between'}}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container:{
            flex: 1,
        },
        title: {
            alignSelf: 'center',
            fontSize: 45,
            fontWeight: 'bold',
            color: 'tomato'
        },
        flatlist: {
            flex: 1,
            paddingHorizontal: 25,
        }
    }
)

export default HomeScreen