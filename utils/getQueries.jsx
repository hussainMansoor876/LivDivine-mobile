import React from 'react';
import gql from 'graphql-tag';

const GET_ADVISORS = gql`
query{
    getAllAdvisorForAdmin(userId: "891ecf72-8c28-4ce9-a77a-53cd1f33dc38", isApproved: true) {
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