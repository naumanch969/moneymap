import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'

const Home = () => {

  const { user } = useUser()


  return (
    <View>
      <Text>Home  {user?.fullName}</Text>
    </View>
  )
}

export default Home