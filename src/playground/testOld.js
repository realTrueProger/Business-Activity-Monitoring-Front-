////////////////////////////////////////////////////
// create test data



function createInstanceData(id, definition_id, name, start_user_id, start_time, end_time, removal_time,
                            start_activity_id, state_id, root_process_instanse_id, last_synch_time) {
    return {
        id, definition_id, name, start_user_id, start_time, end_time, removal_time,
        start_activity_id, state_id, root_process_instanse_id, last_synch_time
    };
}

const instancesRows = [
    createInstanceData(1, 2, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534),
    createInstanceData(2, 2, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534),
    createInstanceData(2, 1, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534),
];

function createDefinitionData(id, instances, key, name, deployment_id, version, schema_xml) {
    return {id, instances, key, name, deployment_id, version, schema_xml};
}

function getInstances(id) {
    return instancesRows.filter(row => row.definition_id === id).length;
}

const defenitionRows = [
    createDefinitionData(1, getInstances(1), 6.0, 24, 4.0, 4, 'schema1.xml'),
    createDefinitionData(2, getInstances(2), 9.0, 37, 4.3, 4, 'schema1.xml'),
    createDefinitionData(3, getInstances(3), 9.0, 37, 4.3, 4, 'schema1.xml'),
    createDefinitionData(4, getInstances(4), 9.0, 37, 4.3, 4, 'schema1.xml'),
    createDefinitionData(5, getInstances(5), 9.0, 37, 4.3, 4, 'schema1.xml'),
    createDefinitionData(6, getInstances(6), 9.0, 37, 4.3, 4,'schema1.xml'),
];
function createIncidentsData(id, activity_id, create_time, process_instance_id, type, message,
                             open, deleted, resolved) {
    return {
        id, activity_id, create_time, process_instance_id, type, message,
        open, deleted, resolved
    };
}



const incidentRows = [
    createIncidentsData(1, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(2, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(3, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(4, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(5, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(6, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
    createIncidentsData(7, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423),
];

function createTasksData(id, parent_task_id, name, task_definiton_key, description,
                         start_time, end_time, owner, assignee, removal_time,
                         due_time, followup_time, activity_instance_id, priority) {
    return {
        id, parent_task_id, name, task_definiton_key, description,
        start_time, end_time, owner, assignee, removal_time,
        due_time, followup_time, activity_instance_id, priority
    };
}

const tasksRows = [
    createTasksData(1, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 43,233,3434),
    createTasksData(2, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 43,233,3434),
    createTasksData(3, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 43,233,3434),
    createTasksData(4, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 43,233,3434),
    createTasksData(5, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 43,233,3434),
    createTasksData(6, 159, 6.0, 24, 4.0, 15.20, 1624, 223432420, 42432423, 2334432432, 24534, 4342,243,434),
];



let definitions = {
    tableName: 'Process definitions',
    tableHeaders: ['id', 'instances', 'key', 'name', 'deployment_id', 'version', 'schema_xml'],
    tableRows: defenitionRows
};

let instances = {
    tableName: 'Process instances',
    tableHeaders: ['id', 'definition_id', 'name', 'start_user_id', 'start_time', 'end_time', 'removal_time',
        'start_activity_id', 'state_id', 'root_process_instanse_id', 'last_synch_time'],
    tableRows: instancesRows
};

let incidents = {
    tableName: 'Process incidents',
    tableHeaders: ['id', 'activity_id', 'create_time', 'process_instance_id', 'type', 'message',
        'open', 'deleted', 'resolved'],
    tableRows: incidentRows
};

let tasks = {
    tableName: 'User tasks',
    tableHeaders: ['id', 'parent_task_id', 'name', 'task_definiton_key', 'description',
        'start_time', 'end_time', 'owner', 'assignee', 'removal_time',
        'due_time', 'followup_time', 'activity_instance_id', 'priority'],
    tableRows: tasksRows
};