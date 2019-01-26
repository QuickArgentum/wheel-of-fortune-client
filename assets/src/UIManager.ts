import Formatter from "./Formatter"
const {ccclass, property} = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {

    @property(cc.Label)
    userScore: cc.Label = null;

    @property(cc.Label)
    userName: cc.Label = null;

    @property(cc.Node)
    primaryColorNodes: Array<cc.Node> = [];

    @property(cc.Node)
    secondaryColorNodes: Array<cc.Node> = [];

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    backgroundStar: cc.Node = null;

    public setUserScore(score: number) {
        this.userScore.string = "$" + Formatter.format(score);
    }

    public setUserName(name: string) {
        this.userName.string = name;
    }

    private createColors() {
        let hue = Math.floor(Math.random() * 360);
        const primarySat = 0.5;
        const backSat = 0.11;
        const starSat = 0.2;
        const secondaryVal = 0.7;

        return {
            primary: Formatter.HSVToRGB(hue, primarySat, 1),
            secondary: Formatter.HSVToRGB(hue, primarySat, secondaryVal),
            background: Formatter.HSVToRGB(hue, backSat, 1),
            star: Formatter.HSVToRGB(hue, starSat, 1)
        }
    }

    public animateColors(duration: number) {
        let colors = this.createColors();
        
        for(let node of this.primaryColorNodes){
            console.log(colors.primary.r, colors.primary.g, colors.primary.b);
            let action = cc.tintTo(duration, colors.primary.r, colors.primary.g, colors.primary.b);
            node.runAction(action);
        }
        for(let node of this.secondaryColorNodes){
            let action = cc.tintTo(duration, colors.secondary.r, colors.secondary.g, colors.secondary.b);
            node.runAction(action);
        }
        let action = cc.tintTo(duration, colors.background.r, colors.background.g, colors.background.b);
        this.background.runAction(action);
        let actionStar = cc.tintTo(duration, colors.star.r, colors.star.g, colors.star.b);
        this.backgroundStar.runAction(actionStar);
    }

    onLoad() {
        this.animateColors(0.0);
    }

}
