import _ from 'lodash';
import editorStyle from '../util/defaultStyle';
import Anchor from '../item/anchor';
import { ShapeOptions } from '@antv/g6/lib/interface/shape';

const dashArray = [
  [0, 1],
  [0, 2],
  [1, 2],
  [0, 1, 1, 2],
  [0, 2, 1, 2],
  [1, 2, 1, 2],
  [2, 2, 1, 2],
  [3, 2, 1, 2],
  [4, 2, 1, 2],
];
const interval = 9;
const lineDash = [4, 2, 1, 2];
const nodeDefinition: ShapeOptions = {
  options: {
    icon: null,
    iconStyle: {
      width: 14,
      height: 14,
      left: 0,
      top: 0,
    },
    style: {
      fill: '#f9f9f9',
      stroke: '#bbb',
      cursor: 'default',
    },
    stateStyles: {
      selected: {
        fill: '#eee',
      },
      hover: {
        cursor: editorStyle.cursor.hoverNode,
      },
    },
  },
  drawAnchor(group) {
    const bbox = group.get('children')[0].getBBox();
    // @ts-ignore
    this.getAnchorPoints().forEach((p, i) => {
      const anchorContainer = group.addGroup();
      new Anchor({
        group: anchorContainer,
        index: i,
        model: {
          style: {
            x: bbox.minX + bbox.width * p[0],
            y: bbox.minY + bbox.height * p[1],
          },
        },
      });
      group.anchorShapes.push(anchorContainer);
    });
  },
  initAnchor(group) {
    group.anchorShapes = [];
    group.showAnchor = () => {
      this.drawAnchor(group);
    };
    group.getAllAnchors = () => {
      return group.anchorShapes.map(c => {
        c.filter(a => a.isAnchor);
      });
    };
    group.getAnchor = i => {
      return group.anchorShapes.filter(a => a.get('index') === i);
    };
    group.clearAnchor = () => {
      group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
      group.anchorShapes = [];
    };
    group.clearHotpotActived = () => {
      group.anchorShapes &&
        group.anchorShapes.forEach(a => {
          if (a.isAnchor) a.setHotspotActived(false);
        });
    };
  },
  drawShape(cfg, group) {
    const shapeType = this.shapeType;
    let style = this.getShapeStyle(cfg);
    // @ts-ignore
    const shape = group.addShape(shapeType, {
      attrs: {
        ...style,
      },
    });
    this.drawIcon(cfg, group);
    this.initAnchor(group);
    return shape;
  },
  drawIcon(cfg, group) {
    let style = this.getShapeStyle(cfg);
    if (this.options?.icon) {
      const left = _.get(this.options, 'iconStyle.left');
      const top = _.get(this.options, 'iconStyle.top');
      const width = _.get(this.options, 'iconStyle.width');
      const height = _.get(this.options, 'iconStyle.height');

      let attrs = {
        x: style.x + left,
        y: style.y + top,
        width: width,
        height: height,
      };
      if (this.shapeType === 'circle') {
        attrs = {
          x: left + style.x - style.r,
          y: top + style.y - style.r,
          width,
          height: height,
        };
      } else if (this.shapeType === 'path') {
        attrs = {
          x: left,
          y: top,
          width: width,
          height: height,
        };
      }
      group.icon = group.addShape('image', {
        attrs: {
          img: this.options.icon,
          ...attrs,
        },
        draggable: true,
      });
      if (cfg.hideIcon) {
        group.icon.hide();
      }
    }
  },
  setState(name, value, item) {
    const group = item?.getContainer();
    if (name === 'show-anchor') {
      if (value) {
        (group as any).showAnchor();
      } else {
        (group as any).clearAnchor();
      }
    } else if (name === 'selected') {
      const rect = group?.getChildByIndex(0);
      if (value) {
        const theFill = _.get(this.options, 'stateStyles.selected.fill');
        rect?.attr('fill', theFill);
      } else {
        const theFill = _.get(this.options, 'style.fill');
        rect?.attr('fill', theFill);
      }
    } else if (name === 'hover') {
      const rect = group?.getChildByIndex(0);
      const text = group?.getChildByIndex(1);
      if (value) {
        const theValue = _.get(this.options, 'stateStyles.hover.cursor');
        rect?.attr('cursor', theValue);
        if (text) {
          text.attr('cursor', theValue);
        }
      } else {
        const theValue = _.get(this.options, 'style.cursor');
        rect?.attr('cursor', theValue);
        if (text) text.attr('cursor', theValue);
      }
    }
    this.setCustomState(name, value, item);
  },
  setCustomState(name, value, item) {},
  getAnchorPoints() {
    return [
      [0.5, 0], // top
      [1, 0.5], // right
      [0.5, 1], // bottom
      [0, 0.5], // left
    ];
  },
  runAnimate(cfg, group) {
    if (cfg.active) {
      let totalArray = [];
      let index = 0;
      const shape = group.getFirst();
      shape.animate(
        ratio => {
          for (let i = 0; i < 9; i += interval) {
            // @ts-ignore
            totalArray = totalArray.concat(lineDash);
          }
          const cfg = {
            lineDash: dashArray[index].concat(totalArray),
          };
          index = (index + 1) % interval;
          return cfg;
        },
        {
          repeat: true,
          duration: 5000,
        },
      );
    }
  },
  afterDraw(cfg, group) {
    this.runAnimate(cfg, group);
  },
  afterUpdate(cfg, group) {
    const icon = group?.get('group').icon;
    if (cfg?.hideIcon && icon && icon.get('visible')) {
      icon.hide();
    } else if (!cfg?.hideIcon && icon && !icon.get('visible')) {
      icon.show();
    }
  },
};
export default function(G6) {
  G6.registerNode('base-node', nodeDefinition, 'single-node');
}
