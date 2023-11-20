import { useState, useEffect } from 'react'; 
import { useMutation } from "@apollo/client";
import { SAVE_MESSAGE } from '../utils/mutations';
import { socket } from '../socket';
import Auth from '../utils/auth';

export default function SendBox({ chatID, fooEvents, setFooEvents }) {
    const [isLoading, setIsLoading] = useState(false);
    const [saveMessage] = useMutation(SAVE_MESSAGE);

    const handleSendMsg = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message !== '') {
            socket.emit('chat message', { user: Auth.getProfile().data._id, message });
            try {
                const { data } = await saveMessage({
                    variables: {
                        id: chatID,
                        sender: Auth.getProfile().data._id,
                        textContent: message,
                    }
                })
                console.log("saving message", data);
                // setFooEvents(previous => [...previous, {
                //     sender: Auth.getProfile().data._id,
                //     textContent: message,
                // }]);
                input.value = '';
                setIsLoading(false);

            } catch (err) {
                console.log(err)
            }
        }
    };

    return (
        <section>
            <form id="chatForm" onSubmit={handleSendMsg}>
                <input id="messageInput" type="text"/>
                <input type="submit"/>
            </form>
        </section>
    )
}