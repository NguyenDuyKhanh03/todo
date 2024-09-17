import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '../constants/icons'

const SearchInput = ({title,value,placeholder,handleChangeText}) => {
  return (
    <View className='bg-[#F6F6F6] w-full h-14 px-4 flex-row rounded-xl items-center'>
        <TextInput 
          className='flex-1 text-base text-lime-400'
          value={value}
          placeholder='Find your task here..'
          placeholderTextColor='#DADADA'
          onChangeText={handleChangeText}
        />
        <TouchableOpacity > 
          <Image 
            source={icons.ic_search}
            className='w-6 h-6'
            resizeMode='contain'
          />

        </TouchableOpacity>
    </View>
  )
}

export default SearchInput