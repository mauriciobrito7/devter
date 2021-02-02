import { AppLayout } from "components/AppLayout/AppLayout";
import { Button } from "components/Button/Button";
import useUser from "hooks/useUser";
import React, { useState } from "react";

const ComposeTweet = () => {
  const user = useUser();
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
            <Button disabled={message.length === 0}>Devitear</Button>
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
