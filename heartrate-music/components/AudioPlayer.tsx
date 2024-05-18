import React from 'react';
import { Platform } from 'react-native';
import { HStack, Icon, Slider, Spinner, VStack, Text, Button } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

type AudioPlayerViewProps = {
  active: boolean; // is player active
  playable: boolean; // whether we can play the specific audio or not.
  loading: boolean; // is audio loading inside create async
  isPlaying: boolean; // is current audio playing
  playAudio: () => void; // callback function to play the audio.
  pauseAudio: () => void; // callback function to pause the audio
  totalDuration: number; // total time duration of the playable audio.
  seekAudio: (value: number) => void; // value to jump on value for the audio (in milliseconds)
  duration: number; // current playing duration value of audio player.
};

export function AudioPlayer({
  active,
  playable,
  loading,
  isPlaying,
  playAudio,
  pauseAudio,
  totalDuration,
  seekAudio,
  duration,
}: AudioPlayerViewProps) {
  const handleIconClick = (e) => {
    if (Platform.OS === 'web') {
      e?.preventDefault();
      e?.stopPropagation();
      if (!isPlaying) {
        playAudio();
      } else {
        pauseAudio();
      }
    }
  };
  return (
    <HStack
      w="80%"
      p={1}
      justifyContent={'space-between'}
      alignItems={'center'}
      space={0}
      bg={active ? 'blue.50' : 'grey.50'}
      borderRadius={5}
    >
      {!playable ? (
        <HStack
          justifyContent={'center'}
          alignItems={'center'}
          position={'absolute'}
          left={0}
          right={0}
          top={0}
          bottom={0}
          bg={'gray.900'}
          opacity={0.6}
          w={'100%'}
          h={'100%'}
          zIndex={99}
          borderRadius={5}
        >
          <Text fontSize={14} fontFamily={'heading'} color={'singletons.50'}>
            "not_answered"
          </Text>
        </HStack>
      ) : null}
      {loading ? (
        <VStack mr={2} ml={2}>
          <Spinner></Spinner>
        </VStack>
      ) : (
        <Button
          borderWidth={0}
          variant="outline"
          colorScheme="blue"
          onPress={!isPlaying ? playAudio : pauseAudio}
        >
          <Icon
            as={MaterialIcons}
            name={!isPlaying ? 'play-arrow' : 'pause'}
            color={!isPlaying ? 'grey.300' : 'blue.400'}
            style={{ transform: [{ rotateY: '0deg' }] }}
            onPress={(e) => handleIconClick(e)}
          />
        </Button>
      )}
      <Slider
        w="60%"
        size="sm"
        colorScheme={'blue'}
        defaultValue={0}
        value={duration}
        minValue={0}
        maxValue={totalDuration == 0 ? 100 : totalDuration}
        accessibilityLabel="Audio Player"
        step={1}
        onChange={seekAudio}
      >
        <Slider.Track bg={'grey.100'} size={2}>
          <Slider.FilledTrack bg={'blue.400'} size={2} />
        </Slider.Track>
        <Slider.Thumb bg={'blue.400'} ml={-2} />
      </Slider>
      <Text fontFamily={'body'} color={active ? 'blue.600' : 'grey.400'} mr={2}>
        {/* {audioDurationTime(totalDuration - duration)} */}
      </Text>
    </HStack>
  );
};

