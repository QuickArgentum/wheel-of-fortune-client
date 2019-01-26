import axios from "./lib/axios"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NetworkConnector {
    
    private readonly baseURL = "http://127.0.0.1:3000"

    public async getScore(username: string) : Promise<any> {
        const res = await axios.get(this.baseURL + "/score?user=" + username);
        return res;
    }

    public async getSegments() : Promise<any> {
        const res = await axios.get(this.baseURL + "/segments");
        return res;
    }

    public async getSpin(username: string) : Promise<any> {
        const res = await axios.get(this.baseURL + "/spin?user=" + username);
        return res;
    }
}
