import React from "react";
import Head from "next/head";
import Message from "../components/Message";
import RoomService from "@roomservice/browser";
import { useRoomService } from "@roomservice/react";
import { useLocalStorage } from "../utils/localstorage";

const client = new RoomService({
  authUrl: `https://api.roomservice.dev/public/proj_01E06NTXDESCZHZFXQHEEEHD4X`
});

const Home = () => {
  const [doc, setDoc] = useRoomService(client, "public", { chat: [] });
  const [value, handleChange] = React.useState("");
  const [name, setName] = useLocalStorage(
    "name",
    `user${Math.floor(Math.random() * 100 + 1)}`
  );
  const messagesEndRef = React.useRef(null);

  React.useEffect(
    () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" }),
    [doc.chat]
  );

  const handleInput = e => handleChange(e.target.value);

  const handleNameChange = e => {
    console.log(name, e.target.value);
    setName(e.target.value);
  };

  const handleSubmit = () => {
    setDoc(prevDoc => {
      if (!prevDoc.chat) {
        prevDoc.chat = [];
      }
      prevDoc.chat.push({ text: value, username: name, date: new Date() });
    });
    handleChange("");
  };

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="content">
          <h3>room service chat app</h3>
          <input
            className="nameInput"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="enter your name here"
          />

          <div className="messages" id="messageList">
            {doc.chat ? (
              doc.chat.map(
                el =>
                  !!el.username && (
                    <Message
                      username={el.username}
                      text={el.text}
                      date={el.date}
                      fromMe={el.username === name}
                    />
                  )
              )
            ) : (
              <p>nobody chatting</p>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div class="footer">
          <input
            type="text"
            name="chat"
            value={value}
            onChange={handleInput}
            placeholder="Chat here"
          />
          <button onClick={handleSubmit}>send</button>
        </div>
      </div>

      <style jsx>{`
        :global(body) {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
            Helvetica, sans-serif;
        }

        body {
          font-family: "proxima-nova", sans-serif;
        }

        html,
        body,
        #app,
        .container {
          height: 70%;
          max-width: 100%;
          padding: 0px 10%;
        }

        input[type="text"] {
          margin: 10px 0px;
          height: 60px;
          color: #16103c;
          font: 400 1rem "proxima-nova", sans-serif;
          width: 80%;
          border: 1px solid #dee0e0;
          padding: 0 20px;
          -webkit-transition: border-color 0.2s ease-in-out;
          -moz-transition: border-color 0.2s ease-in-out;
          transition: border-color 0.2s ease-in-out;
        }

        input[type="text"]:focus {
          border: 1px solid #af9570;
          outline: none !important;
        }

        button {
          background-color: #16103c;
          color: white;
          font: 700 1rem "proxima-nova", sans-serif;
          border: none;
          position: relative;
          text-decoration: none;
          padding: 20px 80px;
          text-align: center;
          cursor: pointer;
          margin-top: 20px;
        }

        button:hover {
          background-color: #1e1e1e;
        }

        .container {
          display: flex;
          height: 70%;
          flex-direction: column;
        }

        #nameInput {
          align-self: center;
        }

        .messages {
          overflow-y: scroll;
          overflow-x: hidden;
          height: 500px;
          padding: 20px;
        }

        h3 {
          text-align: center;
          padding: 20px 0;
          margin: 0;
          border-bottom: 1px solid #ddd;
          background-color: #eee;
        }

        .chat-input {
          position: relative;
          overflow: scroll;
          padding: 0 40px;
          flex-shrink: 0;
          align-self: center;
        }
      `}</style>
    </div>
  );
};

export default Home;
