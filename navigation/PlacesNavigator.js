import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import PlacesListScreen from '../screens/PlacesListScreen'
import PlaceDetailScreen from '../screens/PlaceDetailScreen'
import NewPlaceScreen from '../screens/NewPlaceScreen'
import MapScreen from '../screens/MapScreen'

import Colors from '../constants/Colors'

const PlacesNavigator = createStackNavigator({
    PlacesListScreen,
    PlaceDetailScreen,
    NewPlaceScreen,
    MapScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {

        },
        headerTintColor: Colors.primary,
    }
})

export default createAppContainer(PlacesNavigator)