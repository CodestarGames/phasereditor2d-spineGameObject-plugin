namespace phasereditor2d.spineGameObject {

    export const CAT_SPINE_GAME_OBJECT = "phasereditor2d.spineGameObject.category";
    export const CMD_CREATE_ROUNDED_USER_FILES = "phasereditor2d.spineGameObject.CreateSpineGameObjectUserFiles";

    export class SpineGameObjectPlugin extends colibri.Plugin {

        private static _instance = new SpineGameObjectPlugin();

        static getInstance() {

            return this._instance;
        }

        constructor() {
            super("phasereditor2d.spineGameObject");
        }

        registerExtensions(reg: colibri.ExtensionRegistry) {

            reg.addExtension(SpineGameObjectExtension.getInstance());

            reg.addExtension(new scene.ui.editor.properties.SceneEditorPropertySectionExtension(
                page => new SpineGameObjectSection(page),
            ));

            reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(() =>

                SpineGameObjectCodeResources.getInstance().preload()
            ));

            reg.addExtension(new colibri.ui.ide.commands.CommandExtension(manager => {

                manager.addCategory({
                    id: CAT_SPINE_GAME_OBJECT,
                    name: "Spine Game Object",
                });

                for (const spec of ["js", "js-module", "ts", "ts-module"]) {

                    manager.add({
                        command: {
                            id: CMD_CREATE_ROUNDED_USER_FILES + "." + spec,
                            category: CAT_SPINE_GAME_OBJECT,
                            name: `Create Spine Game Object User Files (${spec})`,
                            tooltip: "Create the user files with the PE2DSpineGameObject API."
                        },
                        handler: {
                            executeFunc: args => {

                                SpineGameObjectCodeResources.getInstance().createFiles(spec as any);
                            }
                        }
                    });
                }
            }));
        }
    }

    colibri.Platform.addPlugin(SpineGameObjectPlugin.getInstance());
}
