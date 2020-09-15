import { deepMix, each, wrapBehavior } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';

class Toolbar {
  private readonly _cfgs: any;
  // @ts-ignore
  private _events: any;

  constructor(cfgs: any) {
    this._cfgs = deepMix(this.getDefaultCfg(), cfgs);
  }
  getDefaultCfg() {
    return { container: null };
  }

  get(key: any) {
    return this._cfgs[key];
  }
  set(key: any, val: any) {
    this._cfgs[key] = val;
  }

  initPlugin(graph: any) {
    const self = this;
    this.set('graph', graph);
    const events = self.getEvents();
    const bindEvents = {};
    each(events, (v, k) => {
      const event = wrapBehavior(self, v);
      bindEvents[k] = event;
      graph.on(k, event);
    });
    this._events = bindEvents;

    this.initEvents();
    this.updateToolbar();
  }

  getEvents() {
    return {
      afteritemselected: 'updateToolbar',
      aftercommandexecute: 'updateToolbar',
    };
  }

  initEvents() {
    const graph = this.get('graph');
    const parentNode = this.get('container');
    const children = parentNode.querySelectorAll('div > span[data-command]');
    each(children, (child, i) => {
      const cmdName = child.getAttribute('data-command');
      child.addEventListener('click', (e: any) => {
        graph.commandEnable(cmdName) && graph.executeCommand(cmdName);
      });
    });
  }

  updateToolbar() {
    const graph = this.get('graph');
    const parentNode = this.get('container');
    const children = parentNode.querySelectorAll('div > span[data-command]');
    each(children, (child, i) => {
      const cmdName = child.getAttribute('data-command');
      if (graph.commandEnable(cmdName)) {
        modifyCSS(child, {
          cursor: 'pointer',
        });
        modifyCSS(child.children[0], {
          color: '#666',
        });
        child.children[0].setAttribute('color', '#666');
      } else {
        modifyCSS(child, {
          cursor: 'default',
        });
        modifyCSS(child.children[0], {
          color: '#bfbfbf',
        });
        child.children[0].setAttribute('color', '#bfbfbf');
      }
    });
  }

  destroyPlugin() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default Toolbar;