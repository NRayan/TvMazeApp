import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native'
import BtnVoltar from '../components/BtnVoltar';
import TvMazeService from '../service/TvMazeService';
import cores from '../auxiliares/Cores';
import StFormat from '../auxiliares/StFormat';
import LinearGradient from 'react-native-linear-gradient';
const Cores = cores;

export default function DetalheSerie(props) {

    const [Serie, setSerie] = useState(props.route.params.Serie);

    const diasFormatados = FormartarDias();
    const [Seasons, setSeasons] = useState();
    const [EpisodesLoading, setEpisodesLoading] = useState(true);

    useEffect(() => {
        GetEpisodes();
    }, [])

    function GetEpisodes() {
        TvMazeService.GetEpisodes(Serie.id).then((result) => {
            groupSeasons(result);
        }).catch((error) => {
            alert(error);
            setEpisodesLoading(false);
        });
    }

    function groupSeasons(Episodes) {

        let temporadas = Episodes.reduce((r, a) => {
            r[a.season] = [...r[a.season] || [], a];
            return r;
        }, {});

        let temporadasArray = [];
        for (var prop in temporadas) {
            let objeto = { season: prop.toString(), episodes: temporadas[prop] };
            temporadasArray.push(objeto);
        }

        setSeasons(temporadasArray);

        setEpisodesLoading(false);
    }


    function GoToDetail(episode) {
        props.navigation.navigate('DetalheEpisodio', { episode: episode });
    }


    function goBack() {
        props.navigation.goBack();
    }

    function FormartarDias() {
        let DiasString = '';
        for (let index = 0; index < Serie.schedule.days.length; index++) {
            DiasString += Serie.schedule.days[index];
            if (index != Serie.schedule.days.length - 1)
                DiasString += ', ';
        }

        return 'at ' + Serie.schedule.time + ' on ' + DiasString;
    }

    return (
        <View style={SS.vBackground}>

            <ScrollView>

                <View style={SS.vImagem}>
                    <Image source={{ uri: (Serie.image != null ? Serie.image.original : 'https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg') }} style={SS.imgCapa} />
                    <LinearGradient colors={['rgba(0,0,0,0)', Cores.Cores[0]]} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{ position: 'absolute', left: 0, height: '50%', width: '100%' }} />
                    <Text style={SS.lblTituloSerie}>{Serie.name}</Text>
                </View>

                <View style={SS.vConteudo}>
                    <View style={{ flexDirection: 'row' }}>
                        {Serie.genres.map(genero => <Text key={Serie.genres.indexOf(genero)} style={SS.lblGenero}>{genero}</Text>)}
                    </View>

                    <Text style={SS.lblsinopse}>{StFormat.RemoveTags(Serie.summary)}</Text>

                    <Text style={SS.lblEstreia}>{diasFormatados}</Text>

                    <Text style={SS.lblEpisodios}>Episodes</Text>



                    {EpisodesLoading ?

                        <ActivityIndicator size={30} color={Cores.Cores[3]} style={{ marginTop: 60, marginBottom: 60 }} />

                        :

                        Seasons.map(season => (
                            <View key={Seasons.indexOf(season)} style={{ marginBottom: 30 }}>
                                <Text style={SS.lblTemporada}>Season {season.season}</Text>

                                {season.episodes.map(episode => (
                                    <TouchableOpacity key={season.episodes.indexOf(episode)} style={{ flexDirection: 'row', marginBottom: 10 }} onPress={() => GoToDetail(episode)}>
                                        <Image style={SS.imgCapaEpisodio} source={{ uri: episode.image != null ? episode.image.original : 'https://pbs.twimg.com/media/EIOH05vWoAA0yr2.jpg' }} />
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <Text style={SS.lblTituloEp}>{episode.name}</Text>
                                            {episode.summary == '' || episode.summary == null ? null : <Text style={SS.lblDescricaoEp}>{StFormat.RemoveTags(episode.summary)}</Text>}
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        ))
                    }

                </View>

                <View style={{ position: 'absolute', top: 25, left: 25 }}>
                    <BtnVoltar VoltarClicked={goBack} />
                </View>
            </ScrollView>
        </View >
    )
}

const SS = StyleSheet.create({
    vBackground: {
        flex: 1,
        backgroundColor: Cores.Cores[0]
    },
    vImagem: {
        height: 550,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    imgCapa: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: Cores.Cores[1],
    },
    lblTituloSerie: {
        fontSize: 22,
        color: Cores.Cores[5],
        marginBottom: 25,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 100,
        backgroundColor: 'rgba(0,0,0,.6)'
    },
    vConteudo: {
        paddingHorizontal: 20,
    },
    lblGenero: {
        fontSize: 16,
        color: Cores.Cores[5],
        backgroundColor: Cores.Cores[2],
        marginRight: 10,
        marginTop: 20,
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 100
    },
    lblsinopse: {
        color: Cores.Cores[5],
        fontSize: 16,
        marginTop: 20
    },
    lblEstreia: {
        color: Cores.Cores[3],
        fontSize: 16,
        marginTop: 5
    },
    lblEpisodios: {
        fontSize: 20,
        color: Cores.Cores[4],
        marginTop: 30,
        marginBottom: 15
    },
    lblTemporada: {
        color: Cores.Cores[5],
        fontSize: 18,
        marginBottom: 10
    },
    imgCapaEpisodio: {
        height: 84,
        width: 104,
        marginRight: 10,
        backgroundColor: Cores.Cores[1]
    },
    lblTituloEp: {
        color: Cores.Cores[5],
    },
    lblDescricaoEp: {
        color: Cores.Cores[3],
        fontSize: 12,
    },

})