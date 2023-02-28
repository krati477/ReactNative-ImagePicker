import React from 'react';
import {
  Image,
  ImageProps,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {CameraIcon, ImageIcon} from './icons';

interface GalleryProps extends ImageProps {
  onChange?: (file: ImageOrVideo) => void;
}

export const Gallery = (props: GalleryProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const [visible, setVisible] = React.useState(false);
  const [imgGallery, setImgGallery] = React.useState([]);
  const close = () => setVisible(false);
  const open = () => setVisible(true);

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      multiple: true,
    })
      .then(images => {
        //console.log(images.path, 'Gallery');
        setImgGallery(images);
        setUri(images.path);
        props.onChange?.(images);
      })
      .finally(close);
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      multiple: true,
    })
      .then(images => {
        setImgGallery(images);
        setUri(images.path);
        props.onChange?.(images);
      })
      .finally(close);
  };
 
  return (
    <>
      <TouchableOpacity onPress={open}>
      <Image
          style={styles.avatar}
          {...props}
          source={uri ? {uri} : props.source}
        />        
      </TouchableOpacity>
      
      
      <Modal
        isVisible={visible}
        onBackButtonPress={close}
        onBackdropPress={close}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <SafeAreaView style={styles.options}>
          <Pressable style={styles.option} onPress={chooseImage}>
            <ImageIcon />
            <Text> Library</Text>
          </Pressable>
          <Pressable style={styles.option} onPress={openCamera}>
            <CameraIcon />
            <Text> Camera</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
  },

  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
