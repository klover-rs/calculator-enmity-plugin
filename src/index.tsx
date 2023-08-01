import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import manifest from '../manifest.json';

import Settings from './components/Settings';
import { InformationCommands } from './commands';


const Version: Plugin = {
   ...manifest,

   onStart() {
      this.commands = InformationCommands
   },

   onStop() {
      this.commands = []
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(Version);
