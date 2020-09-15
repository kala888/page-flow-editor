import editorStyle from '../util/defaultStyle';
import { shapeBase } from '@antv/g6/lib/shape/shapeBase';
import Shape from '@antv/g6/lib/shape/shape';

export default function(G6: any) {
  Shape.registerFactory('controlPoint', {
    defaultShapeType: 'marker',
    getShape: (type: any) => {
      const shapeObj = Object.assign({}, shapeBase, {
        type: 'marker',
        itemType: type,
        drawShape(cfg: any, group: any) {
          // @ts-ignore
          const style: any = this.getShapeStyle(cfg);
          const shape: any = group.addShape('marker', {
            attrs: {
              ...style,
              symbol: 'square',
            },
            name: 'controlPoint-shape',
            draggable: true,
          });
          return shape;
        },
        setState(name: any, value: any, item: any) {
          if (name === 'active') {
            if (value) {
              // @ts-ignore
              this.update(
                { style: { ...editorStyle.pointPointHoverStyle } },
                item,
              );
            } else {
              // @ts-ignore
              this.update({ style: { ...editorStyle.pointPointStyle } }, item);
            }
          }
        },
      });
      return shapeObj;
    },
  });
}
