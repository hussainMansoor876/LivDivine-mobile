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
query($userId: String!){
  getAllAdvisorForUser(userId: $userId) {
    message, success, user {
      id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
        aboutService, aboutMe, isApproved, categories {
        id, categoryName
      }, orderTypes {
        id, orderTypeName, subTitle, price, isActive
      }
    }
  }
}
`

const APPLY_FILTER = gql`
query($userId: String!, $category: String, $orderType: String, $name: String) {
  getAllAdvisor(userId: $userId, categoryName: $category, orderTypeName: $orderType, advisorName: $name
  ) {
    message, success, user{
      id, userName, email, authId, role, image, isVerified, isLogin, authType, title, image,
        aboutService, aboutMe, isApproved, categories{
        id, categoryName
      }, orderTypes{
        id, orderTypeName, subTitle, price, isActive
      }
    }
  }
}
`

export {
  GET_ADVISORS,
  GET_ALL_ADVISORS,
  APPLY_FILTER
}