import React from 'react'
import { useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector, useDispatch } from 'react-redux'

import CustomHeaderButton from '../components/HeaderButton'
import PlaceItem from '../components/PlaceItem'

import * as placesActions from '../store/places.action'

const PlacesListScreen = (props) => {
    const places = useSelector((state) => state.places.places)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(placesActions.setPlaces())
    }, [dispatch])
    
    return(
        <FlatList
            data={places}
            renderItem={(itemData) => 
                <PlaceItem 
                    imageUri={itemData.item.imageUri}
                    title={itemData.item.title}
                    address={null}
                    onSelect={() => {
                        props.navigation.navigate('PlaceDetailScreen', {
                            placeTitle: itemData.item.title,
                            placeId: itemData.item.id,
                        })
                    }}
                />
            }
        />
    )
}

PlacesListScreen.navigationOptions = (navData) => {
    
    return {
        headerTitle: 'All Places',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item 
                title='Add Place' 
                iconName='ios-add' 
                onPress={() => {
                    navData.navigation.navigate('NewPlaceScreen')
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    
})

export default PlacesListScreen