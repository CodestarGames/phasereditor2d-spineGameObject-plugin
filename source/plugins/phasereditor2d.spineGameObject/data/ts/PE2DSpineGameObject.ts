// version: 1.0.0
class PE2DSpineGameObject extends Phaser.GameObjects.RenderTexture {

    textureKey: string;
    animationName:string;
    loop:boolean = false;
    brush: SpineGameObject;

    constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, key: string, animationName:string, loop:boolean) {
        super(scene, x, y, width, height);

        this.textureKey = key;
        this.animationName = animationName;
        this.loop = loop;

        scene.events.once("update", () => this.redraw());
    }

    redraw(): void {

        this.clear();
        const gr = new Phaser.GameObjects.Graphics(this.scene);
        this.draw(gr);

        gr.destroy();
    }

    setTexture(key: string): void {

        this.textureKey = key;

        this.redraw();
    }
}
