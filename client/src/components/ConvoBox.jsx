import { useEffect, useState } from 'react';
import Auth from '../utils/auth';

export default function ConvoBox({ chat, fooEvents, setFooEvents }) {  

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
            ))}
        </section>
    )
}