import React, {useEffect, useRef, useState} from "react";
import ReactHowler from "react-howler";
import {io, Socket} from 'socket.io-client';
import CurrentlyPlaying from "../interfaces/currentlyPlaying";
import {DefaultEventsMap} from "socket.io-client/build/typed-events";

const SYNC_RATE=2000;

export default function Player() {
    const [currSong, setCurrSong] = useState<CurrentlyPlaying>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentState,setCurrentState]=useState<"X"|"W"|"P">("X");
    const [interacted,setInteracted]=useState(false);
    const playerRef: any = useRef(null);
    const [name,setName]=useState<string>();
    const [socket,setSocket]=useState<Socket<DefaultEventsMap, DefaultEventsMap>>();

    useEffect(()=>{
        if(!socket) {
            const socket=io("http://34.131.60.7:3001");
            setSocket(socket);
            return;
        }
        function sync(currSongArg?:CurrentlyPlaying){
            if(!currSong)return;
            let currentSong=currSong;
            if(currSongArg) currentSong=currSongArg;
            const seek=(new Date().getTime()-currentSong.start)/1000;
            const offset=Math.abs(seek-playerRef.current?.seek());
            if(offset>1) {
                playerRef.current?.seek(seek);
            }
        }

        socket.on("connect",()=>{
            setInterval(()=>{
                console.log("emoting")
                socket.emit("askSong")
            },SYNC_RATE)
            socket.on("receiveSong",(currentlyPlaying:CurrentlyPlaying|null,state:"W"|"P"|"X",nextPlaying:CurrentlyPlaying|null)=>{

                console.log(currentlyPlaying?.song.id,state)
                if(state==="P"&&currentlyPlaying) {
                    setCurrSong(currentlyPlaying);
                    sync(currentlyPlaying)
                    setIsPlaying(true);
                }
                if(nextPlaying){
                    if(!isPlaying&&currSong?.song.id!==nextPlaying.song.id) {
                        setCurrSong(nextPlaying);
                    }
                }
                setCurrentState(state);
            })
        })
    },[currSong,isPlaying,socket])

    function handleSongLoad(){
        setLoaded(true);
    }
    function handleSongEnd(){
        setIsPlaying(false);
        setLoaded(false);
    }

    function handleSongPlay(){
        setInteracted(true);
        setIsPlaying(true);
    }

    function handleDivClick(){
        if (!interacted && loaded) {
            playerRef.current?.play();
        }
        setInteracted(true);
    }

    return (
        <div
            onClick={handleDivClick}
            className="d-flex min-vh-100 align-items-center justify-content-center"
        >
            {currSong && (
                <ReactHowler
                    src={currSong.song.url}
                    ref={playerRef}
                    playing={isPlaying}
                    onLoad={handleSongLoad}
                    onPlay={handleSongPlay}
                    onEnd={handleSongEnd}
                />
            )}
            <div className="centre-card">
                <div className="h3">
                    Abhinay's LoFi Radio
                </div>
                {isPlaying&&interacted && (
                    <div className="">
                        Currently Playing : {currSong?.song.name}
                    </div>
                )}
                {loaded && !interacted && (
                    <div className="">
                        Click anywhere to start the playback!
                    </div>
                )}
                {currentState==="W"&&interacted&&
                    <div className="">
                        Waiting for the next song
                    </div>
                }
                {!loaded &&
                    <div className="spinner-border text-light" role="status"/>
                }
            </div>
        </div>
    );
}
