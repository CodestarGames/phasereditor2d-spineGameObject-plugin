namespace phasereditor2d.spineGameObject {

    export class PE2DSpineGameObject extends Phaser.GameObjects.RenderTexture implements scene.ui.sceneobjects.ISceneGameObject {

        private _editorSupport: SpineGameObjectEditorSupport;
        private _key: string;
        private _animationName: string = '';
        private _loop: boolean = true;
        private _textureImage: Phaser.GameObjects.Image;
        private _dirty: boolean;
        private _updateListener: () => void;
        private _brush: SpineGameObject;

        constructor(scene: scene.ui.Scene, x: number, y: number, width: number, height: number, key: string, animationName: string, loop: boolean) {
            super(scene, x, y, width, height);

            this._animationName = animationName;
            this._key = key;
            this._loop = loop;
            this._textureImage = new Phaser.GameObjects.Image(scene, 0, 0, key);

            this._updateListener = () => {

                if (this._dirty) {

                    this.redraw();
                }
            };

            this._editorSupport = new SpineGameObjectEditorSupport(this, scene);
        }

        getEditorSupport() {

            return this._editorSupport;
        }

        destroy() {

            this.scene?.events?.removeListener("update", this._updateListener);

            this._brush.destroy();
            this._textureImage.destroy();

            super.destroy();
        }

        setTexture(key: string, frame?: string | number) {

            this._dirty = this._dirty || key !== this._key

            this._key = key;

            this._brush.setTexture(this._key);
            this._textureImage.setTexture(this._key);
        }

        get textureKey() {

            return this._key;
        }


        setSize(width: number, height: number): this {

            super.setSize(width, height);

            this.redraw();

            return this;
        }

        redraw() {

            this.clear();

            const gr = new Phaser.GameObjects.Graphics(this.scene);

            this.draw(gr);

            gr.destroy();
        }
    }
}
