#! /bin/sh

OUTPUT_DIR=build



# cleanup
echo "(1/5) Preparing..."
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR

# add meta files
cp manifest.json $OUTPUT_DIR/manifest.json
cp icon.png $OUTPUT_DIR/icon.png

# build options page
echo "(2/5) Building options page..."
cp options/* $OUTPUT_DIR

# build popup
echo "(3/5) Building popup page..."
cp popup/popup.html $OUTPUT_DIR/popup.html

# build worker
echo "(4/5) Building worker scripts..."
tsc worker/background.ts --outDir $OUTPUT_DIR

# build content
echo "(5/5) Building content scripts..."
cp content_scripts/content-root.css $OUTPUT_DIR/content-root.css
tsc content_scripts/content-root.ts --outDir $OUTPUT_DIR
tsc --removeComments content_scripts/app/config-overrides.ts
cd content_scripts/app
yarn react-app-rewired build
cp build/main.js ../../$OUTPUT_DIR/content-react.js

echo "Done."