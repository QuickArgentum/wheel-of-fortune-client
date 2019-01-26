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

    public static HSVToRGB(hue: number, saturation: number, value: number) {
        function f(n: number) : number {
            let k = (n + hue / 60) % 6;
            return value - value * saturation * Math.max(Math.min(k, 4 - k, 1), 0);
        }

        return {r: f(5) * 255, g: f(3) * 255, b: f(1) * 255};
    }
}
