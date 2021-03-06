## SimpleRecorder On Electron:

Electron app to take screenshots and video recording

## App allows you:
  - Make screenshot from selected area.
  - Take Video from selected area.
  - Turn on/off webcam.
  - Turn on/off audio.
  - Download video and screenshots with a timestamp

## Video: *Click to play*

[![Preview](https://raw.githubusercontent.com/DmytroVasin/SimpleRecorder/master/_readme/_preview.png)](https://player.vimeo.com/video/215383700?autoplay=1)

Click to download .dmg package of SimpleRecorder:

- [From Github](https://github.com/DmytroVasin/SimpleRecorder/releases/latest)

> Worked on: "OS X El Capitan ( Version 10.11.6 )"

#### Troubleshooting:
*When running an application on OS X, like Mac Imager CLI, you receive the error "Your security preferences allow installation of only apps from the Mac App Store and identified developers."*

- Open OS X System Preferences > Security & Privacy
- On the "General" tab click the lock in the lower left corner to unlock the general preference pane
- Under "Allow applications downloaded from:", select the "Anywhere" radio button

## Setup:

```
brew install yarn // yarn == npm
yarn install
```

#### Start app in Dev:
```
yarn run b // run webpack dev server
yarn run e // run electron
```

#### Build OS X package:
```
yarn publish:dist
./dist // folder now has dmg package.
```
