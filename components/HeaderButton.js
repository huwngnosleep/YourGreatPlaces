import React from 'react'
import { IonIcons } from '@expo/vector-icons'
import { HeaderButton } from 'react-navigation-header-buttons'

import Colors from '../constants/Colors'

const CustomHeaderButton = (props) => {
    return(
        <HeaderButton 
            {...props}
            IconComponent={IonIcons}
            iconSize={23}
            color={Colors.primary}
        />
    )
}

export default CustomHeaderButton