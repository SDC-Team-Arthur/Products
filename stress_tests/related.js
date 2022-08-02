import http from 'k6/http';
import { sleep, check } from 'k6';
import { Counter } from 'k6/metrics';

// A simple counter for http requests

export const requests = new Counter('http_reqs');

// you can specify stages of your test (ramp up/down patterns) through the options object
// target is the number of VUs you are aiming for

export const options = {
  //  stages: [
  //     { target: 1, duration: '15s' },
  //     { target: 10, duration: '0s'},
  //     { target: 10, duration: '15s' },
  //     { target: 100, duration: '0s' },
  //     { target: 100, duration: '15s' },
  //     { target: 1000, duration: '0s' },
  //     { target: 1000, duration: '15s'},
  //   ],
    // stages: [
    //   { target: 1, duration: '15s' },
    //   { target: 10, duration: '15s' },
    //   { target: 100, duration: '15s' },
    //   { target: 1000, duration: '15s'},
    // ],
    scenarios: {
      constant_request_rate: {
        executor: 'constant-arrival-rate',
        rate: 1000,
        timeUnit: '1s',
        duration: '30s',
        preAllocatedVUs: 1000,
        maxVUs: 2000
      }
    },
    // stages: [
    //   {target: 1000, duration: '0s'},
    //   {target: 1000, duration: '15s'}
    // ],
    thresholds: {
      http_req_duration: ['avg<50'],
    },
  };


export default function productIdStressTest() {
  const res = http.get('http://localhost:3000/products/10000/related')
  sleep(1);

  const checkRes = check(res, {
    '/products/10000/related - status is 200': (r) => r.status === 200,
    '/products/10000/related - response body exists': (r) => r.body.length !== 0,
  });
}


