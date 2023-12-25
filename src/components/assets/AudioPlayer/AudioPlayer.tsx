import { FC, memo, useEffect, useState } from "react";
import useSound from "use-sound"; //для работы со звуком
import qala from "../../../assets/MP3.mp3"; // импорт музыки
import cl from "./audioPlayer.module.scss";
import { useAudioContext } from "./AudioContext/AudioContext";
import { callsApi, getCallRecirdProps } from "../../../services/CallsService";

interface AudioPlayerProps extends getCallRecirdProps {
    trackId: number;
}

const AudioPlayer: FC<AudioPlayerProps> = memo(
    ({ trackId, record, partnership_id }) => {
        const { activeTrack, playTrack, stopAllTracks } = useAudioContext();
        const [isPlaying, setIsPlaying] = useState(false);
        const [play, { pause, duration, sound }] = useSound(qala);

        useEffect(() => {
            if (activeTrack === trackId) {
                play();
                setIsPlaying(true);
            } else {
                pause();
                setIsPlaying(false);
            }
        }, [activeTrack, play, pause, trackId]);

        const playingButton = () => {
            if (isPlaying) {
                stopAllTracks();
            } else {
                playTrack(trackId);
            }
        };

        const [seconds, setSeconds] = useState();

        const [formattedDuration, setDurationFormatted] = useState({
            min: "00",
            sec: "00",
        });

        useEffect(() => {
            if (duration) {
                const sec = duration / 1000;
                const min = Math.floor(sec / 60).toString();
                const secRemain = Math.floor(sec % 60).toString();
                const time = {
                    min: min,
                    sec: secRemain,
                };
                setDurationFormatted(time);
            }
        }, [duration]);

        useEffect(() => {
            const interval = setInterval(() => {
                if (sound) {
                    setSeconds(sound.seek([]));
                }
            }, 1000);
            return () => clearInterval(interval);
        }, [sound]);

        const [currentTime, setCurrentTime] = useState<number | null>(null);
        const [displayStyle, setDisplayStyle] = useState<React.CSSProperties>({
            display: "none",
        });

        const handleMouseMove = (event: React.MouseEvent<HTMLInputElement>) => {
            const currentTime = calculateCurrentTime(event);

            if (currentTime !== undefined && currentTime > 0) {
                const displayStyle: React.CSSProperties = {
                    display: "block",
                    position: "absolute",
                    left: `${event.clientX}px`,
                    top: `${event.clientY + window.scrollY - 15}px`,
                    transform: `translate(-50%, -50%)`,
                };

                setCurrentTime(currentTime);
                setDisplayStyle(displayStyle);
            }
        };

        const calculateCurrentTime = (
            event: React.MouseEvent<HTMLInputElement>
        ) => {
            const rangeWidth = event.currentTarget.clientWidth;
            const offsetX =
                event.clientX -
                event.currentTarget.getBoundingClientRect().left;
            const percentage = offsetX / rangeWidth;
            const maxTime =
                (event.currentTarget as HTMLInputElement).max || 100;

            const calculatedTime = percentage * +maxTime;

            return isNaN(calculatedTime) ? 0 : calculatedTime;
        };

        const handleMouseOut = () => {
            setDisplayStyle({ display: "none" });
        };

        const formatTime = (seconds: number) => {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
        };

        const padZero = (num: number) => {
            return (num < 10 ? "0" : "") + num;
        };

        const gradientBackground =
            seconds !== undefined && duration !== null
                ? `linear-gradient(to right, #002cfb ${
                      (seconds / (duration / 1000)) * 100
                  }%, #adbfdf ${(seconds / (duration / 1000)) * 100}%)`
                : undefined;

        const [getRecord, { isError, isLoading }] =
            callsApi.useGetCallRecordMutation({});

        const downloadHandler = async () => {
            const result = await getRecord({ record, partnership_id });
            // console.log("result:", result);
        };

        return (
            <div className={cl.audioPlayer}>
                <p className={cl.audioPlayer__duration}>
                    {padZero(parseInt(formattedDuration.min))}:
                    {parseInt(formattedDuration.sec)}
                </p>
                <button
                    className={`${isPlaying ? cl.stop : cl.play} ${
                        cl.audioPlayer__playButton
                    } ${!sound && cl.disabled}`}
                    onClick={playingButton}
                />
                <input
                    type="range"
                    min="0"
                    max={duration ? duration / 1000 : 0}
                    value={seconds}
                    className={cl.audioPlayer__timeline}
                    onChange={(e) => {
                        sound.seek([e.target.value]);
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseOut={handleMouseOut}
                    style={{
                        background: gradientBackground,
                    }}
                />
                <p style={displayStyle} className={cl.audioPlayer__tooltipTime}>
                    {currentTime !== null && formatTime(currentTime)}
                </p>

                <button
                    onClick={downloadHandler}
                    className={cl.audioPlayer__download}
                />
                <button className={cl.audioPlayer__delete} />
            </div>
        );
    }
);

export default AudioPlayer;
