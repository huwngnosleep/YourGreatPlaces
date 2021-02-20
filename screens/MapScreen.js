import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MapView, { Marker } from 'react-native-maps'

import Colors from '../constants/Colors'

const MapScreen = (props) => {
    const [selectedLocation, setSelectedLocation] = useState()

    const mapRegion = {
        latitude: 37,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    }

    const savePickedLocationHandler = useCallback(() => {
        if(!selectedLocation) {

            return
        }
        props.navigation.navigate('NewPlaceScreen', {
            selectedLocation,
        })
    }, [selectedLocation])

    useEffect(() => {
        props.navigation.setParams({
            savePickedLocationHandler,
        })
    }, [savePickedLocationHandler])

    const selectLocationHandler = (event) => {
        setSelectedLocation({
            lat: event.nativeEvent.coordinate.latitude,
            lng: event.nativeEvent.coordinate.longitude,
        })
    }

    let markerCoordinates

    if(selectedLocation) {
        markerCoordinates = {
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng
        }
    }

    return(
        <MapView 
            region={mapRegion}
            style={styles.map}
            onPress={selectLocationHandler}
        >
            {markerCoordinates && <Marker 
                title='Picked Location'
                coordinate={markerCoordinates}
            ></Marker>
            }
        </MapView>
    )
}

MapScreen.navigationOptions = (navData) => {
    const savePickedLocationHandler = navData.navigation.getParam('savePickedLocationHandler')

    return {
        headerRight: <TouchableOpacity 
                    style={styles.headerButton}
                    onPress={savePickedLocationHandler}
                >
                <Text style={styles.headerButtonText}>Save</Text>
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    headerButton: {
        marginHorizontal: 20,
    },
    headerButtonText: {
        fontSize: 16,
        color: Colors.primary,
    },
})

export default MapScreen