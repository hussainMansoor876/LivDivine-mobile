import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loginStyles } from '../../styles'
import styles from '../../Navigation/style'
import { Header } from '../../Components'
import JobsList from './JobsList'

const MyJobs = (props) => {
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
    const [state, setState] = useState({
    })

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title='My Jobs' />
            <JobsList />
        </SafeAreaView>
    )
}

export default MyJobs
