// import { Card, Col, message, Popover, Row } from 'antd'
// import GGEditor, { EditableLabel, Flow, G6, ItemPopover } from 'gg-editor'
// import _ from 'lodash'
// import moment from 'moment'
// import React, { useEffect, useRef, useState } from 'react'
// import FlowContextMenu from './components/editor-context-menu/flow-context-menu'
// import FlowDetailPanel from './components/editor-detail-panel/flow-detail-panel'
// import FlowItemPanel from './components/editor-item-panel/flow-Item-panel'
// import FlowToolbar from './components/editor-toolbar/flow-toolbar'
// import styles from './styles.less'
// import GraphOptionBar from '@/pages/editor-flow/components/editor-toolbar/graph-option-bar'
// import { loadLocalGraph, saveLocalGraph } from '@/service/util'
// import { useInterval } from '@/service/use-service'
//
// GGEditor.setTrackable(false)
//
// const EditorFlow = () => {
//   const flow = useRef<React.Component>()
//   const miniMap = useRef<React.Component>()
//   const [data, setData] = useState({nodes:[], edges:[]})
//   const [lastSaveTime, setLastSaveTime] = useState()
//
//   useInterval(() => {
//     const graphData = handleGetGraphData()
//     saveLocalGraph(graphData)
//     // @ts-ignore
//     setLastSaveTime(Date.now())
//   }, 5000)
//
//   const handleRefreshData = _.memoize((theData: object) => {
//     setData(theData)
//     message.info('画布刷新')
//   })
//
//   useEffect(() => {
//     const graphData = loadLocalGraph()
//     setData(graphData)
//   }, [flow.current])
//
//   const handleGetGraphData = () => {
//     if (flow.current) {
//       // @ts-ignore
//       return flow.current.graph.save()
//     }
//     return {}
//   }
//
//   const minimap = new G6.Minimap({
//     size: [100, 100],
//     className: 'minimap',
//     type: 'delegate',
//   });
//
//
//   return (
//     <GGEditor className={styles.editor}>
//       <Row className={styles.editorHd}>
//         <Col span={15}>
//           <FlowToolbar />
//         </Col>
//         <Col span={4}>
//           <div className={styles.tips}>
//             自动保存时间：
//             {lastSaveTime && (
//               <span>{moment(lastSaveTime).format('YYYY-MM-DD HH:mm:ss')}</span>
//             )}
//           </div>
//         </Col>
//         <Col span={5}>
//           <GraphOptionBar
//             onGetGraphData={handleGetGraphData}
//             onLoadData={handleRefreshData}
//           />
//         </Col>
//       </Row>
//
//       <Row className={styles.editorBd}>
//         <Col span={4} className={styles.editorSidebar}>
//           <FlowItemPanel />
//           <Card type="inner" size="small" title="Minimap" bordered={false}>
//             <div
//               // @ts-ignore
//               ref={miniMap}
//             />
//           </Card>
//         </Col>
//         <Col span={15} className={styles.editorContent}>
//           <Flow
//             className={styles.flow}
//             // @ts-ignore
//             ref={flow}
//             data={data}
//             noEndEdge={false}
//             graphConfig={{
//               plugins: [minimap]
//             }}
//           />
//           <EditableLabel />
//           <ItemPopover
//             renderContent={(item, position) => {
//               const { minY: top, centerX: left } = position
//
//               return (
//                 <Popover visible={true} title="Title" content="Content">
//                   <div style={{ position: 'absolute', top, left }} />
//                 </Popover>
//               )
//             }}
//           />
//         </Col>
//         <Col span={5} className={styles.editorSidebar}>
//           <FlowDetailPanel project="测试项目" />
//         </Col>
//       </Row>
//
//       <FlowContextMenu />
//     </GGEditor>
//   )
// }
// export default EditorFlow
