// version: 1.0.0

function registerSpineGameObjectFactory() {

    Phaser.GameObjects.GameObjectFactory.register("PE2DSpineGameObject",
        function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height:number, key: string, animationName:string, loop:boolean) {

            return this.displayList.add(new PE2DSpineGameObject(this.scene, x, y, width, height, key, animationName, loop));
        });
}
