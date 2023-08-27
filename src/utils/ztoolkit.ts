import { config } from "../../package.json";

export { createZToolkit };

function createZToolkit() {
  // const _ztoolkit = new ZoteroToolkit();
  /**
   * Alternatively, import toolkit modules you use to minify the plugin size.
   * You can add the modules under the `MyToolkit` class below and uncomment the following line.
   */
  const _ztoolkit = new MyToolkit();
  initZToolkit(_ztoolkit);
  return _ztoolkit;
}

function initZToolkit(_ztoolkit: ReturnType<typeof createZToolkit>) {
  const env = __env__;
  _ztoolkit.basicOptions.log.prefix = `[${config.addonName}]`;
  _ztoolkit.basicOptions.log.disableConsole = env === "production";
  _ztoolkit.UI.basicOptions.ui.enableElementJSONLog = __env__ === "development";
  _ztoolkit.UI.basicOptions.ui.enableElementDOMLog = __env__ === "development";
  _ztoolkit.basicOptions.debug.disableDebugBridgePassword =
    __env__ === "development";
  _ztoolkit.basicOptions.api.pluginID = config.addonID;
}

import { BasicTool, unregister } from "zotero-plugin-toolkit/dist/basic";
import { ToolkitGlobal } from "zotero-plugin-toolkit/dist/managers/toolkitGlobal";
import { UITool } from "zotero-plugin-toolkit/dist/tools/ui";
import { PreferencePaneManager } from "zotero-plugin-toolkit/dist/managers/preferencePane";
import { LibraryTabPanelManager } from "zotero-plugin-toolkit/dist/managers/libraryTabPanel";

export class MyToolkit extends BasicTool {
  Global: typeof ToolkitGlobal;
  UI: UITool;
  PreferencePane: PreferencePaneManager;
  LibraryTabPanel: LibraryTabPanelManager;

  constructor() {
    super();
    this.Global = ToolkitGlobal;
    this.UI = new UITool(this);
    this.PreferencePane = new PreferencePaneManager(this);
    this.LibraryTabPanel = new LibraryTabPanelManager(this);
  }

  unregisterAll() {
    unregister(this);
  }
}