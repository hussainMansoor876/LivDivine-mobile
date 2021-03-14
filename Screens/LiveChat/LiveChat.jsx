import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'
import { loginStyles } from '../../styles'
import { Header } from '../../Components'
import { GiftedChat, Bubble } from 'react-native-gifted-chat'

const LiveChat = (props) => {
    const { navigation } = props
    const user = useSelector(state => state.authReducer.user)
    const [messages, setMessages] = useState([])

    useEffect(() => {
        var obj = {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'React',
                avatar: 'https://placeimg.com/140/140/any'
            }
        }
        setMessages([obj])
    }, [])

    const onSend = useCallback((messages = []) => {
        console.log('messages', messages)
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const renderBubble = (prop) => {
        return (
            <Bubble
                {...prop}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#FF1493'
                    },
                    left: {
                        backgroundColor: '#0099FF'
                    }
                }}
                textStyle={{
                    left: {
                        color: '#FFFFFF'
                    }
                }}
            />
        )
    }

    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <Header
                title={user?.userName}
                {...props}
            />
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                    avatar: user?.image || null,
                    name: 'Mansoor'
                }}
                renderBubble={renderBubble}
                showAvatarForEveryMessage
                showUserAvatar
                renderUsernameOnMessage
            />
        </SafeAreaView>
    )
}

export default LiveChat
