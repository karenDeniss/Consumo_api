
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const PokemonInfo = () => {
    const [pokemonData, setPokemonData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pokemonId, setPokemonId] = useState(1); // ID del Pokémon actual

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                setPokemonData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [pokemonId]);

    const handlePrevPokemon = () => {
        if (pokemonId > 1) {
            setPokemonId(pokemonId - 1);
        }
    };

    const handleNextPokemon = () => {
        // Puedes ajustar el límite de acuerdo a tu conocimiento de la cantidad total de Pokémon
        const maxPokemonId = 151; // Por ejemplo, si estás usando solo los primeros 151 Pokémon
        if (pokemonId < maxPokemonId) {
            setPokemonId(pokemonId + 1);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#6E99E5 
                " />
            ) : (
                pokemonData && (
                    <View style={styles.card}>
                        <Image
                            style={styles.image}
                            source={{ uri: pokemonData.sprites.front_default }}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.text}>Name: {pokemonData.name}</Text>
                            <Text style={styles.text}>Height: {pokemonData.height}</Text>
                            <Text style={styles.text}>Weight: {pokemonData.weight}</Text>
                            {/* Otros datos que desees mostrar */}
                        </View>
                    </View>
                )
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handlePrevPokemon}>
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleNextPokemon}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#6E99E5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    image: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginBottom: 20,
    },
    infoContainer: {
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#131417',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default PokemonInfo;
