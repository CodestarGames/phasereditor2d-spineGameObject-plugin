// version: 1.0.0
import Phaser from "phaser";
import PE2DSpineGameObject from "./PE2DSpineGameObject";

export default function registerSpineGameObjectFactory() {

    Phaser.GameObjects.GameObjectFactory.register("PE2DSpineGameObject",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height:number, key: string, animationName:string, loop:boolean) {

            return this.displayList.add(new PE2DSpineGameObject(this.scene, x, y, width, height, key, animationName, loop));
        });
}
