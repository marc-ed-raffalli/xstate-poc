import { useSelector } from '@xstate/react';
import React, { useCallback } from 'react';
import { Actor } from 'xstate';
import { RecorderControls } from './recorder-controls';
import { TRecorderMachine } from './recorder-machine';

export type ContainerRecorderProps = {
  actor: Actor<TRecorderMachine>;
};

export function ContainerRecorder({ actor }: ContainerRecorderProps) {
  const currentState = useSelector(actor, (snapshot) => snapshot.value);
  const chatHistory = useSelector(actor, (snapshot) => snapshot.context.chatHistory);
  const isRecordDisabled = useSelector(actor, (snapshot) => !snapshot.can({ type: 'RECORD' }));
  const isPauseDisabled = useSelector(actor, (snapshot) => !snapshot.can({ type: 'PAUSE' }));
  const isStopDisabled = useSelector(actor, (snapshot) => !snapshot.can({ type: 'STOP' }));

  const onRecordClick = useCallback(() => actor.send({ type: 'RECORD' }), [actor]);
  const onPauseClick = useCallback(() => actor.send({ type: 'PAUSE' }), [actor]);
  const onStopClick = useCallback(() => actor.send({ type: 'STOP' }), [actor]);

  return (
    <RecorderControls
      currentState={currentState}
      chatHistory={chatHistory}
      onRecordClick={onRecordClick}
      onPauseClick={onPauseClick}
      onStopClick={onStopClick}
      isRecordDisabled={isRecordDisabled}
      isPauseDisabled={isPauseDisabled}
      isStopDisabled={isStopDisabled}
    />
  );
}
