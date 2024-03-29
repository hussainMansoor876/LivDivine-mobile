import React from 'react';
import gql from 'graphql-tag';

const SIGN_UP = gql`
        mutation($email: String!, $userName: String!, $password: String!){
            signUp(email: $email, userName: $userName, password: $password, isVerified: true) {
                token, message, success, user{
                  id, userName, email, role, image, isVerified, isOnline, authType, title, image,
                  aboutService, aboutMe, isApproved
                   }
            }
          }
        `;

const GET_USER = gql`
query($userId: ID!){
  user(id: $userId){
    id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
      aboutService, aboutMe, isAdvisor, isApproved,video, categories{
        id, categoryName
      }, orderTypes{
        id, userName, orderTypeName, subTitle, price, isActive
      }
  }
}
`

const LOGIN = gql`
mutation($email: String!, $password: String!){
    signIn(login: $email, password: $password){
      token, message, success, user {
         id, userName, email, role, image, isVerified, isOnline, authType, title,
        aboutService, aboutMe, isAdvisor, isApproved, video, categories{
          id, categoryName
        }, orderTypes{
          id, userName, orderTypeName, subTitle, price, isActive
        }
      }
    }
  }
`

const SOCIAL_LOGIN = gql`
mutation($email: String, $name: String!, $authType: String!, $id: String!, $image: String){
  socialSignUp(
    email: $email,
    userName: $name,
    authType: $authType,
    authId: $id,
    image: $image
    ){
      token, message, success, user {
        id, userName, email, role, image, isVerified, isOnline, authType, title,
       aboutService, aboutMe, isAdvisor, isApproved, video, 
       categories {
        id, categoryName
      }, orderTypes{
        id, userName, orderTypeName, subTitle, price, isActive
      }
     }
  }
}
`

const UPDATE_USER = gql`
mutation($id: String!, $userName: String, $photo: String, $title: String, $aboutMe: String, $aboutService: String){
  updateUser(id: $id, userName: $userName, image: $photo, title: $title, aboutMe: $aboutMe, aboutService: $aboutService){
    token, message, success, user {
      id, userName, email, role, image, isVerified, isOnline, authType, title, image,
        aboutService, aboutMe, isAdvisor, isApproved, video, categories{
          id, categoryName
        }, orderTypes{
          id, userName, orderTypeName, subTitle, price, isActive
        }
    }
  }
}
`

const UPDATE_PASSWORD = gql`
mutation($id: String!, $currentPassword: String!, $password: String!){
  updatePassword(id: $id,currentPassword: $currentPassword, password: $password) {
    token, message, success, user {
      id, userName, email, role, image, isVerified, isOnline, authType, title, image,
        aboutService, aboutMe, isAdvisor, isApproved, video, categories{
          id, categoryName
        }, orderTypes{
          id, userName, orderTypeName, subTitle, price, isActive
        }
    }
  }
}
`

const BECOME_ADVISOR = gql`
mutation($id: String, $userName: String!, $title: String!, $image: String!, $video: String!, $aboutService: String!, $aboutMe: String!, $categories: [String], $orderTypes:  [UserOrderTs]) {
  becomeAdvisor(id: $id,
    userName: $userName,
    title: $title,
    image: $image,
    video: $video ,
    role: "ADVISOR",
    aboutService: $aboutService,
    aboutMe: $aboutMe,
    isLogin: true,
    isAdvisor: true,
    isOnline: true,
    categories: $categories,
    orderTypes: $orderTypes
    ){
    token, message, success, user {
      id, userName, email, role, image, isVerified, isLogin, authType, title, image,
        aboutService, aboutMe, video, 
    }, categories{
      id, userName, categoryName, 
    },
    orderTypes{
      id, userName, orderTypeName, subTitle, price, isActive
    }
  }
}
`

export {
  SIGN_UP,
  LOGIN,
  SOCIAL_LOGIN,
  UPDATE_USER,
  UPDATE_PASSWORD,
  BECOME_ADVISOR,
  GET_USER
}