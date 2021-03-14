import React from 'react'
import { View, Text } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { AdvisorStyles } from '../styles'
import FeatherIcon from 'react-native-vector-icons/Feather'


const Header = (props) => {
    const { navigation, title } = props
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()

    return (
        <View style={AdvisorStyles.headerView}>
            <FeatherIcon
                name='menu'
                size={30}
                color='#fff'
                onPress={navigation.toggleDrawer}
            />
            <Text style={{ color: '#fff', fontSize: 20, marginLeft: -10, alignSelf: 'center' }}>{title}</Text>
            <Text>&nbsp;</Text>
        </View>
    )
}


export default Header