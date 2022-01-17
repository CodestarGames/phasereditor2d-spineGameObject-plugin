namespace phasereditor2d.spineGameObject {

    import sceneobjects = scene.ui.sceneobjects;

    export class SpineGameObjectComponent extends sceneobjects.Component<PE2DSpineGameObject> {


        static animationName = sceneobjects.SimpleProperty("animationName", "", "Animation name", "The animation name.");
        static loop = sceneobjects.SimpleProperty("loop", false, "Is Looped", "Does Loop?");


        constructor(obj: PE2DSpineGameObject) {
            super(obj, [
                SpineGameObjectComponent.animationName,
                SpineGameObjectComponent.loop
            ]);
        }

        buildSetObjectPropertiesCodeDOM(args: sceneobjects.ISetObjectPropertiesCodeDOMArgs): void {

            this.buildSetObjectPropertyCodeDOM_BooleanProperty(args, SpineGameObjectComponent.loop);
            this.buildSetObjectPropertyCodeDOM_StringProperty(args, SpineGameObjectComponent.animationName);

        }
    }
}
