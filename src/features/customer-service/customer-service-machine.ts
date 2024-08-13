'use client';

import {
  makePersonMachine,
  TPersonContext,
  TPersonEvent,
  TPersonMachine,
} from '@/features/person/person-machine';
import { makeRecorderMachine, TRecorderMachine } from '@/features/recorder/recorder-machine';
import { createActorContext } from '@xstate/react';
import { Logger, makeLogger } from 'vanilla-space-logger';
import { ActionArgs, Actor, sendTo, setup } from 'xstate';

const logger = makeLogger('customer-service', { level: 'debug' });

export function makeCustomerServiceMachine() {
  const agentLogger = logger.extend('agent');
  const customerLogger = logger.extend('customer');
  const recorderLogger = logger.extend('recorder');

  return setup({
    actors: {
      agent: makePersonMachine(agentLogger, 'agent').provide({
        actions: { communicate: makeCommunicateFn(agentLogger, 'agent') },
      }),
      customer: makePersonMachine(customerLogger, 'customer').provide({
        actions: { communicate: makeCommunicateFn(customerLogger, 'customer') },
      }),
      recorder: makeRecorderMachine(recorderLogger),
    },
  }).createMachine({
    type: 'parallel',
    states: {
      Agent: { invoke: { src: 'agent', id: 'agent', systemId: 'agent' } },
      Customer: { invoke: { src: 'customer', id: 'customer', systemId: 'customer' } },
      Recorder: { invoke: { src: 'recorder', id: 'recorder', systemId: 'recorder' } },
    },
  });
}

function makeCommunicateFn(logger: Logger, from: string) {
  return sendTo(
    (machine: ActionArgs<TPersonContext, TPersonEvent, TPersonEvent>) =>
      machine.system.get('recorder'),
    (_, message) => {
      logger.info('communicate:', message);
      return { type: 'RECORD_MESSAGE', value: { from, message } };
    },
  );
}

export const CustomerServiceActorContext = createActorContext(makeCustomerServiceMachine());

export function useAgentActorRef() {
  return CustomerServiceActorContext.useActorRef().getSnapshot().children
    .agent as Actor<TPersonMachine>;
}

export function useCustomerActorRef() {
  return CustomerServiceActorContext.useActorRef().getSnapshot().children
    .customer as Actor<TPersonMachine>;
}

export function useRecorderActorRef() {
  return CustomerServiceActorContext.useActorRef().getSnapshot().children
    .recorder as Actor<TRecorderMachine>;
}
