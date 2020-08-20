import React from 'react';
import gql from 'graphql-tag';

const UPDATE_STATUS = gql`
mutation($userId: String!, $adminId: String!,$status: Boolean!){
    approvedAdvisor(userId: $userId,
      adminId: $adminId, status: $status){
      token, message, success, user {
        id, userName, email, role, image, isVerified, isLogin, authType, title, image,
          aboutService, aboutMe, isApproved, isAdvisor
      }
    }
  
  }
`

export {
    UPDATE_STATUS
}