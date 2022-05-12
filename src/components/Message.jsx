import React from 'react';
import { TiTick } from 'react-icons/ti';
const Message = () => {
  return (
    <div className="message">
      <div>
        <span className='circle'>
          <TiTick />
        </span>
      </div>
      <span>Success!</span>
    </div>
  );
};

export default Message;
