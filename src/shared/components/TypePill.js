import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokemonType } from "../helpers/PokemonType.js";

const TypePill = (props) => {
    const { type } = props
    const { pillColor } = PokemonType[type] ?? ''
    return(
        <View
            style={ [{ backgroundColor: pillColor ?? 'black' }, styles.container] } 
        >
            <Text style={ styles.text }>{type.toUpperCase()}</Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            height: 28,
            borderRadius: 14,
            margin: 5
        },  
        text: {
            flex: 1,
            color: 'white',
            fontWeight: 'bold',
            margin: 5,
            alignSelf: 'center'
        }
    }
)

export default TypePill