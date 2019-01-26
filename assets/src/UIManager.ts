import Formatter from "./Formatter"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    userScore: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    public setUserScore(score: number) {
        this.userScore.string = Formatter.format(score);
    }

    public setUserName(name: string) {
        this.userName.string = name;
    }

}
