import { useState } from 'react'; 
import { useMutation } from "@apollo/client";
import { SAVE_MESSAGE } from '../utils/mutations';
import { socket } from '../socket';
import Auth from '../utils/auth';

export default function SendBox(chatID) {
    const [isLoading, setIsLoading] = useState(false);
    const [saveMessage] = useMutation(SAVE_MESSAGE);

    const handleSendMsg = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        console.log(token)

        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message !== '') {
            socket.emit('chat message', { user: Auth.getProfile().data.username, message });
            console.log(message)
            try {
                const { data } = await saveMessage({
                    variables: {
                        id: chatID.chatID,
                        sender: Auth.getProfile().data._id,
                        textContent: message,
                    }
                })
                
                console.log(data)
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