import { useSelector } from '@xstate/react';
import React, { useCallback } from 'react';
import { Actor } from 'xstate';
import { PersonChatControls } from './person-chat-controls';
import { TPersonMachine } from './person-machine';

export type ContainerPersonChatControlsProps = {
  actor: Actor<TPersonMachine>;
};

export function ContainerPersonChatControls({ actor }: ContainerPersonChatControlsProps) {
  const title = useSelector(actor, ({ context }) => context.title);
  const thinkingAbout = useSelector(actor, ({ context }) => context.thinkingAbout);
  const currentState = useSelector(actor, (snapshot) => snapshot.value);
  const isTalkDisabled = useSelector(actor, (snapshot) => !snapshot.can({ type: 'START_TALKING' }));
  const isListenDisabled = useSelector(actor, (snapshot) => !snapshot.can({ type: 'LISTEN' }));

  const onTalkStart = useCallback(() => actor.send({ type: 'START_TALKING' }), [actor]);
  const onListen = useCallback(() => actor.send({ type: 'LISTEN' }), [actor]);

  return (
    <PersonChatControls
      currentState={currentState}
      title={title}
      thinkingAbout={thinkingAbout}
      isTalkDisabled={isTalkDisabled}
      isListenDisabled={isListenDisabled}
      onTalkClick={onTalkStart}
      onListenClick={onListen}
    />
  );
}
