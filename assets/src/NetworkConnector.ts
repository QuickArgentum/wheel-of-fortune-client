import axios from "./lib/axios"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NetworkConnector {
    private readonly axiosConfig = {
        baseURL: '127.0.0.1:3000/',
        timeout: 1000
    }

    private async getScore(username: string) : Promise<any> {
        const res = await axios.get("score?user=" + username, this.axiosConfig);
        return res;
    }

    private async getSegments() : Promise<any> {
        const res = await axios.get("segments", this.axiosConfig);
        return res;
    }

    private async getSpin(username: string) : Promise<any> {
        const res = await axios.get("spin?user=" + username, this.axiosConfig);
        return res;
    }
}
