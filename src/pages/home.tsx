import React, { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import { getQueue } from "../firebase/firestore";
import Song from "../interfaces/song";
export default function Home() {
    const [queue, setQueue] = useState<Song[]>([]);
    const [currSong, setCurrSong] = useState<Song>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [songEnded, setSongEnded] = useState(false);
    const playerRef: any = useRef(null);
    async function updateQueue() {
        const localQueue = await getQueue();

        setQueue(localQueue);
    }
    function getSyncedSeek(localQueue: Song[]): [Song, number] {
        const totalTime = localQueue.reduce(
            (acc, curr) => acc + curr.duration,
            0
        );
        const beforeTime = new Date().getTime() / 1000;
        let remainder = beforeTime % totalTime;
        for (let i = 0; i < localQueue.length; i++) {
            if (remainder >= localQueue[i].duration) {
                remainder -= localQueue[i].duration;
            } else {
                return [localQueue[i], remainder];
            }
        }
        return [localQueue[0], 0];
    }
    function sync(localQueue: Song[]) {
        const [correctSong, seek] = getSyncedSeek(localQueue);
        console.log(seek)
        if (correctSong)
            console.log("fixing song")

            if (currSong !== correctSong) {
                setCurrSong(correctSong);
            }
        if (correctSong) {
            console.log("fixing")
            playerRef.current?.seek(seek);
        }
    }
    useEffect(() => {
        updateQueue();
    }, []);
    useEffect(() => {
        const coolinterval = setInterval(() => {
            if (queue.length > 0) {
                const [correctSong, seek] = getSyncedSeek(queue);
                if (playerRef.current) {
                    const offset = playerRef.current.seek() - seek;
                    if (correctSong && currSong) {
                        if (currSong.name !== correctSong.name || offset > 2) {
                            console.log(offset)
                            sync(queue);
                        }
                    } else {
                        console.log(correctSong,currSong)
                        sync(queue);
                    }
                } else {
                    console.log("WHY2")

                    sync(queue);
                }
            }
        }, 500);
        return () => {
            clearInterval(coolinterval);
        };
    }, [queue,currSong]);
    useEffect(() => {}, [songEnded]);
    function handleSongEnd() {
        setSongEnded(true);
    }
    function handleSongPlay() {
        setIsPlaying(true);
        sync(queue);
    }
    return (
        <div
            onClick={() => {
                if (!isPlaying) playerRef.current?.play();
            }}
            className="d-flex min-vh-100 align-items-center justify-content-center"
        >
            {currSong && (
                <ReactHowler
                    src={currSong.url}
                    ref={playerRef}
                    playing={true}
                    onEnd={handleSongEnd}
                    onPlay={handleSongPlay}
                />
            )}
            <div>
                <div className="h3">Abhinay's LoFi Radio</div>
                {isPlaying && (
                    <div className="">Currently Playing : {currSong?.name}</div>
                )}
                {!isPlaying && (
                    <div className="">
                        Click anywhere to start the playback!
                    </div>
                )}
            </div>
        </div>
    );
}
