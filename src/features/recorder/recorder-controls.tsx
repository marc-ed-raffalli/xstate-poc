import React, { useMemo } from 'react';
import { type TRecordedMessage } from './recorder-machine';
import styles from './recorder-controls.module.css';

export type RecorderControlsProps = {
  currentState: string;
  chatHistory: TRecordedMessage[];
  onPauseClick: VoidFunction;
  onStopClick: VoidFunction;
  onRecordClick: VoidFunction;
  isRecordDisabled: boolean;
  isPauseDisabled: boolean;
  isStopDisabled: boolean;
};

export function RecorderControls({
  currentState,
  chatHistory,
  onRecordClick,
  onPauseClick,
  onStopClick,
  isRecordDisabled,
  isPauseDisabled,
  isStopDisabled,
}: RecorderControlsProps) {
  const historyItems = useMemo(
    () =>
      chatHistory
        .slice()
        .reverse()
        .map((item) => (
          <li key={item.timestamp.getTime()} className={styles.item}>
            <pre style={{ marginTop: 0 }}>
              {item.timestamp.toISOString()} {item.from ? `- ${item.from}` : null}
            </pre>
            <cite>{item.message}</cite>
          </li>
        )),
    [chatHistory],
  );

  return (
    <div className={styles.root}>
      <h2>Recorder</h2>

      <section>
        <p>Status: {currentState}</p>

        <button type="button" disabled={isRecordDisabled} onClick={onRecordClick}>
          RECORD
        </button>
        <button type="button" disabled={isPauseDisabled} onClick={onPauseClick}>
          PAUSE
        </button>
        <button type="button" disabled={isStopDisabled} onClick={onStopClick}>
          STOP
        </button>
      </section>
      <section>
        <h3>Recorded chat history</h3>
        <ul className={styles.list}>{historyItems}</ul>
      </section>
    </div>
  );
}
