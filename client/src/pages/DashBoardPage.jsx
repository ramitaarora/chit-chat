import '../styles/dashboard.css';
import '/profile-bubble.png';
import '/profile-2.png';
import '/profile-3.png';
import '/profile-4.png';
function Dashboard() {

return (
<div>
  <section className="header">
  <h1>Chit Chat</h1>
  <h2>Chats</h2>
</section>
<section className="inbox-container">
  <content className="chat-preview">
      <section className="profile-picture">
          <img src="/profile-bubble.png" alt="user-one"></img>
      </section>
      <section className="message-preview">
          <h3>Friend One</h3>
          <p>So about coding...</p>
      </section>
  </content>

  <content className="chat-preview">
      <section className="profile-picture">
          <img src="/profile-2.png" alt="user-two"></img>
      </section>
      <section className="message-preview">
          <h3>Friend Two</h3>
          <p>Placeholder text...</p>
      </section>
  </content>

  <content className="chat-preview">
      <section className="profile-picture">
          <img src="/profile-3.png" alt="user-three"></img>
      </section>
      <section className="message-preview">
          <h3>Friend Three</h3>
          <p>console.log(Hello World)</p>
      </section>
  </content>

  <content className="chat-preview">
      <section className="profile-picture">
          <img src="/profile-4.png" alt="user-four"></img>
      </section>
      <section className="message-preview">
          <h3>Friend Four</h3>
          <p>Yeah I don't know what to say anymore</p>
      </section>
  </content>
  </section>
</div>
);
}

export default Dashboard;