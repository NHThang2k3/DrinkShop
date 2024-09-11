import React from 'react';
import {
  Text,
  View,
  ImageProps,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';

import { icons } from '@/constants';

interface ImageBackgroundInfoProps {
  EnableBackHandler: boolean;
  imagelink_square: ImageProps;
  type: string;
  id: string;
  favourite: boolean;
  name: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  BackHandler?: any;
  ToggleFavourite: any;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  EnableBackHandler,
  imagelink_square,
  type,
  id,
  favourite,
  name,
  ingredients,
  average_rating,
  ratings_count,
  BackHandler,
  ToggleFavourite,
}) => {
  return (
    <View>
      <ImageBackground
        source={imagelink_square}
        style={{
          width: '100%',
          aspectRatio: 20 / 25,
          justifyContent: 'space-between',
        }}>
        {EnableBackHandler ? (
          <View className="px-6 py-12 flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {BackHandler();}}>
              <Image
                source={icons.back}
                tintColor="white"
                resizeMode="contain"
                className="w-6 h-6 "
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}>
                <Image
                source={icons.love}
                tintColor={ favourite ? "red" : "white" }
                resizeMode="contain"
                className="w-6 h-6"
              />
              
            </TouchableOpacity>
          </View>
        ) : (
          <View className="p-8 flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => {
                ToggleFavourite(favourite, type, id);
              }}>
              <Image
                source={icons.love}
                tintColor={
                  favourite ? "red" : "white"
                }
                resizeMode="contain"
                className="w-6 h-6 rounded-lg"
              />
            </TouchableOpacity>
          </View>
        )}

        <View className="px-5 py-5 bg-white  ">
          <View className="flex-col justify-between gap-4">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-black text-xl font-JakartaExtraBold">{name}</Text>
                <Text className="text-black text-base font-JakartaExtra">
                  {ingredients}
                </Text>
              </View>
              
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-1 items-center">
                <Image
                  source={icons.star}
                  tintColor="yellow"
                  resizeMode="contain"
                  className="w-6 h-6"
                />
                <Text className="text-black text-base font-JakartaExtraBold">{average_rating}</Text>
                <Text className="text-black text-base font-JakartaExtraBold">({ratings_count})</Text>
              </View>
              
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};



export default ImageBackgroundInfo;
