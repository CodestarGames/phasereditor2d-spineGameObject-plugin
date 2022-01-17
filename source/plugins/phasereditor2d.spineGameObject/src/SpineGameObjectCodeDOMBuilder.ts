namespace phasereditor2d.spineGameObject {

    import code = phasereditor2d.scene.core.code;
    import sceneobjects = phasereditor2d.scene.ui.sceneobjects;

    export class SpineGameObjectCodeDOMBuilder extends sceneobjects.BaseImageCodeDOMBuilder {

        constructor() {
            super("spineGameObject");
        }

        buildCreatePrefabInstanceCodeDOM(args: sceneobjects.IBuildPrefabConstructorCodeDOMArgs) {

            const call = args.methodCallDOM;

            call.arg(args.sceneExpr);

            this.buildCreatePrefabInstanceCodeDOM_XY_Arguments(args);

            this.buildCreatePrefabInstanceCodeDOM_Size_Arguments(args);
        }

        buildPrefabConstructorDeclarationCodeDOM(args: sceneobjects.IBuildPrefabConstructorDeclarationCodeDOM): void {

            const ctr = args.ctrDeclCodeDOM;

            ctr.arg("x", "number", true);
            ctr.arg("y", "number", true);
            ctr.arg("width", "number", true);
            ctr.arg("height", "number", true);
        }

        buildPrefabConstructorDeclarationSupperCallCodeDOM(
            args: sceneobjects.IBuildPrefabConstructorDeclarationSupperCallCodeDOMArgs): void {

            const obj = args.prefabObj as PE2DSpineGameObject;
            const support = obj.getEditorSupport();

            const call = args.superMethodCallCodeDOM;

            this.buildPrefabConstructorDeclarationSupperCallCodeDOM_XYParameters(args);

            if (support.isUnlockedProperty(sceneobjects.SizeComponent.width)) {

                call.arg("width ?? " + obj.width);
                call.arg("height ?? " + obj.height);

            } else {

                call.arg("width");
                call.arg("height");
            }
        }

        buildCreateObjectWithFactoryCodeDOM(args: sceneobjects.IBuildObjectFactoryCodeDOMArgs): code.MethodCallCodeDOM {

            const obj = args.obj as PE2DSpineGameObject;
            const call = new code.MethodCallCodeDOM("spineGameObject", args.gameObjectFactoryExpr);

            call.argFloat(obj.x);
            call.argFloat(obj.y);
            call.argFloat(obj.width);
            call.argFloat(obj.height);

            return call;
        }
    }
}
