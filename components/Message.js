// all css was basically taken from https://github.com/paul-pagnan/react-instant-chat
export default ({ username, text, fromMe }) => {
  return (
    <div className={`message ${fromMe ? "from-me" : ""}`}>
      <div className="username">{username}</div>
      <div className="message-body">{text}</div>

      <style jsx>{`
        .message.from-me .username {
          display: none;
        }

        .message.from-me {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1px;
        }

        .message.from-me .message-body {
          background-color: #16103c;
          color: white;
        }

        .message {
          margin-bottom: 20px;
        }
        .message-body {
          max-width: 80%;
          display: inline-block;
          padding: 20px;
          background-color: #eee;
          border: 1px;
          border-radius: 5px;
          padding-right: 50px;
        }

        .username {
          font-weight: bold;
          font-size: 0.9rem;
          color: #999;
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
};
