var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        class SpineGameObject extends Phaser.GameObjects.RenderTexture {
            constructor(scene, x, y, width, height) {
                super(scene, x, y, width, height);
                this._fillColor = 0xffffff;
                this._isFilled = true;
                this._fillAlpha = 1;
                this._isStroked = false;
                this._strokeColor = 0xffffff;
                this._strokeAlpha = 1;
                this._lineWidth = 1;
                this._radius = 20;
                this._shadowColor = 0;
                this._shadowAlpha = 0;
                this._shadowOffsetX = 0;
                this._shadowOffsetY = 0;
                this._shadowRadius = -1;
                this._editorSupport = new spineGameObject.SpineGameObjectEditorSupport(this, scene);
            }
            getEditorSupport() {
                return this._editorSupport;
            }
            get shadowColor() {
                return this._shadowColor;
            }
            set shadowColor(shadowColor) {
                this._shadowColor = shadowColor;
                this.redraw();
            }
            get shadowAlpha() {
                return this._shadowAlpha;
            }
            set shadowAlpha(shadowAlpha) {
                this._shadowAlpha = shadowAlpha;
                this.redraw();
            }
            get shadowOffsetX() {
                return this._shadowOffsetX;
            }
            set shadowOffsetX(shadowOffsetX) {
                this._shadowOffsetX = shadowOffsetX;
                this.redraw();
            }
            get shadowOffsetY() {
                return this._shadowOffsetY;
            }
            set shadowOffsetY(shadowOffsetY) {
                this._shadowOffsetY = shadowOffsetY;
                this.redraw();
            }
            get shadowRadius() {
                return this._shadowRadius;
            }
            set shadowRadius(shadowRadius) {
                this._shadowRadius = shadowRadius;
                this.redraw();
            }
            get fillColor() {
                return this._fillColor;
            }
            set fillColor(fillColor) {
                this._fillColor = fillColor;
                this.redraw();
            }
            get isFilled() {
                return this._isFilled;
            }
            set isFilled(isFilled) {
                this._isFilled = isFilled;
                this.redraw();
            }
            get fillAlpha() {
                return this._fillAlpha;
            }
            set fillAlpha(fillAlpha) {
                this._fillAlpha = fillAlpha;
                this.redraw();
            }
            get isStroked() {
                return this._isStroked;
            }
            set isStroked(isStroked) {
                this._isStroked = isStroked;
                this.redraw();
            }
            get strokeColor() {
                return this._strokeColor;
            }
            set strokeColor(strokeColor) {
                this._strokeColor = strokeColor;
                this.redraw();
            }
            get strokeAlpha() {
                return this._strokeAlpha;
            }
            set strokeAlpha(strokeAlpha) {
                this._strokeAlpha = strokeAlpha;
                this.redraw();
            }
            get lineWidth() {
                return this._lineWidth;
            }
            set lineWidth(lineWidth) {
                this._lineWidth = lineWidth;
                this.redraw();
            }
            get radius() {
                return this._radius;
            }
            set radius(radius) {
                this._radius = radius;
                this.redraw();
            }
            setSize(width, height) {
                super.setSize(width, height);
                this.redraw();
                return this;
            }
            redraw() {
                this.clear();
                if (this._isFilled || this._isStroked) {
                    const gr = new Phaser.GameObjects.Graphics(this.scene);
                    let x = this._shadowOffsetX < 0 ? -this._shadowOffsetX : 0;
                    let y = this._shadowOffsetY < 0 ? -this._shadowOffsetY : 0;
                    let w = this._shadowOffsetX < 0 ? this.width + this._shadowOffsetX : this.width - this._shadowOffsetX;
                    let h = this._shadowOffsetY < 0 ? this.height + this._shadowOffsetY : this.height - this._shadowOffsetY;
                    if (this._shadowOffsetX !== 0 && this._shadowOffsetY !== 0 && this._shadowAlpha !== 0) {
                        gr.fillStyle(this._shadowColor, this._shadowAlpha);
                        gr.fillRoundedRect(x + this._shadowOffsetX, y + this._shadowOffsetY, w, h, this._shadowRadius === -1 ? this._radius : this._shadowRadius);
                    }
                    if (this._isFilled) {
                        gr.fillStyle(this._fillColor, this._fillAlpha);
                        if (this._isStroked) {
                            x += this.lineWidth / 2;
                            y += this.lineWidth / 2;
                            w -= this.lineWidth;
                            h -= this.lineWidth;
                        }
                        gr.fillRoundedRect(x, y, w, h, this._radius);
                    }
                    if (this._isStroked) {
                        gr.lineStyle(this._lineWidth, this._strokeColor, this._strokeAlpha);
                        gr.strokeRoundedRect(x, y, w, h, this._radius);
                    }
                    this.draw(gr);
                    gr.destroy();
                }
            }
        }
        spineGameObject.SpineGameObject = SpineGameObject;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        class SpineGameObjectBlockCellRenderer extends phasereditor2d.scene.ui.sceneobjects.ShapeBlockCellRenderer {
            static getInstance() {
                return this._instance ? this._instance : (this._instance = new SpineGameObjectBlockCellRenderer());
            }
            renderShapeCell(ctx, args) {
                const size = Math.floor(Math.max(8, Math.floor(Math.min(args.w, args.h) * 0.5)));
                const x = Math.floor(args.x + (args.w - size) / 2);
                const y = Math.floor(args.y + (args.h - size) / 2);
                const r = size <= 16 ? 2 : 8;
                ctx.beginPath();
                SpineGameObjectBlockCellRenderer.drawRoundedRect(ctx, x, y, size, size, r, r, r, r);
                ctx.stroke();
            }
            static drawRoundedRect(ctx, x, y, w, h, topLeft = 5, topRight = 5, bottomRight = 5, bottomLeft = 5) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x + topLeft, y);
                ctx.lineTo(x + w - topRight, y);
                ctx.quadraticCurveTo(x + w, y, x + w, y + topRight);
                ctx.lineTo(x + w, y + h - bottomRight);
                ctx.quadraticCurveTo(x + w, y + h, x + w - bottomRight, y + h);
                ctx.lineTo(x + bottomLeft, y + h);
                ctx.quadraticCurveTo(x, y + h, x, y + h - bottomLeft);
                ctx.lineTo(x, y + topLeft);
                ctx.quadraticCurveTo(x, y, x + topLeft, y);
                ctx.stroke();
                ctx.restore();
            }
        }
        spineGameObject.SpineGameObjectBlockCellRenderer = SpineGameObjectBlockCellRenderer;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        var code = phasereditor2d.scene.core.code;
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class SpineGameObjectCodeDOMBuilder extends sceneobjects.BaseImageCodeDOMBuilder {
            constructor() {
                super("spineGameObject");
            }
            buildCreatePrefabInstanceCodeDOM(args) {
                const call = args.methodCallDOM;
                call.arg(args.sceneExpr);
                this.buildCreatePrefabInstanceCodeDOM_XY_Arguments(args);
                this.buildCreatePrefabInstanceCodeDOM_Size_Arguments(args);
            }
            buildPrefabConstructorDeclarationCodeDOM(args) {
                const ctr = args.ctrDeclCodeDOM;
                ctr.arg("x", "number", true);
                ctr.arg("y", "number", true);
                ctr.arg("width", "number", true);
                ctr.arg("height", "number", true);
            }
            buildPrefabConstructorDeclarationSupperCallCodeDOM(args) {
                const obj = args.prefabObj;
                const support = obj.getEditorSupport();
                const call = args.superMethodCallCodeDOM;
                this.buildPrefabConstructorDeclarationSupperCallCodeDOM_XYParameters(args);
                if (support.isUnlockedProperty(sceneobjects.SizeComponent.width)) {
                    call.arg("width ?? " + obj.width);
                    call.arg("height ?? " + obj.height);
                }
                else {
                    call.arg("width");
                    call.arg("height");
                }
            }
            buildCreateObjectWithFactoryCodeDOM(args) {
                const obj = args.obj;
                const call = new code.MethodCallCodeDOM("spineGameObject", args.gameObjectFactoryExpr);
                call.argFloat(obj.x);
                call.argFloat(obj.y);
                call.argFloat(obj.width);
                call.argFloat(obj.height);
                return call;
            }
        }
        spineGameObject.SpineGameObjectCodeDOMBuilder = SpineGameObjectCodeDOMBuilder;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        var controls = colibri.ui.controls;
        class SpineGameObjectCodeResources extends phasereditor2d.scene.core.code.CodeResources {
            constructor() {
                super(spineGameObject.SpineGameObjectPlugin.getInstance());
                for (const spec of ["js", "js-module", "ts", "ts-module"]) {
                    const ext = this.getExt(spec);
                    this.addResource(spec + "/PE2DSpineGameObject", "data/" + spec + "/PE2DSpineGameObject." + ext);
                    this.addResource(spec + "/registerSpineGameObjectFactory", "data/" + spec + "/registerSpineGameObjectFactory." + ext);
                }
                this.addResource("spineGameObject.d.ts", "data/spineGameObject.d.ts");
            }
            static getInstance() {
                return this._instance ? this._instance : (this._instance = new SpineGameObjectCodeResources());
            }
            getExt(spec) {
                return spec.slice(0, 2);
            }
            async createFiles(spec) {
                try {
                    const filesView = colibri.Platform.getWorkbench().getActiveWindow()
                        .getView(phasereditor2d.files.ui.views.FilesView.ID);
                    const sel = filesView.getSelection();
                    let folder;
                    if (sel.length > 0) {
                        const file = sel[0];
                        if (file.isFolder()) {
                            folder = file;
                        }
                        else {
                            folder = file.getParent();
                        }
                    }
                    else {
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
                    newFiles.push(await this.createFile(spec + "/registerSpineGameObjectFactory", folder, "registerSpineGameObjectFactory." + ext));
                    monitor.step();
                    newFiles.push(await this.createFile("spineGameObject.d.ts", folder, "spineGameObject.d.ts"));
                    monitor.step();
                    dlg.close();
                    const viewer = filesView.getViewer();
                    viewer.setExpanded(folder, true);
                    await viewer.repaint();
                    viewer.setSelection(newFiles);
                }
                catch (e) {
                    alert("Error: " + e.message);
                }
            }
        }
        spineGameObject.SpineGameObjectCodeResources = SpineGameObjectCodeResources;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class SpineGameObjectComponent extends sceneobjects.Component {
            constructor(obj) {
                super(obj, [
                    SpineGameObjectComponent.radius,
                    SpineGameObjectComponent.fillColor,
                    SpineGameObjectComponent.isFilled,
                    SpineGameObjectComponent.fillAlpha,
                    SpineGameObjectComponent.isStroked,
                    SpineGameObjectComponent.strokeColor,
                    SpineGameObjectComponent.strokeAlpha,
                    SpineGameObjectComponent.lineWidth,
                    SpineGameObjectComponent.shadowOffsetX,
                    SpineGameObjectComponent.shadowOffsetY,
                    SpineGameObjectComponent.shadowRadius,
                    SpineGameObjectComponent.shadowColor,
                    SpineGameObjectComponent.shadowAlpha
                ]);
            }
            buildSetObjectPropertiesCodeDOM(args) {
                this.buildSetObjectPropertyCodeDOM_BooleanProperty(args, SpineGameObjectComponent.isFilled);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, sceneobjects.NumberColorPropertyCodeDomAdapter(SpineGameObjectComponent.fillColor));
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.fillAlpha);
                this.buildSetObjectPropertyCodeDOM_BooleanProperty(args, SpineGameObjectComponent.isStroked);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, sceneobjects.NumberColorPropertyCodeDomAdapter(SpineGameObjectComponent.strokeColor));
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.strokeAlpha);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.lineWidth);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.radius);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.shadowOffsetX);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.shadowOffsetY);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.shadowRadius);
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, sceneobjects.NumberColorPropertyCodeDomAdapter(SpineGameObjectComponent.shadowColor));
                this.buildSetObjectPropertyCodeDOM_FloatProperty(args, SpineGameObjectComponent.shadowAlpha);
            }
        }
        SpineGameObjectComponent.fillColor = sceneobjects.NumberColorProperty("fillColor", "#fff", "Fill Color", "The fill color.");
        SpineGameObjectComponent.isFilled = sceneobjects.SimpleProperty("isFilled", true, "Is Filled", "Is filled?");
        SpineGameObjectComponent.fillAlpha = sceneobjects.SimpleProperty("fillAlpha", 1, "Fill Alpha", "The fill alpha.");
        SpineGameObjectComponent.isStroked = sceneobjects.SimpleProperty("isStroked", false, "Is Stroked", "Is stroked?");
        SpineGameObjectComponent.strokeColor = sceneobjects.NumberColorProperty("strokeColor", "#fff", "Stroke Color", "The stroke color.");
        SpineGameObjectComponent.strokeAlpha = sceneobjects.SimpleProperty("strokeAlpha", 1, "Stroke Alpha", "The stroke alpha.");
        SpineGameObjectComponent.lineWidth = sceneobjects.SimpleProperty("lineWidth", 1, "Line Width", "The line width.");
        SpineGameObjectComponent.radius = sceneobjects.SimpleProperty("radius", 0, "Radius", "The radius.");
        SpineGameObjectComponent.shadowColor = sceneobjects.NumberColorProperty("shadowColor", "#000", "Shadow Color", "The shadow color.");
        SpineGameObjectComponent.shadowAlpha = sceneobjects.SimpleProperty("shadowAlpha", 1, "Shadow Alpha", "The shadow alpha.");
        SpineGameObjectComponent.shadowOffsetX = sceneobjects.SimpleProperty("shadowOffsetX", 0, "Shadow Offset X", "The shadow offset in the X axis.");
        SpineGameObjectComponent.shadowOffsetY = sceneobjects.SimpleProperty("shadowOffsetY", 0, "Shadow Offset Y", "The shadow offset in the Y axis.");
        SpineGameObjectComponent.shadowRadius = sceneobjects.SimpleProperty("shadowRadius", -1, "Shadow Radius", "Alternative shadow radius. Set -1 for using the original rectangle radius.");
        spineGameObject.SpineGameObjectComponent = SpineGameObjectComponent;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        var sceneobjects = phasereditor2d.scene.ui.sceneobjects;
        class SpineGameObjectEditorSupport extends sceneobjects.GameObjectEditorSupport {
            constructor(obj, scene) {
                super(spineGameObject.SpineGameObjectExtension.getInstance(), obj, scene);
                this.addComponent(new sceneobjects.TransformComponent(obj), new sceneobjects.OriginComponent(obj), new sceneobjects.VisibleComponent(obj), new sceneobjects.AlphaSingleComponent(obj), new sceneobjects.SizeComponent(obj), new spineGameObject.SpineGameObjectComponent(obj));
            }
            setInteractive() {
                this.getObject().setInteractive();
            }
            getCellRenderer() {
                return new phasereditor2d.scene.ui.sceneobjects.ObjectCellRenderer();
            }
            computeContentHash() {
                return this.computeContentHashWithComponent(this.getObject(), spineGameObject.SpineGameObjectComponent);
            }
        }
        spineGameObject.SpineGameObjectEditorSupport = SpineGameObjectEditorSupport;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        class SpineGameObjectExtension extends phasereditor2d.scene.ui.sceneobjects.SceneGameObjectExtension {
            constructor() {
                super({
                    phaserTypeName: "SpineGameObject",
                    typeName: "SpineGameObject",
                    category: phasereditor2d.scene.SCENE_OBJECT_SHAPE_CATEGORY,
                    icon: phasereditor2d.scene.ScenePlugin.getInstance().getIconDescriptor(phasereditor2d.scene.ICON_BUILD)
                });
            }
            static getInstance() {
                return this._instance ? this._instance : (this._instance = new SpineGameObjectExtension());
            }
            getBlockCellRenderer() {
                return spineGameObject.SpineGameObjectBlockCellRenderer.getInstance();
            }
            acceptsDropData(data) {
                return false;
            }
            createSceneObjectWithAsset(args) {
                // not supported
                return null;
            }
            createGameObjectWithData(args) {
                const obj = new spineGameObject.SpineGameObject(args.scene, 0, 0, 50, 50);
                obj.getEditorSupport().readJSON(args.data);
                return obj;
            }
            async getAssetsFromObjectData(args) {
                return [];
            }
            getCodeDOMBuilder() {
                return new spineGameObject.SpineGameObjectCodeDOMBuilder();
            }
            createDefaultSceneObject(args) {
                const obj = new spineGameObject.SpineGameObject(args.scene, args.x, args.y, 100, 100);
                obj.redraw();
                return [obj];
            }
        }
        spineGameObject.SpineGameObjectExtension = SpineGameObjectExtension;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        spineGameObject.CAT_SPINE_GAME_OBJECT = "phasereditor2d.spineGameObject.category";
        spineGameObject.CMD_CREATE_ROUNDED_USER_FILES = "phasereditor2d.spineGameObject.CreateSpineGameObjectUserFiles";
        class SpineGameObjectPlugin extends colibri.Plugin {
            constructor() {
                super("phasereditor2d.spineGameObject");
            }
            static getInstance() {
                return this._instance;
            }
            registerExtensions(reg) {
                reg.addExtension(spineGameObject.SpineGameObjectExtension.getInstance());
                reg.addExtension(new phasereditor2d.scene.ui.editor.properties.SceneEditorPropertySectionExtension(page => new spineGameObject.SpineGameObjectSection(page)));
                reg.addExtension(new colibri.ui.ide.PluginResourceLoaderExtension(() => spineGameObject.SpineGameObjectCodeResources.getInstance().preload()));
                reg.addExtension(new colibri.ui.ide.commands.CommandExtension(manager => {
                    manager.addCategory({
                        id: spineGameObject.CAT_SPINE_GAME_OBJECT,
                        name: "Spine Game Object",
                    });
                    for (const spec of ["js", "js-module", "ts", "ts-module"]) {
                        manager.add({
                            command: {
                                id: spineGameObject.CMD_CREATE_ROUNDED_USER_FILES + "." + spec,
                                category: spineGameObject.CAT_SPINE_GAME_OBJECT,
                                name: `Create Spine Game Object User Files (${spec})`,
                                tooltip: "Create the user files with the PE2DSpineGameObject API."
                            },
                            handler: {
                                executeFunc: args => {
                                    spineGameObject.SpineGameObjectCodeResources.getInstance().createFiles(spec);
                                }
                            }
                        });
                    }
                }));
            }
        }
        SpineGameObjectPlugin._instance = new SpineGameObjectPlugin();
        spineGameObject.SpineGameObjectPlugin = SpineGameObjectPlugin;
        colibri.Platform.addPlugin(SpineGameObjectPlugin.getInstance());
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
var phasereditor2d;
(function (phasereditor2d) {
    var spineGameObject;
    (function (spineGameObject) {
        class SpineGameObjectSection extends phasereditor2d.scene.ui.sceneobjects.SceneGameObjectSection {
            constructor(page) {
                super(page, SpineGameObjectSection.SECTION_ID, "Spine Game Object", false, false);
            }
            createForm(parent) {
                const comp = this.createGridElement(parent);
                comp.style.gridTemplateColumns = "auto auto 1fr auto";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.radius)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyBoolean(comp, spineGameObject.SpineGameObjectComponent.loop)
                    .checkElement.style.gridColumn = "3 / span 2";
                this.createPropertyColorRow(comp, spineGameObject.SpineGameObjectComponent.animationName, false)
                    .element.style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.fillAlpha)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyBoolean(comp, spineGameObject.SpineGameObjectComponent.isStroked)
                    .checkElement.style.gridColumn = "3 / span 2";
                this.createPropertyColorRow(comp, spineGameObject.SpineGameObjectComponent.strokeColor, false)
                    .element.style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.strokeAlpha)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.lineWidth)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.shadowOffsetX)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.shadowOffsetY)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.shadowRadius)
                    .style.gridColumn = "3 / span 2";
                this.createPropertyColorRow(comp, spineGameObject.SpineGameObjectComponent.shadowColor, false)
                    .element.style.gridColumn = "3 / span 2";
                this.createPropertyFloatRow(comp, spineGameObject.SpineGameObjectComponent.shadowAlpha)
                    .style.gridColumn = "3 / span 2";
            }
            canEdit(obj, n) {
                return obj instanceof spineGameObject.SpineGameObject;
            }
            canEditNumber(n) {
                return n > 0;
            }
        }
        SpineGameObjectSection.SECTION_ID = "phasereditor2d.spineGameObject.SpineGameObjectSection";
        spineGameObject.SpineGameObjectSection = SpineGameObjectSection;
    })(spineGameObject = phasereditor2d.spineGameObject || (phasereditor2d.spineGameObject = {}));
})(phasereditor2d || (phasereditor2d = {}));
