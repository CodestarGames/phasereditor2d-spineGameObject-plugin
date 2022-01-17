#!/bin/bash

cd source/plugins/phasereditor2d.spineGameObject/data

rm -Rf js js-module ts-module
mkdir js js-module ts-module

# ts

cd ts
npx tsc -t esnext --outDir ../js PE2DSpineGameObject.ts &> /dev/null
npx tsc -t esnext --outDir ../js registerSpineGameObjectFactory.ts &> /dev/null

# ts-module

cp * ../ts-module
cd ../ts-module
sed -i 's/class/import Phaser from "phaser";\n\nexport default class/' PE2DSpineGameObject.ts
sed -i 's/function registerSpineGameObjectFactory/import Phaser from "phaser";\nimport PE2DSpineGameObject from ".\/PE2DSpineGameObject";\n\nexport default function registerSpineGameObjectFactory/' registerSpineGameObjectFactory.ts

npx tsc -t esnext --outDir ../js-module PE2DSpineGameObject.ts &> /dev/null
npx tsc -t esnext --outDir ../js-module registerSpineGameObjectFactory.ts &> /dev/null

