import axios from 'axios';

export default interface ClientOptions {
    aadClientId: string
}

var clientOptionsPromise : Promise<ClientOptions>;

export function loadClientOptionsAsync() {
    if (!clientOptionsPromise){
        clientOptionsPromise = axios.get("/api/ClientOptions").then(r => r.data as ClientOptions);
    }
    
    return clientOptionsPromise;
}