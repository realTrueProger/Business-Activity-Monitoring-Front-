import React, {useEffect} from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import BpmnViewer from 'bpmn-js';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '5px',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    bpmn: {
        height: '500px',
        padding: '10px',
        fontSize: '16px',
    }
}));

const BpmnView = () => {
    const classes = useStyles();
    const container = React.createRef();
    let schema = useSelector(state => state.schema.schema);
    let durations = useSelector(state => state.schema.durations);

    const percent = (percent, total) => {
        return ((percent / 100) * total).toFixed();
    };

    const buildHeatMap = (nodesRegistry, nodesDurations) => {
        let p20 = percent(20, nodesDurations._MAX);
        let p80 = percent(80, nodesDurations._MAX);

        for (const [node, time] of Object.entries(nodesDurations)) {
            if (node === '_MAX' || node.startsWith('SubProcess')) continue;

            if (time < p20) {
                nodesRegistry._elements[node].gfx.firstChild.firstChild.style.fill = 'green';
            }
            if (time >= p20 && time <= p80) {
                nodesRegistry._elements[node].gfx.firstChild.firstChild.style.fill = 'yellow';
            }
            if (time >= p80) {
                nodesRegistry._elements[node].gfx.firstChild.firstChild.style.fill = 'red';
            }
        }
    };

    useEffect(() => {
        if (schema) {
            container.current.innerHTML = '';

            const viewer = new BpmnViewer({
                container: container.current
            });

            viewer.importXML(schema).then(function () {
                viewer.get('canvas').zoom('fit-viewport');

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