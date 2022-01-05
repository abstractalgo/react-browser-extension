#! /bin/sh

OUTPUT_DIR=build



# update overrides
# cd option
# yarn rewire-config
# cd ../popup
# yarn rewire-config
# cd content_scripts/app
# yarn rewire-config
# cd ../..

# cleanup
echo "(1/5) Preparing..."
rm -rf $OUTPUT_DIR
mkdir $OUTPUT_DIR

# add meta files
cp manifest.json $OUTPUT_DIR/manifest.json
cp icon.png $OUTPUT_DIR/icon.png

# build options page
echo "(2/5) Building options page..."
cd options
yarn build
cp build/index.html ../$OUTPUT_DIR/options.html
cp build/options-main.js ../$OUTPUT_DIR/options-main.js
cd ..

# build popup
echo "(3/5) Building popup page..."
cd popup
yarn build
cp build/index.html ../$OUTPUT_DIR/popup.html
cp build/popup-main.js ../$OUTPUT_DIR/popup-main.js
cd ..

# build worker
echo "(4/5) Building worker scripts..."
tsc worker/background.ts --outDir $OUTPUT_DIR

# build content
echo "(5/5) Building content scripts..."
cd content_scripts
cp content-root.css ../$OUTPUT_DIR/content-root.css
tsc content-root.ts --outDir ../$OUTPUT_DIR
cd app
yarn build
cp build/content-main.js ../../$OUTPUT_DIR/content-react.js
cd ../..

echo "Done."