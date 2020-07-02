import React, {useEffect} from 'react';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import { useSelector} from "react-redux";
import BpmnViewer from 'bpmn-js';

const useStyles = makeStyles(() => ({
    paper: {
        padding: '5px',
        marginTop: '1rem',
        marginBottom: '1rem',
    },
    bpmn: {
        height: '300px',
        padding: '10px',
        fontSize: '16px',
    }
}));

const BpmnView = () => {
    const classes = useStyles();
    const container = React.createRef();
    let schema = useSelector(state => state.schema.schema);

    useEffect(() => {
        if (schema) {
            container.current.innerHTML = '';

            const viewer = new BpmnViewer({
                container: container.current
            });

            viewer.importXML(schema).then(function(result) {
                const { warnings } = result;
                viewer.get('canvas').zoom('fit-viewport');

                let registry = viewer.get('elementRegistry');
                let invoice = registry._elements.approveInvoice;
                let reviewInvoice = registry._elements.reviewInvoice;
                invoice.gfx.firstChild.firstChild.classList.add('green');
                reviewInvoice.gfx.firstChild.firstChild.style.fill = 'red';

            }).catch(function(err) {
                const { warnings, message } = err;
                console.log('something went wrong with BPMN:', warnings, message);
            });
        }
    }, [schema]);

    return (
        <div>
            {schema && <Paper className={classes.paper}>
                <div className={classes.bpmn} ref={container}/>
            </Paper>}
        </div>
    )
};

export default BpmnView;