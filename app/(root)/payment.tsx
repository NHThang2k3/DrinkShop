import React, {useState} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import PaymentMethod from '@/components/PaymentMethod';
import PaymentFooter from '@/components/PaymentFooter';
import {useStore} from '@/store/store';
import PopUpAnimation from '@/components/PopUpAnimation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '@/constants';

const PaymentList = [
  {
    name: 'Google Pay',
    icon: require('../../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = () => {
  const navigation = useNavigation()
  const {params: item} = useRoute();
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const addToOrderHistoryListFromCart = useStore(
    (state: any) => state.addToOrderHistoryListFromCart,
  );

  const [paymentMode, setPaymentMode] = useState('Credit Card');
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCartPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('history');
    }, 2000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="white" />

      {showAnimation ? (
        <PopUpAnimation
          style={{ flex: 1 }}
          source={require('../../lottie/successful.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <View className="px-6 py-4 flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}>
            <Image
                source={icons.back}
                tintColor="black"
                resizeMode="contain"
                className="w-5 h-5"
              />
          </TouchableOpacity>
          <Text className="text-xl font-JakartaExtraBold">Payments</Text>
          <View className="w-9 h-9" />
        </View>

        <View className="gap-4 p-4">
          <TouchableOpacity
            onPress={() => {
              setPaymentMode('Credit Card');
            }}>
            <View className={` bg-gray-800 border-2 rounded-2xl ${paymentMode == 'Credit Card' ? 'border-green-400':'border-gray-800'}`}>
              <View className="p-2.5 px-4 py-2.5 gap-9 rounded-lg">
                
                <View className="flex flex-row gap-2.5 items-center py-3">
                  <Text className="text-white text-xl">3 8 7 9 </Text>
                  <Text className="text-white text-xl">8 9 2 3 </Text>
                  <Text className="text-white text-xl">6 7 4 5 </Text>
                  <Text className="text-white text-xl">4 6 3 8 </Text>
                </View>
                <View className="flex flex-row justify-between items-center">
                  <View className="flex items-start">
                    <Text className="text-gray-400 text-xs">
                      Card Holder Name
                    </Text>
                    <Text className="text-white text-xl">
                      Lavender
                    </Text>
                  </View>
                  <View className="flex items-end">
                    <Text className="text-gray-400 text-xs">
                      Expiry Date
                    </Text>
                    <Text className="text-white text-xl">11/29</Text>
                  </View>
                </View>
              </View>
            </View>
            
          </TouchableOpacity>
          {PaymentList.map((data: any) => (
            <TouchableOpacity
              key={data.name}
              onPress={() => {
                setPaymentMode(data.name);
              }}>
              <PaymentMethod
                paymentMode={paymentMode}
                name={data.name}
                icon={data.icon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{price: item.amount, currency: '$'}}
        buttonPressHandler={buttonPressHandler}
      />
    </SafeAreaView>
  );
};


export default PaymentScreen;
