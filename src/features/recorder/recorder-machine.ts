'use client';

import { Logger } from 'vanilla-space-logger';
import { assertEvent, assign, setup } from 'xstate';

export type TRecorderMachine = ReturnType<typeof makeRecorderMachine>;
export type TRecordedMessage = { from?: string; timestamp: Date; message: string };

export type TRecorderContext = {
  chatHistory: TRecordedMessage[];
};
export type TRecorderEvent =
  | { type: 'STOP' }
  | { type: 'PAUSE' }
  | { type: 'RECORD' }
  | { type: 'RECORD_MESSAGE'; value?: TRecordedMessage };

export function makeRecorderMachine(logger: Logger) {
  return setup({
    types: {
      context: {} as TRecorderContext,
      events: {} as TRecorderEvent,
    },
    actions: {
      recordStateChange: assign({
        chatHistory: ({ context: { chatHistory }, event }, newState: string) => {
          logger.debug('recordStateChange', newState);
          return [...chatHistory, { timestamp: new Date(), message: newState }];
        },
      }),
      recordMessage: assign({
        chatHistory: ({ context: { chatHistory }, event }) => {
          assertEvent(event, 'RECORD_MESSAGE');
          logger.debug('recording message:', event.value);
          return [...chatHistory, { timestamp: new Date(), ...event.value } as TRecordedMessage];
        },
      }),
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QCUwGMD2AnCYsFkBDNACwEsA7MAOgGUAXDABycgGJkBRAYQHlkAIgG0ADAF1EoJhlhl6ZDBUkgAHogC0AJk0A2aiIDsAZl1GAHCZ0AWIwZ0AaEAE8NVgIybqR65oCsVgE5NA00zAKsAXwjHVEwcPCJSShpY7AhKKDZaABVeAAVRCSQQaVl5RWU1BC03K2ozHV0dAwCjEUtfM0cXaqNfPTcPALMrTQDG31adKJj0NITicipqVJwMtjyAQQBVWk5C5VK5BSViqtsDfQNfAxEdfytbsy7nDT6BoZGxidaZkFXcARFskVnM1hRMlw+IIAPr4Ti0WibADi+3EhxkxwqZze1G+ImGOjc4Wehmu3Q0ujM1DcZgMHjCoR07V8fwBCySyzyhAArrB2FD+MJ0cUjuVTqBzrcvEYAgYrI9iXS6b4KdV3J5vKN-EEQmFIn8KBhcPBiuygZywBiyidKhoiQF6u4dAFwo9NCIrA5XtVfCI3F4RiYzCJ-H1rmywYDEksaAxmKwINasRLVBobgGRm4XW6Qp7vT11O4jPUvsY5QYWkZI3Fo8DlgCMsnxXaENnqDdQ25fDdwqFZWqi24S89RuXK1Wa-MLbHqNy+ZBm7acQge9TszZNIMe5pZaqfUOR0HQ75aQFfLYolEgA */
    id: 'RecorderMachine',
    initial: 'Recording',
    context: { chatHistory: [] },

    states: {
      Stopped: {
        entry: { type: 'recordStateChange', params: 'Stopped' },
        on: {
          RECORD: { target: 'Recording' },
        },
      },

      Recording: {
        entry: { type: 'recordStateChange', params: 'Recording' },
        on: {
          STOP: 'Stopped',
          PAUSE: 'Paused',
          RECORD_MESSAGE: { target: 'Recording', actions: 'recordMessage' },
        },
      },

      Paused: {
        entry: { type: 'recordStateChange', params: 'Paused' },
        on: { RECORD: { target: 'Recording' } },
      },
    },
  });
}
