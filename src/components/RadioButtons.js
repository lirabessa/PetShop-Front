 // radio button component
 import React, { useState } from 'react'
 import { Text, TouchableOpacity, View } from 'react-native'
 
 const RadioButtons = (props) => {
   const radioPress = () => {
      props.setChecked(props?.item?.id)
   }
   return (
     <View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      margin:5,
    }}>
    
      <TouchableOpacity style={{
      }} onPress={radioPress}>
    
        <View style={[{
          height: 20,
          width: 20,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: '#000',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props?.checked == props?.item?.id ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: '#000',
              }} />
              : null
          }
        </View>
      </TouchableOpacity>
      <Text style={{
        marginLeft: 5,
        fontWeight:"500",
        fontSize:12,
        textTransform:"capitalize"
    
      }}>
        {props?.item?.label}
      </Text>
    
    </View>
  )
 }
 
 export default RadioButtons