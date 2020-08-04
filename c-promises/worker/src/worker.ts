
import { doReallyComplicatedCalculations } from '../../main-app/src/calculations'

import { extractWorkerRequestMessage, buildWorkerResponseMessage } from '../../main-app/src/worker-messages';

addEventListener('message', ev => {

  let request = extractWorkerRequestMessage(ev);

  if (request && request.messageId && request.command) {
    if (request.command === 'doReallyComplicatedCalculations') {
      let result = doReallyComplicatedCalculations();

      postMessage(buildWorkerResponseMessage(request.messageId, request.command, result))
    }
  }

});


