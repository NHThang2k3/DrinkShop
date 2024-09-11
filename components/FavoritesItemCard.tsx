import { Text, View, ImageProps} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';


interface FavoritesItemCardProps {
  id: string;
  imagelink_square: ImageProps;
  name: string;
  type: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  description: string;
  favourite: boolean;
  ToggleFavouriteItem: any;
}

const FavoritesItemCard: React.FC<FavoritesItemCardProps> = ({
  id,
  imagelink_square,
  name,
  type,
  ingredients,
  average_rating,
  ratings_count,
  description,
  favourite,
  ToggleFavouriteItem,
}) => {
  return (
    <View className="rounded-lg overflow-hidden">
      <ImageBackgroundInfo
        EnableBackHandler={false}
        imagelink_square={imagelink_square}
        type={type}
        id={id}
        favourite={favourite}
        name={name}
        ingredients={ingredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        ToggleFavourite={ToggleFavouriteItem}
      />
      <View
        className="gap-3 p-5">
        <Text className="text-black text-base font-JakartaExtraBold">Description</Text>
        <Text className="text-black text-base font-JakartaExtra">{description}</Text>
      </View>
    </View>
  );
};



export default FavoritesItemCard;
