import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import manifest from '../manifest.json';
import { InformationCommands } from './commands';


const Version: Plugin = {
   ...manifest,

   onStart() {
      this.commands = InformationCommands
   },

   onStop() {
      this.commands = []
   },

};

registerPlugin(Version);
