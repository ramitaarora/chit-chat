import { useMutation } from "@apollo/client";
import { SAVE_MESSAGE } from '../utils/mutations';
import { socket } from 'socket.io-client';

export default function SendBox(chatID) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMsg = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const input = document.getElementById('messageInput');
        const message = input.value.trim();

        if (message !== '') {
            socket.emit('chat message', { user: 'User', message });

            const [saveMessage] = useMutation(SAVE_MESSAGE);

            try {
                const { data } = await saveMessage({
                    variables: {
                        _id: chatID,
                        sender: context.user._id,
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