import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Rating, Image, SearchBar, Button, ListItem, Icon } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, homeStyles, AdvisorStyles, categoriesStyles } from '../../styles'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { appColor, orderTypes } from '../../utils/constant';
import styles from '../../Navigation/style'
import Modal from 'react-native-modal';
import client from '../../Config/apollo'
import { GET_ALL_ADVISORS, APPLY_FILTER } from '../../utils/getQueries'
import { GET_USER } from '../../utils/authQueries'
import CategoriesFilter from './CategoriesFilter'
import { Header } from '../../Components'
import categoriesData from '../../utils/categoriesData'

const Categories = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false)
    const [state, setState] = useState({
        searchValue: '',
        allAdvisors: [],
        showFilter: false,
        selectedAdvisor: {},
        filterValue: '',
        category: ''
    })

    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    };

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const applyFilters = (obj) => {
        client.query({ variables: obj, query: APPLY_FILTER })
            .then((res) => {
                const { getAllAdvisor } = res.data
                console.log('getAllAdvisor', getAllAdvisor)
                if (getAllAdvisor.success) {
                    updateField({ allAdvisors: getAllAdvisor.user })
                }
                else {
                    updateField({ allAdvisors: [] })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
            })
    }

    const updateModal = (val) => {
        const { searchValue, category } = state
        updateField({ filterValue: val })
        applyFilters({ userId: user.id, orderType: val, name: searchValue, category })
        setModalVisible(!isModalVisible)
    }

    const updateSearch = () => {
        const { searchValue, filterValue, category } = state
        applyFilters({ userId: user.id, orderType: filterValue, name: searchValue, category })
    }

    const updateClear = () => {
        const { filterValue, category } = state
        updateField({ searchValue: '' })
        applyFilters({ userId: user.id, orderType: filterValue, category })
    }

    const updateCategory = (val) => {
        const { searchValue, filterValue } = state
        updateField({ category: val, showFilter: true })
        applyFilters({ userId: user.id, orderType: filterValue, name: searchValue, category: val })
    }

    if (state.showFilter) {
        return (
            <CategoriesFilter {...props} hideFilter={() => updateField({ showFilter: false })} category={state.category} />
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header {...props} title="Categories" />
            <ScrollView style={loginStyles.setFlex}>
                {categoriesData.map((v, i) => {
                    return (
                        <View key={i} style={categoriesStyles.titlesView}>
                            {v.map((y, j) => {
                                return (
                                    <TouchableOpacity key={j} style={categoriesStyles.cardStyle} onPress={() => updateCategory(y.text)}>
                                        <Text>{y.text}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Categories;
