# XState pattern PoC

This repo has for purpose to support a discussion about implementation patterns where:

- Machines logic is kept small and focused
- Machines logic is reusable

## Overview

The example below is just to establish a PoC around `systems`, `sendTo` and how they can be leveraged to decouple the machines.

- [app](src%2Fapp): NextJS pages / layout only
- [features](src%2Ffeatures)
  - [customer-service](src%2Ffeatures%2Fcustomer-service): main machine built from reusable parts below.
  - [person](src%2Ffeatures%2Fperson): reusable machine
  - [recorder](src%2Ffeatures%2Frecorder): reusable machine

The example portrays a customer service machine having:

- an agent (thinks / talks / listen)
- a customer (thinks / talks / listen)
- a recorder (keeps a history of messages between agent and )

Although not implemented, the logic in `person` and `recorder` is meant to be reused e.g. in a "meeting" machine.

## Getting Started

This app is a standard NextJS app, run the development server with:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
