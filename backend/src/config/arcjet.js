import arcjet, {tokenBucket,shield,detectBot} from '@arcjet/node'
import { ENV } from './env.js'

export const aj = arcjet({
    key:ENV.ARCJECT_KEY,
    characteristics:["ip.src"],
    rules:[
        //shield protect app from attacks SQL Injection, XSS, CSRF...
        shield({mode:"LIVE"}),
        //bot detection
        detectBot({
            mode:"LIVE",
            allow:["CATEGORY:SEARCH_ENGINE"]
        }),
        //rate limiting with tb algorithm
        tokenBucket({
            mode:"LIVE",
            refillRate:10,
            interval:10,
            capacity:15
        })
    ]
})