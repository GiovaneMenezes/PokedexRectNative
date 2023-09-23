import React from "react";
import { SvgUri } from 'react-native-svg'
import { View, Text, StyleSheet, FlatList } from "react-native";
import TypePill from "../../../shared/components/TypePill";
import { PokemonType } from "../../../shared/helpers/PokemonType";
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreenItem = (props) => {
    const { id, name } = props
    const types = ['fire']

    const backgroundColors = () => {
        const mappedColors = types
            .map((type) => PokemonType[type]?.primaryBackgroundColor ?? null)
            .filter((element) => element !== null)
        console.log(mappedColors)
        if (mappedColors.length < 1) {
            return( ['darkgray', 'lightgray'] )
        } if (mappedColors.length < 2) {
            return( [mappedColors[0], mappedColors[0]] )
        } else {
            return( mappedColors )
        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient 
                horizontal 
                colors={ backgroundColors() } 
                style={[styles.informationContainer]}
            >
                <Text style={styles.pokemonName}>{name}</Text>
                <FlatList
                    horizontal
                    data={types}
                    keyExtractor={item => item}
                    renderItem={({item}) => <TypePill type={item} />}
                    style={styles.typePillsList}
                />
            </LinearGradient>
            <SvgUri 
                width={90} 
                height={90}
                uri={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                style={styles.image}
            />
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            width: '49%',
            marginVertical: 8
        },
        image: {
            position: 'absolute',
            alignSelf: 'center',
            marginTop: 3
        },
        informationContainer: {
            marginTop: 55,
            paddingTop: 40,
            paddingBottom: 8,
            borderRadius: 8
        },
        pokemonName: {
            fontSize: 25,
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        typePillsList: {
            alignSelf: 'center',
        }
    }
)

export default HomeScreenItem