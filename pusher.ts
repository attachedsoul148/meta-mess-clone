import Pusher from "pusher";
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
    appId: "1589136",
    key: "4ea1bf02d3ecbf70d89b",
    secret: "b48d82714045536ff769",
    cluster: "eu",
    useTLS: true
});



export const clientPusher = new ClientPusher("4ea1bf02d3ecbf70d89b", {
    cluster: 'eu',
    forceTLS: true
})