// version: 1.0.0
import Phaser from "phaser";
import PE2DSpineGameObject from "./PE2DSpineGameObject";
export default function registerSpineGameObjectFactory() {
    Phaser.GameObjects.GameObjectFactory.register("PE2DSpineGameObject", function (x, y, width, height) {
        return this.displayList.add(new PE2DSpineGameObject(this.scene, x, y, width, height));
    });
}
