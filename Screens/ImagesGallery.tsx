import * as React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ImageOrVideo} from 'react-native-image-crop-picker';
import {Gallery} from './Gallery';
import {UserInfo} from './UserInfo';

const Data = [
  {
    height: 1280,
    mime: 'image/jpeg',
    modificationDate: '1677572701000',
    path: 'file:///data/user/0/com.imagepicker/cache/react-native-image-crop-picker/IMG_20230227_191640.jpg',
    size: 174536,
    width: 960,
  },
  {
    height: 1280,
    mime: 'image/jpeg',
    modificationDate: '1677572701000',
    path: 'file:///data/user/0/com.imagepicker/cache/react-native-image-crop-picker/IMG_20230227_214337.jpg',
    size: 71228,
    width: 720,
  },
  {
    duration: 115714561,
    height: 1280,
    mime: 'video/mp4',
    modificationDate: '1677572701000',
    path: 'file:///data/user/0/com.imagepicker/cache/react-native-image-crop-picker/VID_20230227_214429.mp4',
    size: 5228385,
    width: 720,
  },
];

export const ImageGallery = () => {

  const [imgGallery, setImgGallery] = React.useState(Data);
  
  const OnAddImage = (images: ImageOrVideo) => {
    console.log(images, 'ImageGallery', Array.isArray(images) );
    
    if(Array.isArray(images) === false){      
      Data.push(images);      
      setImgGallery(Data); 
      //console.log("==============",imgGallery);    
    }else{            
      setImgGallery(imgGallery.concat(images));
    }
    
  };

  type ItemProps = {path: string};

  const Item = ({path}: ItemProps) => (
    <Image source={{uri: path}} style={styles.gallery} />
  );

  return (
    <View style={styles.scroll}>
      <View style={styles.userRow}>
        <Gallery onChange={OnAddImage} />
      </View>
      <View style={styles.alignGallery}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={imgGallery}
          renderItem={({item}) => <Item path={item.path} />}
          keyExtractor={(item, index) => index}
        />
      </View>
      <View style={styles.content} />
    </View>
  );
};

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: 'white',
    flex: 1,
    position: 'relative',
  },
  userRow: {
    backgroundColor: 'gold',
    borderRadius: 10,
    left: '86%',
    right: 0,
    height: 50,
    width: '100%',
    position: 'absolute',
    zIndex: 10,
  },
  content: {
    backgroundColor: '#d8d8db',
  },
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },
  gallery: {
    display: 'flex',
    margin: 20,
    height: 150,
    width: '90%',
    padding: 20,
  },
  alignGallery: {
    justifyContent: 'space-around',
    width: '100%',
    height: 'auto',
  },
});
