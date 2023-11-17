import Auth from '../utils/auth';

export default function ConvoBox({ chat }) {

    // if context.user === message.sender, append message to the right

    return (
            <section id="convoBox">
                {chat.text.map((message, index) => message.sender === Auth.getProfile().data._id ? (
                        <div key={index} className="senderTxt">{message.textContent}</div>
                    ) : (
                        <div key={index} className="receiverTxt">{message.textContent}</div>
                    )
                )}
            </section>
    )
}