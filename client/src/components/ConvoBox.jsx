import { useEffect, useState } from 'react';
import Auth from '../utils/auth';

export default function ConvoBox({ chat, fooEvents, setFooEvents, socket }) {  
  // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('chat message', (data) => {
            console.log("data", data);
            setFooEvents((state) => [
                ...state,
                {
                    textContent: data.message,
                    sender: data.user,
                },
            ]);
        });
        // Remove event listener on component unmount
        return () => socket.off('chat message');
    }, [socket]);

    useEffect(() => {
        console.log("fooEvents", fooEvents);
    }, [fooEvents])

    return (
        <section id="convoBox">
            {chat.text.map((message, index) => message.sender === Auth.getProfile().data._id ? (
                    <div key={index} className="senderTxt text-right">{message.textContent}</div>
                ) : (
                    <div key={index} className="receiverTxt">{message.textContent}</div>
                )
            )}
            {fooEvents.map((message, index) => message.sender === Auth.getProfile().data._id ? (
                <div key={index} className="senderTxt text-right">{message.textContent}</div>
            ) : (
                <div key={index} className="receiverTxt">{message.textContent}</div>
            )
            )}
        </section>
    )
}