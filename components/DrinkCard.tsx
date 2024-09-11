import React from 'react';
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageProps,
} from 'react-native';

import { icons } from '@/constants';


interface DrinkCardProps {
  id: string;
  index: number;
  type: string;
  imagelink_square: ImageProps;
  name: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const DrinkCard: React.FC<DrinkCardProps> = ({
  id,
  index,
  type,
  imagelink_square,
  name,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_square}
        className="w-32 h-32 rounded-2xl mb-space-15 overflow-hidden"
        resizeMode="cover">
        <View className="flex flex-row items-center justify-center px-3 absolute bg-gray-400 rounded-bl-2xl rounded-tr-2xl top-0 right-0">
          <Image source={icons.star} className="w-4 h-4"/>
          <Text className="text-white">{average_rating}</Text>
        </View>
      </ImageBackground>
      {/* <Text className="text-base font-JakartaSemi">{imagelink_square}</Text>  */}
      <Text className="text-base font-JakartaSemi">{name}</Text> 
      {/* <Text className="text-xs font-JakartaSemi">{special_ingredient}</Text> */}
      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-2xl font-JakartaSemiBold ">
          $ {price.price}
        </Text>
        <TouchableOpacity
          onPress={() => {
            buttonPressHandler({
              id,
              index,
              type,
              imagelink_square,
              name,
              prices: [{...price, quantity: 1}],
            });
          }}>
            <View className="flex items-center justify-center rounded-md bg-green-400 w-7 h-7 ">

            <Image source={icons.plus} className="w-4 h-4"/>
            </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};



export default DrinkCard;
