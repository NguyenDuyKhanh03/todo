import { View, Text, FlatList, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState, useMemo, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import StatusButton from '../components/StatusButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '../constants/icons'
import Task from '../components/Task'
import AsyncStorage from '@react-native-async-storage/async-storage';

const RootLayout = () => {
  const [isLoading, setIsLoading] = useState(1)

  const [dataProcess, setDataProcess] = useState([])
  const [dataComplete, setDataComplete] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [isChange, setIsChange] = useState(false);

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Error saving data: ", e);
    }
  };
  const data = useMemo(() => {
    return isLoading === 1 ? dataProcess : dataComplete;
  }, [isLoading, dataProcess, dataComplete])

  console.log('data', data)
  // const handleAddItem = () => {
  //   if (inputValue.trim() === '') return; 

  //   const newItem = { id: (dataProcess.length + 1), name: inputValue };
  //   setDataProcess([...dataProcess, newItem]); 
  //   setInputValue(''); 
  //   setIsChange(!isChange)
  //   storeData('dataProcess', dataProcess);
  // };
  const handleAddItem = () => {
    if (inputValue.trim() === '') return;

    const newItem = { id: (dataProcess.length + 1), name: inputValue };
    setDataProcess((prev) => {
      const updateData = [...prev, newItem]
      storeData('dataProcess', updateData);
      return updateData
    });
    setInputValue('');
    setIsChange(!isChange)

  };

  const handleDataChange = (type) => {
    setIsLoading(type)
    if (type === 1) {
      // setDataProcess(dataProcess)
      setIsChange(!isChange)
    } else if (type === 2) {
      // setDataComplete(dataComplete)
      setIsChange(!isChange)
    }
  };

  const handleComplete = (item) => {
    const cloneDataProcess = [...dataProcess]
    cloneDataProcess.forEach(element => {
      const itemToMove = cloneDataProcess.find(element => element.id === item.id);
      if (itemToMove) {
        if (isLoading === 1) {

          const updatedDataProcess = cloneDataProcess.filter(data => data.id !== item.id);

          setDataProcess(updatedDataProcess);
          storeData('dataProcess', updatedDataProcess);
          const updateDataComplate = [...dataComplete, itemToMove]
          storeData('dataComplete', updateDataComplate);
          setDataComplete([...updateDataComplate]);
        }
        else {
          console.log(2)
          // const updatedDataComplete = dataComplete.filter(data => data.id !== item.id);
          // setDataComplete(updatedDataComplete);
          // storeData('dataComplete', updatedDataComplete);

        }
      }
    });

  }
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedDataProcess = await AsyncStorage.getItem('dataProcess');
        const storedDataComplete = await AsyncStorage.getItem('dataComplete');
        console.log('storedDataComplete', storedDataComplete)
        if (storedDataProcess)
          setDataProcess(JSON.parse(storedDataProcess));
        else {
          setDataProcess([]);
        }

        if (storedDataComplete)
          setDataComplete(JSON.parse(storedDataComplete));
        else {
          setDataComplete([]);
        }
      } catch (e) {
        console.error("Error loading data: ", e);
      }
    };

    loadData();
  }, []);

  return (
    <SafeAreaView className='w-full h-full bg-white px-2 mt-4'>
      <SearchInput />
      <View className='mt-4 w-full h-12 flex-row border-2 rounded-md border-red-600 justify-center items-center px-2 py-2'>
        <TextInput
          className='flex-1 '
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          placeholder="Tên công việc"
        />
        <TouchableOpacity onPress={handleAddItem}>
          <Image
            source={icons.ic_plus}
            className='w-5 h-5 bg-black border-3 rounded-full'
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View>
      <FlatList
        className='mt-4'
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            title={item.name}
            icon={icons.ic_tick}
            handlePress={() => handleComplete(item)}
          />
        )}
        extraData={isChange}

        ItemSeparatorComponent={() => (
          <View className='h-[1px] bg-gray-900'></View>
        )}

        ListHeaderComponent={() => (
          <View className='flex-row'>
            <StatusButton
              title='In progress'
              handlePress={() => {
                // setIsLoading(1)
                handleDataChange(1)
              }}
              containerStyles='w-40 h-10 mr-2'
              isLoading={isLoading === 1}
            />
            <StatusButton
              title='Completed'
              handlePress={() => {
                console.log(3)
                // setIsLoading(2)
                handleDataChange(2)
              }}
              containerStyles='w-40 h-10 mr-2'
              isLoading={isLoading === 2}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <Image
            className='items-center justify-center w-11 h-11 '
            source={icons.ic_search}
            resizeMode='contain'
          />
        )}

      />
    </SafeAreaView>
  )
}

export default RootLayout