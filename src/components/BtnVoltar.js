import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BtnVoltar(props) {
    return (
        <TouchableOpacity style={SS.vBackground} onPress={() => props.VoltarClicked?.()}>
            <Icon name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
    )
}

const SS = StyleSheet.create({
    vBackground: {
        backgroundColor: 'rgba(0,0,0,.5)',
        borderRadius: 100,
        height: 55,
        width: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
})