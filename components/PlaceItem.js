import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import Colors from '../constants/Colors'

const PlaceItem = (props) => {
    return(
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem} >
            <View style={styles.imgContainer}>
                <Image style={styles.image} source={{uri: props.imageUri}} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.address}>{props.address}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    placeItem: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imgContainer: {
        width: 70,
        height: 70,
        overflow: 'hidden',
        borderRadius: 35,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    image: {
        height: '100%',
        width: '100%',
    }, 
    infoContainer: {
        marginLeft: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    title: {
        color: 'black',
        fontSize: 18,
        marginBottom: 5,
    },
    address: {
        color: '#666',
        fontSize: 16,
    },
})

export default PlaceItem