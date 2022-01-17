namespace phasereditor2d.spineGameObject {

    import controls = colibri.ui.controls;

    export class SpineGameObjectCodeResources extends scene.core.code.CodeResources {

        private static _instance: SpineGameObjectCodeResources;

        static getInstance() {

            return this._instance ? this._instance : (this._instance = new SpineGameObjectCodeResources());
        }

        private constructor() {
            super(SpineGameObjectPlugin.getInstance());

            for (const spec of ["js", "js-module", "ts", "ts-module"]) {

                const ext = this.getExt(spec);

                this.addResource(spec + "/PE2DSpineGameObject", "data/" + spec + "/PE2DSpineGameObject." + ext);
                this.addResource(spec + "/registerSpineGameObjectFactory", "data/" + spec + "/registerSpineGameObjectFactory." + ext);
            }

            this.addResource("spineGameObject.d.ts", "data/spineGameObject.d.ts");
        }

        private getExt(spec: string) {

            return spec.slice(0, 2);
        }

        async createFiles(spec: "js" | "js-module" | "ts" | "ts-module") {

            try {

                const filesView = colibri.Platform.getWorkbench().getActiveWindow()
                    .getView(files.ui.views.FilesView.ID) as files.ui.views.FilesView;

                const sel = filesView.getSelection();

                let folder: colibri.core.io.FilePath;

                if (sel.length > 0) {

                    const file = sel[0] as colibri.core.io.FilePath;

                    if (file.isFolder()) {

                        folder = file;

                    } else {

                        folder = file.getParent();
                    }

                } else {

                    alert("Please, select a folder in the Files view.");
                    return;
                }

                const dlg = new controls.dialogs.ProgressDialog();
                dlg.create();
                dlg.setTitle("Create PE2DSpineGameObject API Files");

                const monitor = new controls.dialogs.ProgressDialogMonitor(dlg);
                monitor.addTotal(3);

                const newFiles = [];

                const ext = this.getExt(spec);

                newFiles.push(await this.createFile(spec + "/PE2DSpineGameObject", folder, "PE2DSpineGameObject." + ext));
                monitor.step();

                newFiles.push(await this.createFile(spec + "/registerSpineGameObjectFactory", folder,
                    "registerSpineGameObjectFactory." + ext));
                monitor.step();

                newFiles.push(await this.createFile("spineGameObject.d.ts", folder, "spineGameObject.d.ts"));
                monitor.step();

                dlg.close();

                const viewer = filesView.getViewer();

                viewer.setExpanded(folder, true);

                await viewer.repaint();

                viewer.setSelection(newFiles);

            } catch (e) {

                alert("Error: " + e.message);
            }
        }
    }
}
