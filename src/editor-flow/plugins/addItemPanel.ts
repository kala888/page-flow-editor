import { deepMix, each } from '@antv/util';
import { createDom } from '@antv/dom-util';

class AddItemPanel {
  private readonly _cfgs: any;

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
    const parentNode = this.get('container');
    const ghost = createDom(
      '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"' +
        ' style="opacity:0"/>',
    );
    const children = parentNode.querySelectorAll('div img[data-item]');
    each(children, (child, i) => {
      const addModel = new Function(
        'return ' + child.getAttribute('data-item'),
      )();
      child.addEventListener('dragstart', (e: any) => {
        e.dataTransfer.setDragImage(ghost, 0, 0);
        graph.set('addNodeDragging', true);
        graph.set('addModel', addModel);
      });
      child.addEventListener('dragend', (e: any) => {
        graph.emit('canvas:mouseup', e);
        graph.set('addNodeDragging', false);
        graph.set('addModel', null);
      });
    });
  }

  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default AddItemPanel;
