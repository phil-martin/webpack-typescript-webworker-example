import { doReallyComplicatedCalculations } from './calculations'

window.addEventListener('load', () => {
  setupSpinningThing();
  setupButtons();
});


let calcWorker = new Worker('worker.js');

calcWorker.addEventListener('message', ev => {
  logMessage(ev.data.text);
});


function setupButtons() {
  document.querySelector<HTMLButtonElement>("#calcMain")?.addEventListener('click', () => doCalculationOnMainThread());
  document.querySelector<HTMLButtonElement>("#calcWorker")?.addEventListener('click', () => doCalculationOnWebWorker());

  logMessage('Set up is done. Click a button!');

}

function doCalculationOnMainThread() {
  logMessage("doCalculationOnMainThread() ...")

  for (let i = 0; i < 10; ++i) {
    let result = doReallyComplicatedCalculations();
    logMessage(`doReallyComplicatedCalculations = ${result}`)
  }

  logMessage("doCalculationOnMainThread() done")

}

function doCalculationOnWebWorker() {
  logMessage("doCalculationOnWebWorker() ...")

  for (let i = 0; i < 10; ++i) {
    calcWorker.postMessage({ command: 'doReallyComplicatedCalculations' });
  }

  logMessage("doCalculationOnWebWorker() done")

}



function setupSpinningThing() {

  let spinnerDiv = <HTMLDivElement>document.querySelector(".spinner")

  let angle = 0;
  setInterval(() => {
    angle += 0.5;
    angle = angle % 360;
    spinnerDiv.style.transform = `rotate(${angle}deg)`;
  }, 10);
}

function addTextDiv(text: string) {
  const element = document.createElement('div');

  element.innerHTML = text;

  return element;
}

function logMessage(text: string) {
  document.body.appendChild(addTextDiv(`${new Date().toLocaleTimeString()} ${text}`));
}