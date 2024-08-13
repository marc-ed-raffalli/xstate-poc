import { ContainerPersonChatControls } from '@/features/person/container-person-chat-controls';
import { ContainerRecorder } from '@/features/recorder/container-recorder';
import React from 'react';
import {
  useAgentActorRef,
  useCustomerActorRef,
  useRecorderActorRef,
} from './customer-service-machine';
import styles from './customer-service.module.css';

export function CustomerService() {
  const agentActorRef = useAgentActorRef();
  const customerActorRef = useCustomerActorRef();
  const recordActorRef = useRecorderActorRef();

  return (
    <div className={styles.root}>
      <div>
        <ContainerPersonChatControls actor={agentActorRef} />
        <ContainerPersonChatControls actor={customerActorRef} />
      </div>
      <ContainerRecorder actor={recordActorRef} />
    </div>
  );
}
