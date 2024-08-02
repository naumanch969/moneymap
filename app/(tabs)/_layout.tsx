import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: Colors.PRIMARY, headerShown: false }} >
            <Tabs.Screen name='home' options={{
                headerTitle: 'Home',
                tabBarIcon: ({ color }) => (<Ionicons name='home' size={24} color={color} />),
            }} />
            <Tabs.Screen name='history' options={{
                headerTitle: 'History',
                tabBarIcon: ({ color }) => (<Ionicons name='timer-outline' size={24} color={color} />)
            }} />
            <Tabs.Screen name='profile' options={{
                headerTitle: 'Profile',
                tabBarIcon: ({ color }) => (<Ionicons name='person' size={24} color={color} />)
            }} />
        </Tabs>
    )
}

export default TabsLayout