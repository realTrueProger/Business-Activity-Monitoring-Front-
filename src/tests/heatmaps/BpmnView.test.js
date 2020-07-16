import {percent} from "../../components/BpmnView";
import {buildHeatMap} from "../../components/BpmnView";

describe('Percent tests:', () => {
    test('Percent should return 20 as 20 % from 100', () => {
        expect(percent(20, 100)).toBe(20);
    })
});

describe('Heatmaps tests:', () => {
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
            el4: {
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
            el5: {
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
            el6: {
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
            el7: {
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
        el1: 100,
        el2: 190,
        el3: 210,
        el4: 500,
        el5: 790,
        el6: 810,
        el7: 1000,
        _MAX: 1000
    };

    test('Should be correct colors', () => {
        buildHeatMap(mockNodeRegistry, mockNodesDurations);
        expect(mockNodeRegistry._elements.el1.gfx.firstChild.firstChild.style.fill).toBe('green');
        expect(mockNodeRegistry._elements.el2.gfx.firstChild.firstChild.style.fill).toBe('green');
        expect(mockNodeRegistry._elements.el3.gfx.firstChild.firstChild.style.fill).toBe('yellow');
        expect(mockNodeRegistry._elements.el4.gfx.firstChild.firstChild.style.fill).toBe('yellow');
        expect(mockNodeRegistry._elements.el5.gfx.firstChild.firstChild.style.fill).toBe('yellow');
        expect(mockNodeRegistry._elements.el6.gfx.firstChild.firstChild.style.fill).toBe('red');
        expect(mockNodeRegistry._elements.el7.gfx.firstChild.firstChild.style.fill).toBe('red');
    })
});