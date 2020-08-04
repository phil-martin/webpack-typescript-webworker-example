# Webpack, Typescript and Web Workers

These examples illustrate a way to make use of web workers to offload computation work into a background thread, freeing up our main browser thread for animations and user interaction.

Some of the challenges we face with client side app development:

* how do we make user interaction stays smooth?
* how to we package up our application code to be delivered to teh client?

## Running the examples

Each example is a client side web application, to run, go into the example you want to use and run 

```
npm install
npm run build
npm run serve
```

## a-no-workers

This is a starter example showing using webpack and typescript, and illustrates what happens without web workers


## b-starter-example

Illustrates how to:

* set up web pack to build a web worker entry point
* load the web worker
* Run the web worker
* Send and receive messages to communicate
* output the result.


## c-promises

Illustrates the starter example, but wraps some of the message passing into promises to allow simpler code to call a worker.