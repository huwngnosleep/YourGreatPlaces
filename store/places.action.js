import * as FileSystem from 'expo-file-system'

import { fetchPlaces, insertPlace } from '../helpers/db'

import ENV from '../env'

export const ADD_PLACE = 'ADD_PLACE'
export const SET_PLACES = 'SET_PLACES'

export const addPlace = (title, image, location) => {
    return async (dispatch) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng${location.lat},${location.lng}=&key=${ENV.googleApiKey}`)

        if(!response.ok) {
            throw new Error('Something went wrong!')
        }

        const resData = await response.json()
        const address = resData.result[0].formatted_address
        

        const fileName = image.split('/').pop()
        const newPath = FileSystem.documentDirectory + fileName

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            })
            var dbResult = await insertPlace(title, newPath, address, location.lat, location.lng)
            console.log(dbResult)
        } catch (error) {
            console.log(error)
            throw error
        }

        
        dispatch({
            type: ADD_PLACE,
            placeData: {
                id: dbResult.insertId,
                title,
                image: newPath,
            },
        })
    }
}

export const setPlaces = () => {
    return async (dispatch) => {
        try {
            var dbResult = await fetchPlaces()
            console.log(dbResult)
        } catch (error) {
            throw error
        }
        dispatch({
            type: SET_PLACES,
            places: dbResult.rows._array,
        })
    }
}