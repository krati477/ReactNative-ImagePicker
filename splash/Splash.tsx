import React, {useState, useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import type {EasingFunction} from 'react-native';

type splashProps = {
  isAppReady: boolean;
};

export const Splash = (props: splashProps) => {
  const containerOpacity = useRef(new Animated.Value(1)).current;
  const imageOpacity = useRef(new Animated.Value(0)).current;

  enum SplashState {
    Loading,
    FadeIn,
    WaitForReady,
    FadeOut,
    Hidden,
  }

  const [state, setState] = useState<SplashState>(SplashState.Loading);

  useEffect(() => {
    if (state === SplashState.FadeIn) {
      Animated.timing(imageOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setState(SplashState.WaitForReady);
      });
    }
  }, [imageOpacity, state]);

  useEffect(() => {
    if (state === SplashState.WaitForReady) {
      if (props.isAppReady) {
        setState(SplashState.FadeOut);
      }
    }
  }, [props.isAppReady, state]);

  useEffect(() => {
    if (state === SplashState.FadeOut) {
      Animated.timing(containerOpacity, {
        toValue: 0,
        duration: 1000, // FadeOut Duration
        delay: 2000, //Minimum time the logo will stay visible
        useNativeDriver: true,
        EasingFunction:'ease',
      }).start(() => {
        setState(SplashState.Hidden);
      });
    }
  }, [containerOpacity, state]);

  if (state === SplashState.Hidden) return null;

  return (
    <Animated.View
      collapsable={false}
      style={[style.container, {opacity: containerOpacity}]}>
      <Animated.Image
        source={require('./assets/splash.png')}
        fadeDuration={0}
        onLoad={() => {
          setState(SplashState.FadeIn);
        }}
        style={[style.image, {opacity: imageOpacity}]}
        resizeMode="cover"
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center', 
    marginTop: '80%',   
  },
  image: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
