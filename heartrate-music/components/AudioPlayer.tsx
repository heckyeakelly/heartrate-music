// import { React, useState } from 'react';
// import { Platform } from 'react-native';
// import { HStack, Icon, Slider, Spinner, VStack, Text, Button } from 'native-base';
// import { MaterialIcons } from '@expo/vector-icons';

// import { Audio } from 'expo-av';

// //  async function loadAndPlayAudio() {
// //     const { sound, status } = await Audio.Sound.createAsync(
// //       {
// //         uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
// //         headers: {
// //           key: value, 
// //         },
// //       },
// //       { isLooping: false },
// //     );
// //     if (status.isLoaded) {
// //       await sound.playAsync();
// //     }
// //   }

// type AudioPlayerViewProps = {
//   active: boolean; // is player active
//   playable: boolean; // whether we can play the specific audio or not.
//   loading: boolean; // is audio loading inside create async
//   isPlaying: boolean; // is current audio playing
//   playAudio: () => void; // callback function to play the audio.
//   pauseAudio: () => void; // callback function to pause the audio
//   totalDuration: number; // total time duration of the playable audio.
//   seekAudio: (value: number) => void; // value to jump on value for the audio (in milliseconds)
//   duration: number; // current playing duration value of audio player.
// };

// export function AudioPlayer({
//   active,
//   playable,
//   loading,
//   pauseAudio,
//   totalDuration,
//   seekAudio,
//   duration,
// }: AudioPlayerViewProps) {
//   const handleIconClick = (e) => {
//     if (Platform.OS === 'web') {
//       e?.preventDefault();
//       e?.stopPropagation();
//       if (!isPlaying) {
//         playAudio();
//       } else {
//         pauseAudio();
//       }
//     }
//   };

// const [sound, setSound] = useState();
// const [isPlaying, setIsPlaying] = useState(false);

//   async function playAudio() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(
//       { uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3' },
//       { shouldPlay: true }
//     );
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync();
//     setIsPlaying(true)
//   }

//   return (
//     <HStack
//       w="80%"
//       p={1}
//       justifyContent={'space-between'}
//       alignItems={'center'}
//       space={0}
//       bg={active ? 'blue.50' : 'grey.50'}
//       borderRadius={5}
//     >
//       {!playable ? (
//         <HStack
//           justifyContent={'center'}
//           alignItems={'center'}
//           position={'absolute'}
//           left={0}
//           right={0}
//           top={0}
//           bottom={0}
//           bg={'gray.900'}
//           opacity={0.6}
//           w={'100%'}
//           h={'100%'}
//           zIndex={99}
//           borderRadius={5}
//         >
//           <Text fontSize={14} fontFamily={'heading'} color={'singletons.50'}>
//             "not_answered"
//           </Text>
//         </HStack>
//       ) : null}
//       {loading ? (
//         <VStack mr={2} ml={2}>
//           <Spinner></Spinner>
//         </VStack>
//       ) : (
//         <Button
//           borderWidth={0}
//           variant="outline"
//           colorScheme="blue"
//           onPress={!isPlaying ? playAudio : pauseAudio}
//         >
//           <Icon
//             as={MaterialIcons}
//             name={!isPlaying ? 'play-arrow' : 'pause'}
//             color={!isPlaying ? 'grey.300' : 'blue.400'}
//             style={{ transform: [{ rotateY: '0deg' }] }}
//             onPress={(e) => handleIconClick(e)}
//           />
//         </Button>
//       )}
//       <Slider
//         w="60%"
//         size="sm"
//         colorScheme={'blue'}
//         defaultValue={0}
//         value={duration}
//         minValue={0}
//         maxValue={totalDuration == 0 ? 100 : totalDuration}
//         accessibilityLabel="Audio Player"
//         step={1}
//         onChange={seekAudio}
//       >
//         <Slider.Track bg={'grey.100'} size={2}>
//           <Slider.FilledTrack bg={'blue.400'} size={2} />
//         </Slider.Track>
//         <Slider.Thumb bg={'blue.400'} ml={-2} />
//       </Slider>
//       <Text fontFamily={'body'} color={active ? 'blue.600' : 'grey.400'} mr={2}>
//         {/* {audioDurationTime(totalDuration - duration)} */}
//       </Text>
//     </HStack>
//   );
// };

import * as React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

export function AudioPlayer() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3',
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? 'Pause' : 'Play'}
          onPress={() =>
            status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
          }
        />
      </View>
    </View>
  );
}

// export default AudioPlayer;

// import { useEffect, useState } from 'react';
// import { View, StyleSheet, Button } from 'react-native';
// import { Audio } from 'expo-av';

// export function AudioPlayer() {
//   const [sound, setSound] = useState();

//   async function playSound() {
//     console.log('Loading Sound');
//     const { sound } = await Audio.Sound.createAsync(
//       { uri: 'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3' },
//       { shouldPlay: true }
//     );
//     setSound(sound);

//     console.log('Playing Sound');
//     await sound.playAsync();
//   }

//   useEffect(() => {
//     return sound
//       ? () => {
//           console.log('Unloading Sound');
//           sound.unloadAsync();
//         }
//       : undefined;
//   }, [sound]);

//   return (
//     <View style={styles.container}>
//       <Button title="Play Sound" onPress={playSound} />
//     </View>
//   );
// }

export default AudioPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});