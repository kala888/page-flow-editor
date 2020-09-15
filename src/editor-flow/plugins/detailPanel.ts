import { deepMix, each, wrapBehavior } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';

class DetailPanel {
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
    this.updatePanel();
  }

  updatePanel() {
    const graph = this.get('graph');
    const parentNode = this.get('container');
    const selectedItems = graph.get('selectedItems');
    let selectedItem = null;
    let clazz: any = null;
    if (selectedItems && selectedItems.length > 0) {
      selectedItem = graph.findById(selectedItems[0]);
      clazz = selectedItem.getModel().clazz;
    }
    each(parentNode.children, (child, i) => {
      if (child.hasAttribute('data-clazz')) {
        const clazzName = child.getAttribute('data-clazz');
        if (clazz && clazz === clazzName) {
          modifyCSS(child, {
            display: 'inline',
          });
        } else {
          modifyCSS(child, {
            display: 'none',
          });
        }
      }
    });
  }

  getEvents() {
    return { afteritemselected: 'updatePanel' };
  }

  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default DetailPanel;
