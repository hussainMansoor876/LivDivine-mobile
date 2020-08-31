import React from 'react';
import gql from 'graphql-tag';

const UPDATE_STATUS = gql`
mutation($userId: String!, $adminId: String!, $status: Boolean!){
    approvedAdvisor(userId: $userId,
      adminId: $adminId, status: $status){
      token, message, success, user {
        id, userName, email, role, image, isVerified, isLogin, authType, title, image,
          aboutService, aboutMe, isApproved, isAdvisor
      }
    }
  
  }
`

const UPDATE_ORDERS = gql`
mutation($userId: String!, $userOrderTypes: [UserOrderTypesss]!){
  updateUserOrderTypes(userId: $userId, userOrderTypes: $userOrderTypes){
    result {
      id, userName, orderTypeName, price, isActive
    }, success
  }
}
`

const UPDATE_CATEGORIES = gql`
mutation($userId: String!, $userCategories: [String]!){
  updateUserCategories(userId: $userId,
    userCategories: $userCategories) {
    result {
      id, userId, userName, categoryName
    }, success, message
  }
}
`

export {
  UPDATE_STATUS,
  UPDATE_ORDERS,
  UPDATE_CATEGORIES
}