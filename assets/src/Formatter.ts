const {ccclass, property} = cc._decorator;

@ccclass
export default class Formatter {

    private static readonly mult: string[] = ["", "k", "m", "b", "t"]

    public static format(val: number): string {
        let v = val;
        let i = 0;
        while(v >= 1000 && i < Formatter.mult.length) {
            v /= 1000;
            i++;
        }
        return v.toFixed(1).toString() + Formatter.mult[i];
    }
}
