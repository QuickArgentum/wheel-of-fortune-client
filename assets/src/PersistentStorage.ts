const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    username: string = 'test';

    onLoad() {
        cc.game.addPersistRootNode(this.node);
    }
}
