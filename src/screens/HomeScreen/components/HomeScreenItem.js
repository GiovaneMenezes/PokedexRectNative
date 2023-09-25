import React, { useState, useEffect } from "react";
import { SvgUri } from 'react-native-svg'
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import TypePill from "../../../shared/components/TypePill";
import { PokemonType } from "../../../shared/helpers/PokemonType";
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreenItem = (props) => {
    const { name, pokemonInfo } = props
    const types = pokemonInfo?.types

    const backgroundColors = () => {
        const mappedColors = types.map((type) => PokemonType[type.type.name].primaryBackgroundColor)
        if (mappedColors?.length < 1) {
            return( ['darkgray', 'lightgray'] )
        } if (mappedColors?.length < 2) {
            return( [mappedColors[0], mappedColors[0]] )
        } else {
            return( mappedColors )
        }
    }

    if (pokemonInfo == null) {
        return(<ActivityIndicator color={'blue'}/>)
    } else {
        return (
            <View style={styles.container}>
                <LinearGradient 
                    horizontal 
                    colors={ backgroundColors() } 
                    style={[styles.informationContainer]}
                >
                    <Text style={styles.pokemonName}>{name.replace(/^./, name[0].toUpperCase())}</Text>
                    <FlatList
                        horizontal
                        pointerEvents="none"
                        data={types}
                        keyExtractor={item => item.slot}
                        renderItem={({item}) => <TypePill type={item.type.name} />}
                        style={styles.typePillsList}
                    />
                </LinearGradient>
                <SvgUri 
                    width={90} 
                    height={90}
                    uri={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonInfo.id}.svg`}
                    style={styles.image}
                />
            </View>
        )
    }
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