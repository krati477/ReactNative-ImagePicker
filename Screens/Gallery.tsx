import React from 'react';
import {
  Image,
  ImageProps,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Linking,
  FlatList,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {CameraIcon, ImageIcon} from './icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface GalleryProps extends ImageProps {
  onChange?: (file: ImageOrVideo) => void;
}

export const Gallery = (props: GalleryProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);
  const [visible, setVisible] = React.useState(false);
  const [imgGallery, setImgGallery] = React.useState([]);
  const close = () => setVisible(false);
  const open = () => setVisible(true);

  const permission = async () => {
    // We need to ask permission for Android only
    if (Platform.OS === 'android') {
      // Calling the permission function
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Example App Camera Permission',
          message: 'Example App needs access to your camera',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        return Linking.openSettings();
      }
    }
  };

  const chooseImage = () => {
    ImagePicker.openPicker({
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

  const openCamera = async () => {
    permission();
    ImagePicker.openCamera({
      width: 300,
      height: 400,
    })
      .then(image => {
        setImgGallery(image);
        setUri(image.path);
        props.onChange?.(image);
      })
      .finally(close);
  };

  return (
    <>
      <TouchableOpacity onPress={open} style={styles.wrapper}>
        <MaterialIcons
          name={'add-photo-alternate'}
          color="black"
          size={48}
          style={styles.addImage}
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
  wrapper: {
    flex: 1,
    alignContent: 'flex-end',
  },
  addImage: {
    flex: 1,
    textAlign: 'right',
    alignContent: 'flex-end',
    height: 50,
    width: 50,
    flexDirection: 'row',
    position: 'absolute',
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
