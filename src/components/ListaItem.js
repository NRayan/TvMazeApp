import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import cores from '../auxiliares/Cores';
const Cores = cores;

export default function ListaItem(props) {

    const [Serie, setSerie] = useState(props.Serie);

    return (
        <TouchableOpacity style={SS.vBackground} onPress={() => props.ItemClicked?.(Serie)}>
            <View style={SS.vItems}>
                <Image style={SS.ImgCapa} source={{ uri: Serie.image != null ? Serie.image?.original : 'https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg' }} loadingIndicatorSource={{ uri: 'https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg' }} />
                <View style={SS.vLabels}>
                    <Text style={SS.lblTitulo}>{Serie.name}</Text>
                    <Text style={SS.lblTipo}>{Serie.type}</Text>
                    <Text style={SS.lblEstreia}>Premiered: {Serie.premiered}</Text>
                </View>
            </View>
            <View style={SS.vSeparator} />
        </TouchableOpacity>
    )
}

const SS = StyleSheet.create({
    vBackground: {
        flex: 1,
        marginHorizontal: 30
    },
    vItems: {
        flexDirection: 'row',
        paddingVertical: 10
    },
    vLabels: {
        justifyContent: 'space-between',
        marginVertical: 10
    },
    ImgCapa: {
        height: 110,
        width: 80,
        borderRadius: 5,
        backgroundColor: Cores.Cores[1],
        marginRight: 15
    },
    vSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: Cores.Cores[1]
    },
    lblTitulo: {
        color: Cores.Cores[5],
        fontSize: 16
    },
    lblTipo: {
        color: Cores.Cores[3],
        fontSize: 16
    },
    lblEstreia: {
        color: Cores.Cores[3],
        fontSize: 14
    }
})
