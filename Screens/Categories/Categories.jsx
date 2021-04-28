import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { loginStyles, categoriesStyles } from '../../styles'
import { Header } from '../../Components'
import categoriesData from '../../utils/categoriesData'
import CategoriesFilter from './CategoriesFilter'

const Categories = (props) => {
    const user = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        searchValue: '',
        allAdvisors: [],
        showFilter: false,
        selectedAdvisor: {},
        filterValue: '',
        category: ''
    })

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            {state.showFilter ? <CategoriesFilter {...props} hideFilter={() => updateField({ showFilter: false })} category={state.category} /> :
                <View style={loginStyles.setFlex}>
                    <Header {...props} title='Categories' />
                    <ScrollView style={loginStyles.setFlex}>
                        {categoriesData.map((v, i) => {
                            return (
                                <View key={i} style={categoriesStyles.titlesView}>
                                    {v.map((y, j) => {
                                        return (
                                            <TouchableOpacity key={j} style={categoriesStyles.cardStyle} onPress={() => updateField({ category: y.text, showFilter: true })}>
                                                <Text>{y.text}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>}
        </SafeAreaView>
    )
}

export default Categories
