import React from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, ScrollView, Text, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { loginStyles, AdvisorStyles } from '../../styles'
import { Icon, Button, ListItem } from 'react-native-elements'
import { GET_ADVISORS } from '../../utils/getQueries'
import client from '../../Config/apollo'
import ViewAdvisor from './ViewAdvisor'

class ApprovedAdvisors extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            allAdvisors: [],
            showAdvisor: false,
            advisor: {}
        }
    }

    getData = () => {
        client.query({ variables: { adminId: '421c6267-7911-4686-91fe-fe424e8efe00', isApproved: true }, query: GET_ADVISORS })
            .then((res) => {
                const { getAllAdvisorForAdmin } = res.data
                if (getAllAdvisorForAdmin?.user?.length) {
                    this.setState({
                        allAdvisors: getAllAdvisorForAdmin.user,
                        isLoading: false
                    })
                }
                else {
                    this.setState({ isLoading: false })
                }
            })
            .catch((e) => {
                Alert.alert('Oops Something Went Wrong!')
                this.setState({ isLoading: false })
            })
    }

    componentDidMount() {
        const { user } = this.props
        // if (!user) {
        //     this.props.history.replace('/login')
        // }
        this.getData()
    }

    showProfile = (user) => {
        this.setState({
            advisor: user,
            showAdvisor: true
        })
    }


    render() {
        const { showAdvisor, advisor, allAdvisors, isLoading } = this.state

        if (showAdvisor) {
            return (
                <ViewAdvisor {...props} advisor={advisor} cancelView={() => this.setState({ showAdvisor: false })} />
            )
        }

        return (
            <SafeAreaView style={loginStyles.setFlex}>
                <View>
                    {
                        allAdvisors.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.userName}
                                leftAvatar={{ source: { uri: item.image } }}
                                bottomDivider
                                chevron={
                                    <Button
                                        title="View Profile"
                                        buttonStyle={AdvisorStyles.btnStyle}
                                        onPress={() => this.showProfile(item)}
                                    />
                                }
                            />
                        ))
                    }
                </View>
                {isLoading && !allAdvisors.length ? <ActivityIndicator
                    color="rgba(0, 0, 0, 0.5)"
                    size="small"
                    style={AdvisorStyles.activityStyle}
                /> : !isLoading && !allAdvisors.length ? <View style={AdvisorStyles.container}>
                    <Text>No Advisor found!</Text>
                </View> : null}
            </SafeAreaView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (user) => dispatch(loginUser(user)),
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ApprovedAdvisors)