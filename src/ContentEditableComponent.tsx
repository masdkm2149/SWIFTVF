import React, { useState, useRef, useEffect } from 'react';

interface ContentEditableComponentProps {
  id: string;
  spellCheck: boolean;
  text: string;
}

const ContentEditableComponent: React.FC<ContentEditableComponentProps> = ({ id, spellCheck, text }) => {
  const [editableContent, setEditableContent] = useState<string>(text);
  const editableRef = useRef<HTMLDivElement>(null);

  const handleInput = (event: React.FormEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const newContent = event.currentTarget.textContent || '';

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editableRef.current!);
      preCaretRange.setEnd(range.startContainer, range.startOffset);
      const start = preCaretRange.toString().length;

      // Update content and restore cursor position
      setEditableContent(newContent);

      requestAnimationFrame(() => {
        const restoredRange = document.createRange();
        const updatedText = editableRef.current!.firstChild;

        if (updatedText) {
          restoredRange.setStart(updatedText, start);
          restoredRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(restoredRange);
        }
      });
    }
  };

  useEffect(() => {
    setEditableContent(text);
  }, [text]);

  return (
    <div
      ref={editableRef}
      contentEditable
      id={id}
      spellCheck={spellCheck}
      onInput={handleInput}
      dangerouslySetInnerHTML={{ __html: editableContent }} // Set inner HTML based on state
    />
  );
};

export default ContentEditableComponent;
