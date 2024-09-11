import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useStore} from '@/store/store';
import HeaderBar from '@/components/HeaderBar';
import EmptyListAnimation from '@/components/EmptyListAnimation';
import PopUpAnimation from '@/components/PopUpAnimation';
import OrderHistoryCard from '@/components/OrderHistoryCard';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const OrderHistory = () => {
  const navigation = useNavigation()
  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const [showAnimation, setShowAnimation] = useState(false);

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor={"white"} />

      {showAnimation ? (
        <PopUpAnimation
          style={{height: 250}}
          source={require('../../../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1 }}>
        <View className="flex flex-1 justify-between mb-16">
          <View className="flex flex-1">
            <HeaderBar title="Order History" />

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View className="gap-2 p-6">
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              className="m-5 bg-green-500 items-center justify-center h-16 rounded-xl"
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text className="text-xl text-white font-JakartaExtraBold">Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default OrderHistory;
