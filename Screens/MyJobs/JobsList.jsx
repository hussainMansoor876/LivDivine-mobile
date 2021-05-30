import React, { useState } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { ListItem } from 'react-native-elements'
import { useDispatch } from 'react-redux'
import JobDetailView from './JobDetailView'

const JobList = () => {
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {showDetail ? <JobDetailView backPress={() => setShowDetail(false)} /> :
        <TouchableOpacity onPress={() => setShowDetail(true)}>
          <ListItem
            leftAvatar={{ source: { uri: 'https://res.cloudinary.com/dklfq58uq/image/upload/v1567608968/sample.jpg' } }}
            title={'Mansoor Hussain'}
            subtitle={'Live Chat'}
            bottomDivider
            rightTitle={'$5'}
            rightSubtitle={'Completed'}
          />
        </TouchableOpacity>}
    </SafeAreaView>
  )
}

export default JobList

// import React from 'react'
// import { SafeAreaView } from 'react-native'
// import { List, ListItem, Body, Right, Text } from 'native-base'
// import { useDispatch } from 'react-redux'

// const JobList = () => {
//   const dispatch = useDispatch()
//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <List>
//         <ListItem onPress={() => console.log('hello')}>
//           <Body>
//             <Text>Kumar Pratik</Text>
//             <Text note>Job Type: Video Recording</Text>
//           </Body>
//           <Right>
//             <Text note>InProgress</Text>
//             <Text style={{ marginTop: 20 }}>$10</Text>
//           </Right>
//         </ListItem>
//         <ListItem>
//           <Body>
//             <Text>Kumar Pratik</Text>
//             <Text note>Job Type: Rush Video Recording</Text>
//           </Body>
//           <Right>
//             <Text note>Completed</Text>
//             <Text style={{ marginTop: 20 }}>$50</Text>
//           </Right>
//         </ListItem>
//       </List>
//     </SafeAreaView>
//   )
// }

// export default JobList