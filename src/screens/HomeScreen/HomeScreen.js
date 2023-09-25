import React, { useState, useEffect }  from "react";
import { Text, View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import HomeScreenItem from "./components/HomeScreenItem";

const HomeScreen = () => {
    const pageSize = 20

    const [currentPage, setCurrentPage] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [loadingNextPage, setLoadingNextPage] = useState(true)
    const [pokemonList, setPokemonList] = useState([])
    const [pokemonInfoList, setPokemonInfoList] = useState({})

    const fetchPokemons = async () => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset0&limit=151')
            const json = await response.json()
            setPokemonList(json.results)
        } catch (error) {
            console.log('error fetching the data')
        }
    }

    const elementFetched = () => {
        const elementsCount = Object.keys(pokemonInfoList).length
        if (elementsCount >= (pageSize * (currentPage + 1))) {
            setLoadingNextPage(false)
            setIsLoading(false)
        }
    }

    const fetchPokemonInfo = async (name) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
            const pokemon = await response.json()
            setPokemonInfoList(prevState => (
                {
                    ...prevState,
                    [pokemon.id]: {
                        name: name,
                        data: pokemon
                    } 
                }
            ))
        } catch (error) {
            console.log(`Something went wrong when fetching the Data of the pokemon ${name}`)
        }
    }

    const fetchPage = (page) => {
        if (pokemonList.length < 20) {
            return
        }
        for (let i = page * pageSize; i < Math.min((page+1) * pageSize, pokemonList.length); i++) {
            fetchPokemonInfo(pokemonList[i].name)
        }
    }

    const fetchMoreData = () => {
        if (!loadingNextPage) {
            const nextPage = currentPage + 1
            setCurrentPage(nextPage)
            fetchPage(nextPage)
        }
    }

    useEffect(() => {
        if (pokemonList.length == 0) {
            fetchPokemons()
        } else {
            fetchPage(0)
        }
    }, [pokemonList])

    useEffect(() => {
        elementFetched()
    }, [pokemonInfoList])

    if (isLoading) {
        return(<ActivityIndicator color={'blue'}/>)
    } else {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>POKEDEX</Text>
                <FlatList 
                    data={Object.keys(pokemonInfoList)}
                    renderItem={({item}) => <HomeScreenItem name={pokemonInfoList[item].name} pokemonInfo={pokemonInfoList[item].data} /> }
                    keyExtractor={item => item}
                    windowSize={50}
                    numColumns={2}
                    style={styles.flatlist}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    onEndReached={fetchMoreData}
                    onEndReachedThreshold={3}
                />
            </View>
        )
    }
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