const {ccclass, property} = cc._decorator;

@ccclass
export default class WheelAnimator extends cc.Component {

    @property
    secondsPerRevolution: number = 1;

    @property
    minFullRevolutions: number = 3;

    @property
    maxFullRevolutions: number = 6;

    @property
    pointerFadeInDuration: number = 2.0;

    @property(cc.Node)
    backgroundStar: cc.Node = null;

    @property(cc.Node)
    wheelShadow: cc.Node = null;

    @property(cc.Node)
    wheelPointer: cc.Node = null;

    public spinWheel(segmentIndex: number, selector: Function, selectorTarget: any) {
        let fullRevolutions = Math.floor(Math.random() * (this.maxFullRevolutions - this.minFullRevolutions + 1)) + this.minFullRevolutions;
        let segmentAngle = segmentIndex * 22.5;
        let angle = fullRevolutions * 360 + segmentAngle;

        let rotate = cc.rotateBy(angle * this.secondsPerRevolution / 360, -angle);
        rotate.easing(cc.easeElasticOut(3.0));
        let sequence = cc.sequence(rotate, cc.callFunc(selector, selectorTarget));
        let rotateStar = cc.rotateBy(angle * this.secondsPerRevolution / 360, -angle / 8);
        rotateStar.easing(cc.easeElasticOut(3.0));
        let fadePointer = cc.fadeIn(this.pointerFadeInDuration);

        this.node.runAction(sequence);
        this.wheelShadow.runAction(rotate.clone());
        this.backgroundStar.runAction(rotateStar);
        this.wheelPointer.runAction(fadePointer);
    }

    public resetWheel(selector: Function, selectorTarget: any) {
        let rotate = cc.rotateTo(0.5, 0.0);
        rotate.easing(cc.easeElasticInOut(3.0));
        let sequence = cc.sequence(rotate, cc.callFunc(selector, selectorTarget));
        let fadePointer = cc.fadeOut(0.5);

        this.wheelShadow.runAction(rotate.clone());
        this.node.runAction(sequence);
        this.wheelPointer.runAction(fadePointer);
    }
}
