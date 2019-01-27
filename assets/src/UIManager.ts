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
    wheel: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Node)
    backgroundStar: cc.Node = null;

    @property(cc.Node)
    blackCurtain: cc.Node = null;

    @property(cc.Node)
    serverErrorScreen: cc.Node = null;

    private segmentLabels : cc.Label[] = [];

    private getSegmentLabels() {
        for(let segment of this.wheel.children) {
            this.segmentLabels.push(segment.getComponentInChildren(cc.Label));
        }
        console.log(this.segmentLabels.length);
    }

    public setUserScore(score: number) {
        this.userScore.string = "$" + Formatter.format(score);
    }

    public setUserName(name: string) {
        this.userName.string = name;
    }

    public displayServerError() {
        this.serverErrorScreen.active = true;
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

        for(let label of this.segmentLabels) {
            let setInvisible = cc.fadeTo(0.0, 0);
            let action = cc.fadeIn(duration);
            let sequence = cc.sequence(setInvisible, action);
            label.node.runAction(sequence);
        }
    }

    private fadeOutCurtain(duration: number) {
        let action = cc.fadeOut(duration);
        this.blackCurtain.runAction(action);
    }

    onLoad() {
        this.getSegmentLabels();
        this.animateColors(0.0);
        this.fadeOutCurtain(1.0);
    }

}
