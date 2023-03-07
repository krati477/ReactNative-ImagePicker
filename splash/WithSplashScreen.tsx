import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Splash} from './Splash';

type withSplashProps = {
  children: React.ReactNode;
  isAppReady: boolean;
};

export const WithSplashScreen = (props: withSplashProps) => {
  return (
    <View>
      {props.isAppReady && props.children}
      <Splash isAppReady={props.isAppReady} />
    </View>
  );
};
