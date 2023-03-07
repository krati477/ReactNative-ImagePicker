import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {WithSplashScreen} from './WithSplashScreen';

export const AppEntry = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    setIsAppReady(true);
  }, []);

  return <WithSplashScreen isAppReady={isAppReady}></WithSplashScreen>;
};
