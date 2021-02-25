import React, { useState, useEffect } from "react";
import { Button } from "components/Button/Button";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import { addDevit, uploadImage } from "../../../utils/firebase";
import { Avatar } from "components/Avatar/Avatar";
import { Header } from "components/Header/Header";
import Head from "next/head";
import ArrowLeft from "components/Icons/ArrowLeft";
import LengthCounter from "components/LengthCounter/LengthCounter";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADIGN: 1,
  SUCCESS: 2,
  ERROR: -1,
};

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADING: 2,
  COMPLETE: 3,
};
const MAX_LENGTH = 280;

const ComposeTweet = () => {
  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const router = useRouter();
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
  const [task, setTask] = useState(null);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImgURL);
      };
      /*firebase events */
      task.on("state_changed", onProgress, onError, onComplete);
    }
  }, [task]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus(COMPOSE_STATES.LOADIGN);
    addDevit({
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    }).then(() => {
      router.push("/home");
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(DRAG_IMAGE_STATES.NONE);
    const file = e.dataTransfer.files[0];
    const task = uploadImage(file);
    setTask(task);
  };

  const isButtonDisabled =
    !message.length ||
    message.length > MAX_LENGTH ||
    status === COMPOSE_STATES.LOADING;

  return (
    <>
      <Head>
        <title>Make a new post</title>
      </Head>
      <Header>
        <ArrowLeft
          onClick={() => {
            router.back();
          }}
        />
        <Button onClick={handleSubmit} disabled={isButtonDisabled}>
          Devitear
        </Button>
      </Header>
      {message.length > MAX_LENGTH && (
        <p>
          <svg
            className=""
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          You have exceeded the maximum characters to Devitear
        </p>
      )}
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            value={message}
            placeholder="What's going on?"
          ></textarea>
          {imgURL && (
            <section className="remove-img">
              <button
                onClick={() => {
                  setImgURL(null);
                }}
              >
                x
              </button>
              <img src={imgURL} />
            </section>
          )}
          <LengthCounter characters={message.length} maxLength={MAX_LENGTH} />
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        p {
          display: flex;
          align-items: center;
          background-color: #e0245e;
          padding: 5px;
          padding-left: 10px;
          margin: 0;
          font-size: 0.8rem;
          color: white;
          letter-spacing: 0.05rem;
        }
        p > :global(svg) {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        svg:hover {
          cursor: pointer;
        }
        button {
          background: rgba(0, 0, 0, 0.5);
          border: 0;
          border-radius: 999px;
          color: #fff;
          font-size: 24px;
          width: 32px;
          height: 32px;
          top: 15px;
          position: absolute;
          right: 15px;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
          flex: 1;
        }
        .remove-img {
          position: relative;
          height: 320px;
          border-radius: 1em;
        }
        form {
          padding: 10px;
          width: 100%;
        }
        img {
          border-radius: 10px;
          width: 100%;
          height: 100%;
          width: 100%;
          object-fit: fill;
        }
        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
            ? "3px dashed #09f"
            : "3px solid transparent"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
          border-bottom: 2px solid #eee;
        }
      `}</style>
    </>
  );
};

export default ComposeTweet;
