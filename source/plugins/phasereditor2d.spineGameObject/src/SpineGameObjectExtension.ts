namespace phasereditor2d.spineGameObject {

    export class SpineGameObjectExtension extends scene.ui.sceneobjects.BaseImageExtension {


        getCodeDOMBuilder(): scene.ui.sceneobjects.GameObjectCodeDOMBuilder {

            return new SpineGameObjectCodeDOMBuilder();
        }

        private static _instance: SpineGameObjectExtension;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new SpineGameObjectExtension());
        }

        constructor() {
            super({
                phaserTypeName: "PE2DSpineGameObject",
                typeName: "PE2DSpineGameObject",
                category: scene.SCENE_OBJECT_IMAGE_CATEGORY,
                icon: scene.ScenePlugin.getInstance().getIconDescriptor(scene.ICON_BUILD)
            });
        }

        protected newObject(scene: scene.ui.Scene, x: number, y: number, key?: string, animationName?: string, loop?: boolean): PE2DSpineGameObject {

            const w = 200;
            const h = 100;

            if (key) {

                return new PE2DSpineGameObject(scene, x, y, w, h, key, animationName, loop);
            }

            return new PE2DSpineGameObject(scene, x, y, w, h, key, animationName, loop);
        }

    }
}
