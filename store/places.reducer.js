import { ADD_PLACE, SET_PLACES } from "./places.action";
import Place from '../models/place'

const initialState = {
    places: [],
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLACES:
            return {
                ...state,
                places: action.places.map((place) => new Place(
                    place.id.toString(), 
                    place.title, 
                    place.imageUri,
                    place.address,
                    place.lat,
                    place.lng,
                )),
            }
        case ADD_PLACE:
            const newPlace = new Place(
                action.placeData.id.toString(), 
                action.placeData.title, 
                action.placeData.image,
                action.placeData.address,
                action.placeData.lat,
                action.placeData.lng,
            )
            return {
                ...state,
                places: state.places.concat(newPlace),
            }
    
        default:
            break;
    }

    return state
}