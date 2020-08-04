
import { doReallyComplicatedCalculations } from '../../main-app/src/calculations'

addEventListener('message', ev => {

  if (ev.data.command === 'doReallyComplicatedCalculations') {
    let result = doReallyComplicatedCalculations();

    postMessage({
      text: `from web worker: doReallyComplicatedCalculations = ${result}`,
    })
  }

});


