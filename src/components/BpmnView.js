import React, {useEffect} from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import BpmnNavigatedViewer from 'bpmn-js';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import TouchModule from 'diagram-js/lib/navigation/touch';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '5px',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    bpmn: {
        height: '400px',
        padding: '10px',
        fontSize: '16px',
    }
}));

export const percent = (percent, total) => {
    return Number(((percent / 100) * total).toFixed());
};

export const buildHeatMap = (nodesRegistry, nodesDurations) => {
    let p20 = percent(20, nodesDurations._MAX);
    let p80 = percent(80, nodesDurations._MAX);

    for (const [node, time] of Object.entries(nodesDurations)) {
        if (node === '_MAX' || node.startsWith('SubProcess')) continue;
        if (node === '_CURRENTNODE') {
            let el = nodesRegistry._elements[time].gfx.firstChild.firstChild;
            el.classList.add('currentNode');
            continue;
        }

        let nodeSvgElement = nodesRegistry._elements[node].gfx.firstChild.firstChild;

        if (time < p20) {
            nodeSvgElement.style.fill = 'green';
        }
        if (time >= p20 && time <= p80) {
            nodeSvgElement.style.fill = 'yellow';
        }
        if (time >= p80) {
            nodeSvgElement.style.fill = 'red';
        }
    }
};

const BpmnView = () => {
    const classes = useStyles();
    const container = React.createRef();
    let schema = useSelector(state => state.schema.schema);
    let durations = useSelector(state => state.schema.durations);


    useEffect(() => {
        if (schema) {
            container.current.innerHTML = '';

            const viewer = new BpmnNavigatedViewer({
                container: container.current,
                additionalModules: [
                    MoveCanvasModule,
                    ZoomScrollModule,
                    TouchModule
                ]
            });

            viewer.importXML(schema).then(function () {
                viewer.get('canvas').zoom('fit-viewport', 'auto');

                if (durations) {
                    buildHeatMap(viewer.get('elementRegistry'), durations);
                }
            }).catch(function (err) {
                const {warnings, message} = err;
                console.log('something went wrong with BPMN:', warnings, message);
            });
        }
    }, [schema, durations]);

    return (
        <div>
            {schema && <Paper className={classes.paper}>
                <div className={classes.bpmn} ref={container}/>
            </Paper>}
        </div>
    )
};

export default BpmnView;