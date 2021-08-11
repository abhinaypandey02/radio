import React, {useEffect, useRef, useState} from "react";
import ReactHowler from "react-howler";
import {io, Socket} from 'socket.io-client';
import CurrentlyPlaying from "../interfaces/currentlyPlaying";
import {DefaultEventsMap} from "socket.io-client/build/typed-events";
import {Button, Form, Modal} from "react-bootstrap";
import {Chat} from "../interfaces/Chat";
import {v4} from 'uuid';

const SYNC_RATE = 2000;

function ChatBox({chats, sendMessage, name}: { chats: Chat[], sendMessage: (message: string) => void, name: string }) {
    const [message, setMessage] = useState("");
    return <div>
        <div id="chatBox" className="overflow-auto my-3 p-2" style={{maxHeight: "60vh"}}>
            {chats.map(chat => <div className={"my-3 " + (chat.sender === name ? "text-end" : "text-start")}
                                    key={chat.id}>
                <div style={{wordBreak: "break-all"}}>{chat.message}</div>
                <small className="fw-light">{chat.sender} | {chat.time}</small>
                <hr/>
            </div>)}
        </div>

        <Form onSubmit={(e) => {
            e.preventDefault();
            if(message==="")return;
            setMessage("");
            sendMessage(message)
        }} className="d-flex">
            <Form.Control className="me-2" value={message} onChange={e => setMessage(e.target.value)}
                          placeholder="Write a message"/>
            <Button disabled={message===""} type="submit">Send</Button>
        </Form>

    </div>
}


export default function Player() {
    const [currSong, setCurrSong] = useState<CurrentlyPlaying>();
    const [isPlaying, setIsPlaying] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [currentState, setCurrentState] = useState<"X" | "W" | "P">("X");
    const [interacted, setInteracted] = useState(false);
    const playerRef: any = useRef(null);
    const [name, setName] = useState<string>("");
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [isChatModalOpen, setIsChatModalOpen] = useState(false);
    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap>>();
    const [chats, setChats] = useState<Chat[]>([]);
    const [volume,setVolume]=useState(100);
    useEffect(() => {
        const boxRef = document.getElementById("chatBox");
        if (boxRef)
            boxRef.scrollTop = boxRef.scrollHeight;
    }, [chats])
    useEffect(() => {
        if (socket) {
            socket.emit("getChats");
        }
    }, [socket])
    useEffect(() => {
        if (!socket) {
            const socket = io("http://34.131.157.38:3001");
            setSocket(socket);
            return;
        }

        function sync(currSongArg?: CurrentlyPlaying) {
            let currentSong = currSong;
            if (currSongArg) currentSong = currSongArg;
            if (!currentSong) return;
            const seek = (new Date().getTime() - currentSong.start) / 1000;
            const offset = Math.abs(seek - playerRef.current?.seek());
            if (offset > 1) {
                playerRef.current?.seek(seek);
            }
        }

        socket.on("connect", () => {
            setInterval(() => {
                socket.emit("askSong")
            }, SYNC_RATE)
            socket.on("receiveSong", (currentlyPlaying: CurrentlyPlaying | null, state: "W" | "P" | "X", nextPlaying: CurrentlyPlaying | null) => {
                if (state === "P" && currentlyPlaying) {
                    setCurrSong(currentlyPlaying);
                    sync(currentlyPlaying)
                    setIsPlaying(true);
                }
                if (nextPlaying) {
                    if (!isPlaying && currSong?.song.id !== nextPlaying.song.id) {
                        setCurrSong(nextPlaying);
                    }
                }
                setCurrentState(state);
            })
            socket.on("newChat", (chats: Chat[]) => {
                setChats(chats);
            })
        })
    }, [currSong, isPlaying, socket])

    function sendMessage(message: string) {
        if (!socket || !name) return;

        const chat: Chat = {
            message,
            sender: name,
            id: v4(),
            time: new Date().toLocaleString()
        }
        socket.emit("sendChat", chat)

    }

    function handleSongLoad() {
        setLoaded(true);
    }

    function handleSongEnd() {
        setIsPlaying(false);
        setLoaded(false);
    }

    function handleSongPlay() {
        setInteracted(true);
        setIsPlaying(true);
    }

    function handleDivClick() {
        if (!interacted && loaded) {
            playerRef.current?.play();
        }
        setInteracted(true);
    }

    function handleChatClick() {
        if (name !== "") {
            setIsChatModalOpen(true);
            setIsNameModalOpen(false);
        } else {
            setIsNameModalOpen(true);
            setIsChatModalOpen(false);
        }
    }

    return (
        <div
            onClick={handleDivClick}
            className="d-flex min-vh-100 align-items-center justify-content-center"
        >
            <Modal show={isNameModalOpen} centered onHide={() => setIsNameModalOpen(false)}>
                <Modal.Header>Enter Name to Chat</Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Control placeholder="Name" value={name} onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Button onClick={handleChatClick} type="submit">Chat</Button>
                    </Form.Group>

                </Modal.Body>
            </Modal>
            <Modal show={isChatModalOpen} centered onHide={() => setIsChatModalOpen(false)}>
                <Modal.Header>Messages</Modal.Header>
                <Modal.Body>
                    <ChatBox name={name} chats={chats} sendMessage={sendMessage}/>
                </Modal.Body>
            </Modal>
            {currSong && (
                <ReactHowler
                    volume={volume/100}
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
                {isPlaying && interacted && (
                    <div className="">
                        Currently Playing : {currSong?.song.name}
                    </div>
                )}
                {loaded && !interacted && (
                    <div className="">
                        Click anywhere to start the playback!
                    </div>
                )}
                {currentState === "W" && interacted &&
                <div className="">
                    Waiting for the next song
                </div>
                }
                {!loaded &&
                <div className="spinner-border text-light m-3" role="status"/>
                }
                <input value={volume} onChange={e=> setVolume(parseInt(e.target.value))} step={1} min={1} max={100} className="form-range" type="range"/>
                <hr/>
                <div className="d-flex justify-content-between align-items-center">
                    {chats.length > 0 &&
                    <div>{chats[chats.length - 1].sender} says <i>{chats[chats.length - 1].message.slice(0, 20)}{chats[chats.length - 1].message.length > 20 && "..."}</i>
                    </div>}
                    <img alt="chat" className="ms-2 poh" onClick={handleChatClick}
                         src="https://img.icons8.com/material-outlined/24/000000/chat--v1.png"/>
                </div>
            </div>
        </div>
    );
}
