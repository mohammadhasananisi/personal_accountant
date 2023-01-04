import React,{useEffect} from "react";
import { Alert,Button,Platform,View } from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const ImagePicker_Component = (props) =>  {
  const getPermissionAsync = async () => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        var title = "خطا";
        var msg = "برنامه احتیاج به دسترسی به دوربین و گالری را دارد";
        Alert.alert(title, msg, [{ text: "ok" }]);
      }
    }
  };
  useEffect(() => {
    getPermissionAsync();
  }, []);
  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        // aspect: [4, 3],
        // quality: 1,
      });
      if (!result.cancelled) {
        // this.setState({ image: result.uri });
        // console.log(result.uri);
        props.ImagePicker_uri(result.uri);
      }

      // console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  return (
    <View>
      <Button title={props.title} onPress={pickImage} />
    </View>
  );
};

export default ImagePicker_Component;