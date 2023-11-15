export default function ConvoBox({ chat }) {

    return (
        <section id="convoBox">
            {chat.text.map((each) => (
                <div>{textContent}</div>
            ))}
        </section>
    )
}