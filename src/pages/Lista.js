import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator, TextInput } from 'react-native';
import ListaItem from '../components/ListaItem'
import Icon from 'react-native-vector-icons/MaterialIcons';
import TvMazeService from '../service/TvMazeService';

import cores from '../auxiliares/Cores';
const Cores = cores;

export default function Lista(props) {

    const [ListItems, setListaItems] = useState();
    const [ListLoading, setListaLoading] = useState(true);
    const [isSearching, setisSearching] = useState(false);
    const [Searchtext, setSearchtext] = useState();

    useEffect(() => {
        LoadAll();
    }, [])

    function GoToDetail(Serie) {
        props.navigation.navigate('DetalheSerie', { Serie: Serie });
    }

    function LoadAll() {
        if (!ListLoading)
            setListaLoading(true);

        TvMazeService.GetAll().then((result) => {
            setListaItems(result);
            setListaLoading(false);
        }).catch((error) => {
            alert(error);
            setListaLoading(false);
        });
    }

    function Pesquisar() {
        if (Searchtext == '') {
            LoadAll();
            return;
        }

        if (!ListLoading)
            setListaLoading(true);

        TvMazeService.SearchItems(Searchtext).then((result) => {
            setListaItems(result);
            setListaLoading(false);
        }).catch((error) => {
            alert(error);
            setListaLoading(false);
        });

    }

    function CloseBuscaClicked() {
        setSearchtext('');
        setisSearching(false);
        LoadAll();
    }

    const RenderItem = ({ item }) =>
    (
        <ListaItem Serie={item} ItemClicked={GoToDetail} />
    );

    return (
        <View style={SS.vBackground}>

            <View style={SS.vBusca}>
                {isSearching ?

                    <View style={SS.vBuscarAtivo}>
                        <TextInput style={SS.txtBuscar} value={Searchtext} onChangeText={(value) => { setSearchtext(value) }} placeholder="search..." placeholderTextColor={Cores.Cores[1]} onEndEditing={Pesquisar} />
                        <TouchableOpacity style={SS.btnBusca} onPress={CloseBuscaClicked}>
                            <Icon name="close" size={35} color={Cores.Cores[1]} />
                        </TouchableOpacity>
                    </View>

                    :

                    <View style={SS.vBuscarInativo}>
                        <Text style={SS.lblTitulo}>TvMaze</Text>

                        <TouchableOpacity style={SS.btnBusca} onPress={() => { setisSearching(true) }}>
                            <Icon name="search" size={35} color={Cores.Cores[1]} />
                        </TouchableOpacity>
                    </View>
                }
            </View>


            <View style={SS.vSeparator} />

            {ListLoading ?

                <ActivityIndicator size={30} color={Cores.Cores[3]} style={{ marginTop: 60 }} />

                :

                <FlatList
                    data={ListItems}
                    ListFooterComponent={() => (<View style={{ height: 60 }} />)}
                    renderItem={RenderItem}
                    keyExtractor={item => ListItems.indexOf(item)}
                    initialNumToRender={10}
                />
            }
        </View>
    )
}

const SS = StyleSheet.create({
    vBackground: {
        flex: 1,
        backgroundColor: Cores.Cores[0],
    },
    vBusca: {
        marginTop: 45,
        marginBottom: 10,
        paddingHorizontal: 30,
        height: 50,
    },
    vBuscarAtivo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    vBuscarInativo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    txtBuscar: {
        color: Cores.Cores[5],
        fontSize: 18,
        flex: 1
    },
    vSeparator: {
        height: 1,
        width: '100%',
        backgroundColor: Cores.Cores[1],
    },
    lblTitulo: {
        color: Cores.Cores[5],
        fontSize: 24
    },
    btnBusca: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }

})