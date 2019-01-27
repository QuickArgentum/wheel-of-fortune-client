import UIManager from "./UIManager"
import PersistentStorage from "./PersistentStorage"
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property
    mainScene: string = ""

    @property(cc.Button)
    startButton: cc.Button = null;

    @property(cc.EditBox)
    nameBox: cc.EditBox = null;

    private ui: UIManager;
    private persistent: PersistentStorage;

    onButtonPressed(event: any) {
        if(this.startButton.interactable)
            this.onLogin();
    }

    onLogin() {
        this.persistent.username = this.nameBox.string;
        this.ui.fadeInCurtain(1.0, () => {
            cc.director.loadScene(this.mainScene);
        }, this);
    }

    onNameTextChanged() {
        let name = this.nameBox.string
        this.startButton.interactable = !!name.replace(/\s/g, '').length;
    }

    onLoad() {
        this.startButton.node.on(cc.Node.EventType.TOUCH_END, (event) => this.onButtonPressed(event));
        this.ui = this.getComponent(UIManager);
        this.persistent = cc.find("persistentNode").getComponent(PersistentStorage);
        this.startButton.interactable = false;
    }
}
