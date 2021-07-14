import React, { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import BtnVoltar from '../components/BtnVoltar';
import StFormat from '../auxiliares/StFormat';

import cores from '../auxiliares/Cores';
const Cores = cores;

export default function DetalheEpisodio(props) {

    const [Episode, setEpisode] = useState(props.route.params.episode);

    function Voltar() {
        props.navigation.goBack();
    }

    return (
        <View style={SS.vBackground}>

            <View style={{ position: 'absolute', top: 25, left: 25 }}>
                <BtnVoltar VoltarClicked={Voltar} />
            </View>

            <View style={SS.vTempEp}>
                <Text style={SS.lblTemporada}>Season {Episode.season}</Text>
                <Text style={SS.lblEp}>Episode {Episode.number}</Text>
            </View>

            <View style={SS.vEp}>
                <Image style={SS.vCapaEp} source={{ uri: (Episode.image != null ? Episode.image.original : 'https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg') }} />
                <Text style={SS.lblTituloEp}>{Episode.name}</Text>
            </View>

            <Text style={SS.lblSinopseEp}>{StFormat.RemoveTags(Episode.summary)}</Text>

        </View>
    )
}

const SS = StyleSheet.create({
    vBackground: {
        flex: 1,
        backgroundColor: Cores.Cores[0],
        paddingTop: 30,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    vTempEp: {
        marginTop: 80,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    lblTemporada: {
        backgroundColor: Cores.Cores[4],
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 100,
        color: Cores.Cores[5],
        marginRight: 10
    },
    lblEp: {
        backgroundColor: Cores.Cores[2],
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 100,
        color: Cores.Cores[5]
    },
    vEp: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    vCapaEp: {
        height: 100,
        width: 124,
        marginRight: 10,
        backgroundColor: Cores.Cores[1]
    },
    lblTituloEp: {
        color: Cores.Cores[5],
        fontSize: 20
    },
    lblSinopseEp: {
        marginHorizontal: 20,
        marginTop: 20,
        color: Cores.Cores[5],
        fontSize: 16
    }
})