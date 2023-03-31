import React, { useState } from 'react';
import '../../styles/components/resizableTextArea.css'

const ResizableTextarea = ({idRef}) => {
  const [resizeCounter, setResizeCounter] = useState(0);

  const autoResize = (e) => {
    if (resizeCounter < 3) {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';

      const currentHeight = parseInt(textarea.style.height);
      const containerHeight = textarea.parentElement.offsetHeight;
      if (currentHeight >= containerHeight) {
        setResizeCounter(resizeCounter + 1);
        textarea.style.height = currentHeight / 2 + 'px';
      }
    }
  };

  return (
    <div className="container">
      <textarea id={idRef} rows="3" onInput={autoResize}></textarea>
    </div>
  );
};

export default ResizableTextarea;
