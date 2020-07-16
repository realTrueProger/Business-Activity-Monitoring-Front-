const mockNodeRegistry = {
    _elements: {
        el1: {
            gfx: {
                firstChild : {
                    firstChild: {
                        style: {
                            fill: 'white',
                        }
                    }
                }
            }
        },
        el2: {
            gfx: {
                firstChild : {
                    firstChild: {
                        style: {
                            fill: 'white',
                        }
                    }
                }
            }
        },
        el3: {
            gfx: {
                firstChild : {
                    firstChild: {
                        style: {
                            fill: 'white',
                        }
                    }
                }
            }
        },
    }
};

const mockNodesDurations = {
    el1: 10,
    el2: 50,
    el3: 90,
    _MAX: 90
};

const percent = (percent, total) => {
    return Number(((percent / 100) * total).toFixed());
};

const buildHeatMap = (nodesRegistry, nodesDurations) => {
    let p20 = percent(20, nodesDurations._MAX);
    let p80 = percent(80, nodesDurations._MAX);

    for (const [node, time] of Object.entries(nodesDurations)) {
        if (node === '_MAX' || node.startsWith('SubProcess')) continue;

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

buildHeatMap(mockNodeRegistry, mockNodesDurations);

for (let [node, time] of Object.entries(mockNodesDurations)) {
    if (node === '_MAX') continue
    console.log(mockNodeRegistry._elements[node].gfx.firstChild.firstChild.style.fill)
}