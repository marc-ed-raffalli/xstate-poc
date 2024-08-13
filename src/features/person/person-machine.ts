'use client';

import { noop } from '@/utils/functions';
import { faker } from '@faker-js/faker';
import { Logger } from 'vanilla-space-logger';
import { assign, setup } from 'xstate';

export type TPersonMachine = ReturnType<typeof makePersonMachine>;

export type TPersonContext = {
  title?: string;
  thinkingAbout?: string;
};

export type TPersonEvent = { type: 'LISTEN' } | { type: 'START_TALKING' };

export function makePersonMachine(logger: Logger, title: string) {
  return setup({
    types: {
      context: {} as TPersonContext,
      events: {} as TPersonEvent,
    },
    actions: {
      thinksWhatToSay: assign({
        thinkingAbout: () => {
          const thinkingAbout = faker.lorem.sentence({ min: 3, max: 5 });
          logger.debug('thinking about:', thinkingAbout);
          return thinkingAbout;
        },
      }),
      communicate: noop,
    },
  }).createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QAUwCdYHsB2A6AKgBYCW2A1rAMQAyAkgMr4CiAcgNoAMAuoqAA6ZYxAC7EcvEAA9EAZhm4ATAoAcAFgCsHDqtUA2AOwL1M9QBoQAT0SqFuXUoCcKjgYCMrh7uUBfb+dQYOAQk5FSSsMIAhsJguJEAZjFoABSaWgCUlAFYeESkFJw8SCACQqLixdIIALSuqsq4HHIy+jb66oau6qrmVjXu+rjqShx1cgpeqhzqvv7oOQSRADYUNAzM7NwSpSJi2BJVMlO4Duq6qmMO+hwqZpaI7rga+gYOclpHGjN+INlB+MtVuEojE4ol0MlXFoOJk-rlAbBCttBLsKqAqtUVLY6vpDLjdE0HK5eohaq5BsMFKNVONJtNZr95kFqMQImBsFRGABBABK+AA+vgudQANK0FgAcSRxR25X2lVkqkGymU5ya+hVUIULRJ-Q8jV0rl053UwzqowUDLhuBZbI5lGB0ViCSSyRk0JhWSZeFtMQ50v4KLlB1JKkGehpLRMCnaujufQU5KGquUExM1wUOh8DOwmAgcAkcORZT2IZqMmUDlwnW0+NcRgMusx7rsqaJ6iJMgcNwcVu9wXy8BlQdLCvLF2ridrL3rZ30utcDU0RoMugcnmhuL7gXhKyHgZLaKk1l0dna+lO01UDim9SbY1wi5UbxaanX24WvvZ+5KI6PhxsE43kzC8ZAUN5zl1RNT1rclDRaM41FUXxfCAA */
    id: 'Person',
    initial: 'Thinks',
    context: { title },

    states: {
      Thinks: {
        entry: 'thinksWhatToSay',
        on: { LISTEN: 'Listens' },
        after: { '5000': { target: 'Talks' } },
      },
      Talks: {
        entry: {
          type: 'communicate',
          params: ({ context }: { context: TPersonContext }) => context.thinkingAbout,
        },
        on: { LISTEN: 'Listens' },
        after: { '1000': { target: 'Thinks' } },
      },

      Listens: {
        on: { START_TALKING: { target: 'Talks' } },
        after: {
          '30000': { target: 'Thinks' },
        },
      },
    },
  });
}
