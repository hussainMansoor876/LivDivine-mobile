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

const LOGIN = gql`
mutation($email: String!, $password: String!){
    signIn(login: $email, password: $password){
      token, message, success,user {
         id, userName, email, role, image, isVerified, isOnline, authType, title,
        aboutService, aboutMe, isAdvisor, isApproved, videoThumbnail
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
     token, message, success, user{
     id, userName, email, role, image, isVerified, isOnline, authType, title,
      aboutService, aboutMe, isAdvisor, isApproved, videoThumbnail
    }
  }
}
`

const UPDATE_USER = gql`
mutation($id: String!, $userName: String, $photo: String){
  updateUser(id: $id, userName: $userName, image: $photo){
    token, message, success, user {
      id, userName, email, role, image, isVerified, isOnline, authType, title, image,
        aboutService, aboutMe, isAdvisor, isApproved, videoThumbnail
    }
  }
}
`

const UPDATE_PASSWORD = gql`
mutation($id: String!, $currentPassword: String!, $password: String!){
  updatePassword(id: $id,currentPassword: $currentPassword, password: $password) {
    token, message, success, user {
      id, userName, email, role, image, isVerified, isOnline, authType, title, image,
        aboutService, aboutMe, isAdvisor, isApproved, videoThumbnail
    }
  }
}
`

const BECOME_ADVISOR = gql`
mutation($id: String, $userName: String!, $title: String!, $image: String!, $thumbnail: String!, $aboutService: String!, $aboutMe: String!) {
  becomeAdvisor(id: $id, userName: $userName, title: $title, image: $image, aboutService: $aboutService, aboutMe: $aboutMe, isAdvisor: true, isOnline: true, videoThumbnail: $thumbnail, isApproved: true, role: "ADVISOR"){
    token, message, success, user {
      id, userName, email, role, image, isVerified, isOnline, authType, title, image,
        aboutService, aboutMe, isAdvisor, isApproved, videoThumbnail
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
  BECOME_ADVISOR
}