import React, { createContext, useContext, useState, ReactNode } from "react";

interface AudioProviderProps {
    children: ReactNode;
}

interface AudioContextType {
    activeTrack: number | null; // Change 'number' to the actual type of your tracks
    playTrack: (track: number) => void; // Change 'number' to the actual type of your tracks
    stopAllTracks: () => void;
}

const AudioContext = createContext<AudioContextType>({
    activeTrack: null,
    playTrack: () => {},
    stopAllTracks: () => {},
});

export const useAudioContext = () => {
    return useContext(AudioContext);
};

export const AudioProvider: React.FC<AudioProviderProps> = ({ children }) => {
    const [activeTrack, setActiveTrack] = useState<number | null>(null);

    const playTrack = (track: number) => {
        setActiveTrack(track);
    };

    const stopAllTracks = () => {
        setActiveTrack(null);
    };

    return (
        <AudioContext.Provider
            value={{ activeTrack, playTrack, stopAllTracks }}
        >
            {children}
        </AudioContext.Provider>
    );
};
