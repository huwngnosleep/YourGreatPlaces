import React, { useState, useEffect } from 'react'
import { 
    StyleSheet, 
    View, 
    Button, 
    ActivityIndicator, 
    Alert,
    Text,
} from 'react-native'

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

import MapPreview from './MapPreview'

const LocationPicker = (props) => {
    const [pickedLocation, setPickedLocation] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const mapPickedLocation = props.navigation.getParam('selectedLocation')

    const { onLocationPicked } = props

    useEffect(() => {
        if(mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
        }
        props.onLocationPicked(mapPickedLocation)
    }, [mapPickedLocation, onLocationPicked])

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            )
            return false
        }
        return true
    }

    const pickOnMapHandler = () => {
        props.navigation.navigate('MapScreen')
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()

        if(!hasPermission) {
            return
        }

        try {
            setIsLoading(true)
            const location = await Location.getCurrentPositionAsync({
                timeout: 5000,
            })
            console.log(location)
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            }) 
            props.onLocationPicked({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            })
        } catch (error) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            )            
        }
        setIsLoading(false)
    }

    return(
        <View style={styles.locationPicker} >
            <MapPreview style={styles.mapPreview} location={pickedLocation}>
                {
                    isLoading ? 
                        <ActivityIndicator size='large' color={Colors.primary} />
                        :
                        <Text>No location chosen yet!</Text>
                }
            </MapPreview>
            <View style={styles.actions}>
                <Button 
                    title='Pick on map'
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
                <Button 
                    title='Get location'
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15,
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    }
})

export default LocationPicker