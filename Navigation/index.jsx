import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Drawer from './Drawer'
import AppNavigator from './AppNavigator'
import TabNavigation from './TabNavigation'
import { gql } from 'apollo-boost'


const ADD_TODO = gql`
    mutation{
        signUp(
        email: "babar@gmail.com",
        userName: "babarkaramat",
        password: "123123123", isVerified: false){
        token
        }
  }
`


const Home = (props) => {
    const user = useSelector(state => state.authReducer.user)
    console.log(user)
    const dispatch = useDispatch()

    if (user) {
        if (user.role === 'ADMIN') {
            return (
                <TabNavigation />
            )
        }
        return (
            <Drawer />
        )
    }
    return (
        <AppNavigator />
    )
}

export default Home
