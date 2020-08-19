import React from 'react';
import gql from 'graphql-tag';

const GET_ADVISORS = gql`
query($userId: String!, $isApproved: Boolean!){
    getAllAdvisorForAdmin(userId: $userId, isApproved: $isApproved) {
      message, success, user {
        id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
          aboutService, aboutMe, isApproved
  
      }
  
    }
  }
`

export {
    GET_ADVISORS
}