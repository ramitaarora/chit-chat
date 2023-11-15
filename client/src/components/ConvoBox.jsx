import Auth from '../utils/auth';

export default function ConvoBox({ chat }) {

    return (
        <section id="convoBox">
            {chat.text.map((message) => message.sender === Auth.getProfile().data._id ? (
                    <div className="senderTxt">{message.textContent}</div>
                ) : (
                    <div className="receiverTxt">{message.textContent}</div>
                )
            )}
        </section>
    )
}