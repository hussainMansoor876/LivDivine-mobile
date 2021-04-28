import React, { useState, useEffect } from 'react'
import { SafeAreaView, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, removeUser } from '../../Redux/actions/authActions'
import { loginStyles, homeStyles, AdvisorStyles } from '../../styles'
import styles from '../../Navigation/style'
import client from '../../Config/apollo'
import { GET_ALL_ADVISORS, APPLY_FILTER } from '../../utils/getQueries'
import { GET_USER } from '../../utils/authQueries'
import { getFilterData } from '../../utils/helpers'
import { Header } from '../../Components'

import { AdvisorProfile } from '..'

const MyJobs = (props) => {
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
    })

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title='My Jobs' />
        </SafeAreaView>
    )
}

export default MyJobs
