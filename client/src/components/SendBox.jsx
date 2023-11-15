export default function SendBox({ sendMsg }) {
    return (
        <section>
            <input type="text"></input>
            <button onClick={sendMsg}>Send</button>
        </section>
    )
}