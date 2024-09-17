import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const StatusButton = ({title, handlePress, containerStyles, textStyles, isLoading,}) => {
  return (
    <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={` min-h-[50px] justify-center items-center border-2 border-[#D4D4D4] 
            ${containerStyles} ${isLoading? 'bg-[#0560FD]':''}`}
        // disabled={isLoading}
    >
      <Text className={`text-[#9A9A9A] text-lg ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  )
}

export default StatusButton