import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Header } from '../../Components'
import { loginStyles, categoriesStyles, AdvisorStyles } from '../../styles'
import categoriesData from '../../utils/categoriesData'
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import client from '../../Config/apollo'
import { GET_FILTER } from '../../utils/getQueries'



const Categories = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const [isModalVisible, setModalVisible] = useState(false)
    const { navigation } = props
    const dispatch = useDispatch();
    const [state, setState] = useState({
        category: ''
    })


    const toggleModal = () => {
        setModalVisible(!isModalVisible)
    }

    const updateField = (obj) => {
        setState({
            ...state,
            ...obj
        })
    }

    const getData = (v) => {
        console.log(v)
        updateField({ category: v })
        searchData()
    }

    const searchData = () => {
        const { category } = state
        client.query({ variables: { category }, query: GET_FILTER })
            .then((res) => {
                const { getAllAdvisor } = res.data
                console.log('getAllAdvisor', getAllAdvisor.user)
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                // setLoading(false)
            })
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
                                    <TouchableOpacity key={j} style={categoriesStyles.cardStyle} onPress={() => getData(y.text)}>
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
