import React from 'react';

export type PersonChatProps = {
  title?: string;
  thinkingAbout?: string;
  currentState: string;
  isTalkDisabled: boolean;
  isListenDisabled: boolean;
  onTalkClick: VoidFunction;
  onListenClick: VoidFunction;
};

export function PersonChatControls({
  title = '',
  thinkingAbout = '',
  currentState,
  isTalkDisabled,
  isListenDisabled,
  onTalkClick,
  onListenClick,
}: PersonChatProps) {
  return (
    <section>
      <h3>{title}</h3>
      <p>State: {currentState}</p>
      <p>Current thought: {thinkingAbout}</p>
      <button type="button" disabled={isTalkDisabled} onClick={onTalkClick}>
        Say something
      </button>
      <button type="button" disabled={isListenDisabled} onClick={onListenClick}>
        Just Listen
      </button>
    </section>
  );
}
