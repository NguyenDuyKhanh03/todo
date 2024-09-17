import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const Task = ({title,icon, handlePress}) => {
  return (
    <View className='p-2 w-full flex-row justify-start'>
      <Text className='text-lg text-red-600 flex-1'>{title}</Text>
      <TouchableOpacity
        onLongPress={handlePress}
      >
        <Image 
          source={icon}
          className='w-5 h-5 bg-sky-600 border-3 rounded-full'
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  )
}

export default Task