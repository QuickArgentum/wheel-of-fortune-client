const {ccclass, property} = cc._decorator;

@ccclass
export default class WheelAnimator extends cc.Component {

    @property
    secondsPerRevolution: number = 1;

    @property
    minFullRevolutions: number = 3;

    @property
    maxFullRevolutions: number = 6;

    public spinWheel(segmentIndex: number, selector: Function, selectorTarget: any) {
        let fullRevolutions = Math.floor(Math.random() * (this.maxFullRevolutions - this.minFullRevolutions + 1)) + this.minFullRevolutions;
        let segmentAngle = segmentIndex * 22.5;
        let angle = fullRevolutions * 360 + segmentAngle;

        let rotate = cc.rotateBy(angle * this.secondsPerRevolution / 360, -angle);
        rotate.easing(cc.easeElasticOut(3.0));
        let sequence = cc.sequence(rotate, cc.callFunc(selector, selectorTarget));
        this.node.runAction(sequence);
    }

    public resetWheel(selector: Function, selectorTarget: any) {
        let rotate = cc.rotateTo(0.5, 0.0);
        rotate.easing(cc.easeElasticInOut(3.0));
        let sequence = cc.sequence(rotate, cc.callFunc(selector, selectorTarget));
        this.node.runAction(sequence);
    }
}
