export function getShapeName(clazz) {
  switch (clazz) {
    case 'start':
      return 'start-node';
    case 'page':
      return 'page-node';
    case 'form':
      return 'form-node';
    case 'condition':
      return 'condition-node';

    default:
      return 'task-node';
  }
}
