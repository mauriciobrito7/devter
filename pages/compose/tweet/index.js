import { AppLayout } from "components/AppLayout/AppLayout";
import { Button } from "components/Button/Button";
import useUser from "hooks/useUser";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { addDevit } from "../../../utils/firebase";

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADIGN: 1,
  SUCCESS: 2,
  ERROR: -1,
};
const ComposeTweet = () => {
  const user = useUser();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);
  const router = useRouter();

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
    }).then(() => {
      router.push("/home");
    });
  };

  const isButtonDisabled = !message.length || status === COMPOSE_STATES.LOADIGN;

  return (
    <>
      <AppLayout>
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            value={message}
            placeholder="What's going on?"
          ></textarea>
          <div>
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </AppLayout>
      <style jsx>{`
        div {
          padding: 15px;
        }
        textarea {
          width: 100%;
          border: 0;
          min-height: 200px;
          resize: none;
          padding: 15px;
          font-size: 21px;
          outline: 0;
        }
      `}</style>
    </>
  );
};

export default ComposeTweet;
