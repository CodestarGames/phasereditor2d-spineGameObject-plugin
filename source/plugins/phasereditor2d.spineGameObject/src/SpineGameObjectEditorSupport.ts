namespace phasereditor2d.spineGameObject {

    import sceneobjects = phasereditor2d.scene.ui.sceneobjects;

    export class SpineGameObjectEditorSupport extends sceneobjects.GameObjectEditorSupport<PE2DSpineGameObject> {

        constructor(obj: PE2DSpineGameObject, scene: scene.ui.Scene) {
            super(SpineGameObjectExtension.getInstance(), obj, scene);

            this.addComponent(
                new sceneobjects.TransformComponent(obj),
                new sceneobjects.OriginComponent(obj),
                new sceneobjects.VisibleComponent(obj),
                new sceneobjects.AlphaSingleComponent(obj),
                new sceneobjects.SizeComponent(obj),
                new SpineGameObjectComponent(obj),
            );
        }

        setInteractive(): void {

            this.getObject().setInteractive();
        }

        getCellRenderer(): colibri.ui.controls.viewers.ICellRenderer {

            return new scene.ui.sceneobjects.ObjectCellRenderer();
        }

        computeContentHash() {

            return this.computeContentHashWithComponent(this.getObject(), SpineGameObjectComponent);
        }
    }
}
