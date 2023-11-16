export default function SendBox() {

    const handleSendMsg = () => {
        // Use socket.io here
    };

    return (
        <section>
            <input type="text"></input>
            <button onClick={handleSendMsg}>Send</button>
        </section>
    )
}