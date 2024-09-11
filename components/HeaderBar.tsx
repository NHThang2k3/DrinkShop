import { Text, View} from 'react-native';
import React from 'react';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View className="p-4 flex flex-row items-center justify-between">
      <Text className="text-xl font-JakartaExtraBold">Hi, Lavender </Text>
    </View>
  );
};


export default HeaderBar;
