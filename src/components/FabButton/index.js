import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FabButton({ setVisible }){

    function handleNavigateButton(){
        setVisible();
    }

    return(
        <TouchableOpacity 
        activeOpacity={0.9}
        style={styles.containerButton}
        onPress={handleNavigateButton}
        >

            <View style={styles.buttonText}>
                <Text style={styles.text}>+</Text>
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerButton:{
        backgroundColor: '#2e54d4',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: '5%',
        right: '6%'
    },
    text:{
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold'
    }
})