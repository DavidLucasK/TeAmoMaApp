// src/components/LoadingScreen.tsx
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { hideAsync } from 'expo-splash-screen';

type Props = {
    onComplete: (status: boolean) => void;
}

export default function LoadingScreen({ onComplete }: Props) {
    const [lastStatus, setStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);

    function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
        setStatus(status);

        if(status.isLoaded) {
            if(lastStatus.isLoaded !== status.isLoaded) {
                hideAsync();
            }

            if(status.didJustFinish){
                onComplete(true);
            }
        }
    }

    return(
        <Video
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        source={require('./assets/SplashLightBig.mp4')}
        isLooping={false}
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        shouldPlay={true}
        />
    )
}