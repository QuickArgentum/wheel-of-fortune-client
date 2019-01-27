import NetworkConnector from "./NetworkConnector"
import Formatter from "./Formatter"
import UIManager from "./UIManager"
import PersistentStorage from "./PersistentStorage"
import WheelAnimator from "./WheelAnimator"
const {ccclass, property} = cc._decorator;

@ccclass
export default class WheelController extends cc.Component {

    @property(cc.Node)
    wheel: cc.Node = null;

    @property(cc.Button)
    spinButton: cc.Button = null;

    private segmentLabels : cc.Label[] = [];
    private connector : NetworkConnector = null;
    private ui : UIManager = null;
    private animator : WheelAnimator = null;
    private username : string = "";
    
    private onSpin(event: any) {
        if(!this.spinButton.interactable)
            return;
        this.spinButton.getComponent(cc.Button).interactable = false;
        this.spinWheel();
    }

    private spinWheel() {
        this.connector.getSpin(this.username).then((res) => {
            this.animator.spinWheel(res.data.index, this.onSpinEnd, this);
        }).catch((err) => {
            console.log(err);
            this.ui.displayServerError();
            this.spinButton.getComponent(cc.Button).interactable = false;
        })
    }

    private onSpinEnd() {
        this.updateUserScore();
        this.setSegmentValues();
        this.ui.animateColors(0.5);
        this.animator.resetWheel(this.onResetEnd, this);
    }

    private onResetEnd() {
        this.spinButton.getComponent(cc.Button).interactable = true;
    }

    private initSegments() {
        for(let segment of this.wheel.children) {
            this.segmentLabels.push(segment.getComponentInChildren(cc.Label));
        }
    }

    private setSegmentValues() {
        this.connector.getSegments().then((res) => {
            for(let i = 0; i < 16; i++) {
                this.segmentLabels[i].string = Formatter.format(res.data[i]);
            }
        }).catch((err) => {
            console.log(err);
            this.ui.displayServerError();
            this.spinButton.getComponent(cc.Button).interactable = false;
        })
    }

    private updateUserScore() {
        this.connector.getScore(this.username).then((res) => {
            this.ui.setUserScore(res.data.score);
        }).catch((err) => {
            console.log(err);
            this.ui.displayServerError();
            this.spinButton.getComponent(cc.Button).interactable = false;
        })
    }
    
    onLoad () {
        this.spinButton.node.on(cc.Node.EventType.TOUCH_END, (event) => this.onSpin(event));
        this.connector = new NetworkConnector();
        this.ui = this.getComponent(UIManager);
        this.username = cc.find("persistentNode").getComponent(PersistentStorage).username;
        this.animator = this.wheel.getComponent(WheelAnimator);

        this.ui.setUserName(this.username);

        this.initSegments();
        this.updateUserScore();
        this.setSegmentValues();
    }
}
