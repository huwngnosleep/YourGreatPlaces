import React from 'react'
import { StyleSheet, Text, View, } from 'react-native'

const PlaceDetailScreen = (props) => {
    return(
        <View  >
            <Text></Text>
        </View>
    )
}

PlaceDetailScreen.navigationOptions = (navData) => {

    return {
        headerTitle: navData.navigation.getParam('placeTitle')
    }
}

const styles = StyleSheet.create({
    
})

export default PlaceDetailScreen