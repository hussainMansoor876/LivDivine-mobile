import React from 'react';
import gql from 'graphql-tag';

const GET_ADVISORS = gql`
query($adminId: String!, $isApproved: Boolean!){
    getAllAdvisorForAdmin(userId: $adminId, isApproved: $isApproved) {
      message, success, user {
        id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
          aboutService, aboutMe, isApproved
  
      }
  
    }
  }
`

const GET_ALL_ADVISORS = gql`
query{
  getAllAdvisorForUser {
    message, success, user {
      id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
        aboutService, aboutMe, isApproved
    }

  }
}
`

const GET_FILTER = gql`
query($category: String, $orderType: String, $name: String){
  getAllAdvisor(categoryName: $category, orderTypeName: $orderType,
    advisorName: $name
  ) {
    message, success, user{
      id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
        aboutService, aboutMe, isApproved
    }
  }
}
`

export {
  GET_ADVISORS,
  GET_ALL_ADVISORS,
  GET_FILTER
}