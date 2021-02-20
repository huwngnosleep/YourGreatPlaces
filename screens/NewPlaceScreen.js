import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, Button, View, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useDispatch } from 'react-redux'
import * as placesActions from '../store/places.action'

import ImgPicker from '../components/ImgPicker'
import LocationPicker from '../components/LocationPicker'

import Colors from '../constants/Colors'

const NewPlaceScreen = (props) => {
    const [title, setTitle] = useState('')
    const [image, setImage] = useState()
    const [selectedLocation, setSelectedLocation] = useState()

    const titleChangeHandler = (text) => {
        setTitle(text)
    }

    const dispatch = useDispatch()

    const savePlaceHandler = () => {
        dispatch(placesActions.addPlace(title, image, selectedLocation))
        props.navigation.goBack()
    }

    const imageTakenHandler = (imagePath) => {
        setImage(imagePath)
    }

    const locationPickedHandler = (location) => {
        setSelectedLocation(location)
    }

    return(
        <ScrollView>
            <View style={styles.form} >
                <Text style={styles.label}>Title</Text>
                <TextInput 
                    style={styles.input} 
                    onChangeText={titleChangeHandler}
                    value={title}    
                />
                <ImgPicker onImageTaken={imageTakenHandler} />
                <LocationPicker 
                    navigation={props.navigation} 
                    onLocationPicked={locationPickedHandler}
                />
                <Button 
                    title='Save Place' 
                    color={Colors.primary} 
                    onPress={savePlaceHandler}   
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    form: {
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 15,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2,
    }
})

NewPlaceScreen.navigationOptions = {
    headerTitle: 'Add Place'
}

export default NewPlaceScreen