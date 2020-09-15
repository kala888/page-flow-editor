import { deepMix } from '@antv/util';

class CanvasPanel {
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
    parentNode.addEventListener('dragover', (e: any) => {
      graph.emit('canvas:mousemove', e);
    });
    parentNode.addEventListener('dragleave', (e: any) => {
      graph.emit('canvas:mouseleave', e);
    });
  }

  destroy() {
    this.get('canvas').destroy();
    const container = this.get('container');
    container.parentNode.removeChild(container);
  }
}

export default CanvasPanel;
