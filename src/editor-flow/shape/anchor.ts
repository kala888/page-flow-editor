import editorStyle from '../util/defaultStyle';
import { shapeBase } from '@antv/g6/lib/shape/shapeBase';
import Shape from '@antv/g6/lib/shape/shape';

export default function(G6: any) {
  Shape.registerFactory('anchor', {
    defaultShapeType: 'marker',
    getShape: type => {
      return Object.assign({}, shapeBase, {
        type: 'marker',
        itemType: type,
        drawShape(cfg: any, group: any) {
          // @ts-ignore
          const style: any = this.getShapeStyle(cfg);
          const shape: any = group.addShape('marker', {
            attrs: style,
            name: 'anchor-shape',
            draggable: true,
          });
          return shape;
        },
        setState(name: any, value: any, item: any) {
          if (name === 'active-anchor') {
            if (value) {
              // @ts-ignore
              this.update(
                { style: { ...editorStyle.anchorPointHoverStyle } },
                item,
              );
            } else {
              // @ts-ignore
              this.update({ style: { ...editorStyle.anchorPointStyle } }, item);
            }
          }
        },
      });
    },
  });
}
