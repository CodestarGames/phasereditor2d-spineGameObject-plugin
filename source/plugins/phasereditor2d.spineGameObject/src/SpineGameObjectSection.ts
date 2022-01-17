namespace phasereditor2d.spineGameObject {

    import controls = colibri.ui.controls;

    export class SpineGameObjectSection extends scene.ui.sceneobjects.SceneGameObjectSection<PE2DSpineGameObject> {

        static SECTION_ID = "phasereditor2d.spineGameObject.SpineGameObjectSection";

        constructor(page: controls.properties.PropertyPage) {
            super(page, SpineGameObjectSection.SECTION_ID, "Spine Game Object", false, false);
        }

        createForm(parent: HTMLDivElement) {

            const comp = this.createGridElement(parent);
            comp.style.gridTemplateColumns = "auto auto 1fr auto";

            this.createPropertyStringRow(comp, SpineGameObjectComponent.animationName)
            this.createPropertyBoolean(comp, SpineGameObjectComponent.loop);

        }

        canEdit(obj: any, n: number): boolean {

            return obj instanceof PE2DSpineGameObject;
        }

        canEditNumber(n: number): boolean {

            return n > 0;
        }
    }
}
