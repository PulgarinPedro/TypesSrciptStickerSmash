import { View, Image } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import { /* @info */ PanGestureHandler,/* @end */ TapGestureHandler} from "react-native-gesture-handler";

const containerStyle = useAnimatedStyle(() => {
  return {
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  };
});


const onDrag = useAnimatedGestureHandler({
  onStart: (event, context) => {
    context.translateX = translateX.value;
    context.translateY = translateY.value;
  },
  onActive: (event, context) => {
    translateX.value = event.translationX + context.translateX;
    translateY.value = event.translationY + context.translateY;
  },
});

const AnimatedView = Animated.createAnimatedComponent(View);
const imageStyle = useAnimatedStyle(() => {
  return {
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  };
});

const onDoubleTap = useAnimatedGestureHandler({
  onActive: () => {
    if (scaleImage.value) {
      scaleImage.value = scaleImage.value * 2;
    }
  },
});
const scaleImage = useSharedValue(imageSize);
const AnimatedImage = Animated.createAnimatedComponent(Image);
export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  return (
    <PanGestureHandler onGestureEvent={onDrag}>
    <AnimatedView style={[containerStyle, { top: -350 }]}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
      <AnimatedImage
        source={stickerSource}
        resizeMode="contain"
        style={[imageStyle, { width: imageSize, height: imageSize }]}
      />
    </TapGestureHandler>
    </AnimatedView>
    </PanGestureHandler>
  );
}