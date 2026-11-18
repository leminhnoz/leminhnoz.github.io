// ==========================================
// GRAPH STUDIO - WHITEBOARD & SIMULATION ENGINE
// ==========================================

let network = null;
let nodesDataset = new vis.DataSet([]);
let edgesDataset = new vis.DataSet([]);
let isDirected = false;
let isPhysicsEnabled = true;

// Parsed Graph Data
let graphData = {
    nodes: new Set(),
    edges: [], // { id, from, to, weight }
    adj: {},   // node -> [ { to, weight, edgeId } ]
    isDirected: false
};

// Preset samples
const PRESETS = {
    bfs_dfs: {
        directed: false,
        text: `# Mẫu đồ thị trực quan cho mô phỏng BFS / DFS
1 2
1 3
2 4
2 5
3 6
3 7
4 8
5 8`
    },
    dijkstra: {
        directed: false,
        text: `# Mẫu đồ thị có trọng số (Dijkstra)
1 2 4
1 3 2
2 3 1
2 4 5
3 4 8
3 5 10
4 5 2
4 6 6
5 6 3`
    },
    dag: {
        directed: true,
        text: `# Đồ thị có hướng (DAG)
1 2 3
1 3 2
2 4 4
3 4 1
3 5 6
4 6 5
5 6 2`
    },
    tree: {
        directed: true,
        text: `# Cây nhị phân (Binary Tree)
1 2
1 3
2 4
2 5
3 6
3 7`
    },
    bipartite: {
        directed: false,
        text: `# Đồ thị 2 phía (Bipartite)
1 4
1 5
2 4
2 6
3 5
3 6`
    },
    cycle: {
        directed: false,
        text: `# Đồ thị có chu trình
1 2 3
2 3 4
3 4 2
4 5 6
5 1 5
2 4 1`
    }
};

// DOM References
const sidebar = document.getElementById('sidebar');
const btnCollapseSidebar = document.getElementById('btn-collapse-sidebar');
const btnUncollapseSidebar = document.getElementById('btn-uncollapse-sidebar');
const edgeInput = document.getElementById('edge-input');
const presetSelect = document.getElementById('preset-select');
const layoutSelect = document.getElementById('layout-select');
const btnRender = document.getElementById('btn-render');
const btnClear = document.getElementById('btn-clear');
const btnUndirected = document.getElementById('btn-undirected');
const btnDirected = document.getElementById('btn-directed');
const networkContainer = document.getElementById('network-container');
const canvasViewport = document.querySelector('.canvas-viewport');

// Toolbar & Whiteboard Drawing Canvas
const drawingCanvas = document.getElementById('drawing-canvas');
const toolCursor = document.getElementById('tool-cursor');
const toolPen = document.getElementById('tool-pen');
const toolMarker = document.getElementById('tool-marker');
const toolEraser = document.getElementById('tool-eraser');
const penColorsContainer = document.getElementById('pen-colors');
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');
const btnClearCanvas = document.getElementById('btn-clear-canvas');
const btnFreeze = document.getElementById('btn-freeze');
const btnFit = document.getElementById('btn-fit');
const btnExportPng = document.getElementById('btn-export-png');

// Inspector
const nodeInspector = document.getElementById('node-inspector');
const inspectorTitle = document.getElementById('inspector-title');
const inspectorDeg = document.getElementById('inspector-deg');
const inspectorNeighbors = document.getElementById('inspector-neighbors');
const btnCloseInspector = document.getElementById('btn-close-inspector');

// Simulation
const simTypeBfs = document.getElementById('sim-type-bfs');
const simTypeDfs = document.getElementById('sim-type-dfs');
const simStartNode = document.getElementById('sim-start-node');
const simSpeed = document.getElementById('sim-speed');
const speedLabel = document.getElementById('speed-label');
const btnSimPlay = document.getElementById('btn-sim-play');
const simPlayText = document.getElementById('sim-play-text');
const btnSimStep = document.getElementById('btn-sim-step');
const btnSimReset = document.getElementById('btn-sim-reset');
const simStepBadge = document.getElementById('sim-step-badge');
const simCurrentAction = document.getElementById('sim-current-action');
const dsTitle = document.getElementById('ds-title');
const simDsContent = document.getElementById('sim-ds-content');
const simOrderContent = document.getElementById('sim-order-content');

// Algorithms
const dijkstraStart = document.getElementById('dijkstra-start');
const dijkstraEnd = document.getElementById('dijkstra-end');
const btnRunDijkstra = document.getElementById('btn-run-dijkstra');
const btnClearAlgo = document.getElementById('btn-clear-algo');
const dijkstraResult = document.getElementById('dijkstra-result');
const btnRunMst = document.getElementById('btn-run-mst');
const mstResult = document.getElementById('mst-result');
const btnColorComponents = document.getElementById('btn-color-components');
const statComponents = document.getElementById('stat-components');
const statCycle = document.getElementById('stat-cycle');
const statBipartite = document.getElementById('stat-bipartite');

// Code tab
const codeAdjList = document.getElementById('code-adj-list');
const codeAdjMatrix = document.getElementById('code-adj-matrix');
const codeCpp = document.getElementById('code-cpp');
const btnCopyCpp = document.getElementById('btn-copy-cpp');

// Modal Random
const btnRandomOpen = document.getElementById('btn-random-open');
const modalRandom = document.getElementById('modal-random');
const btnCloseModal = document.getElementById('btn-close-modal');
const btnCancelModal = document.getElementById('btn-cancel-modal');
const btnGenerateRand = document.getElementById('btn-generate-rand');

// Drawing & History state
let currentTool = 'cursor'; // 'cursor' | 'pen' | 'marker' | 'eraser'
let markerColor = '#facc15'; // Default color
let drawCtx = null;

let undoStack = []; // array of stroke objects: { tool, color, width, points: [{x, y}] }
let redoStack = [];
let currentStroke = null;
let isDrawing = false;

// Right-click Pan state
let isPanning = false;
let startPanX = 0;
let startPanY = 0;
let startViewPos = { x: 0, y: 0 };

// Simulation state
let simSteps = [];
let currentStepIdx = -1;
let simTimer = null;
let currentSimAlgo = 'bfs'; // 'bfs' | 'dfs'

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    setupDrawingCanvas();
    setupEvents();
    setupTabs();
    loadPreset('bfs_dfs');
    renderGraph();
}

function setupEvents() {
    // 1. Prevent default context menu so right-click never opens browser "Save image as..."
    window.addEventListener('contextmenu', (e) => {
        if (e.target.closest('.canvas-viewport') || e.target.closest('#drawing-canvas') || e.target.closest('#network-container')) {
            e.preventDefault();
            return false;
        }
    });

    // 2. Sidebar collapse / uncollapse
    btnCollapseSidebar.addEventListener('click', () => toggleSidebar(false));
    btnUncollapseSidebar.addEventListener('click', () => toggleSidebar(true));

    // 3. Global Keyboard Shortcuts (Ctrl+Z: Undo, Ctrl+Y: Redo, H: Toggle Sidebar)
    window.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;

        if ((e.ctrlKey || e.metaKey) && (e.key === 'z' || e.key === 'Z')) {
            e.preventDefault();
            if (e.shiftKey) {
                redo();
            } else {
                undo();
            }
        } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || e.key === 'Y')) {
            e.preventDefault();
            redo();
        } else if (e.key === 'h' || e.key === 'H') {
            const isCollapsed = sidebar.classList.contains('collapsed');
            toggleSidebar(isCollapsed);
        }
    });

    // 4. Graph config events
    btnRender.addEventListener('click', () => renderGraph());
    btnClear.addEventListener('click', clearAll);

    btnUndirected.addEventListener('click', () => {
        isDirected = false;
        btnUndirected.classList.add('active');
        btnDirected.classList.remove('active');
        renderGraph();
    });

    btnDirected.addEventListener('click', () => {
        isDirected = true;
        btnDirected.classList.add('active');
        btnUndirected.classList.remove('active');
        renderGraph();
    });

    layoutSelect.addEventListener('change', () => renderGraph());
    presetSelect.addEventListener('change', (e) => {
        if (e.target.value) {
            loadPreset(e.target.value);
            renderGraph();
        }
    });

    // Auto update when typing
    let debounceTimer;
    edgeInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => renderGraph(), 500);
    });

    // 5. Whiteboard Toolbar: Tools, Colors, Actions
    toolCursor.addEventListener('click', () => setTool('cursor'));
    if (toolPen) toolPen.addEventListener('click', () => setTool('pen'));
    toolMarker.addEventListener('click', () => setTool('marker'));
    toolEraser.addEventListener('click', () => setTool('eraser'));

    penColorsContainer.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const chosenColor = dot.getAttribute('data-color');
            setColor(chosenColor);
            if (currentTool !== 'pen' && currentTool !== 'marker') {
                setTool('pen');
            }
        });
    });

    if (btnUndo) btnUndo.addEventListener('click', undo);
    if (btnRedo) btnRedo.addEventListener('click', redo);
    btnClearCanvas.addEventListener('click', clearDrawingCanvas);
    btnFreeze.addEventListener('click', togglePhysics);
    btnFit.addEventListener('click', fitGraph);
    btnExportPng.addEventListener('click', exportToPng);

    // Inspector
    btnCloseInspector.addEventListener('click', () => nodeInspector.classList.add('hidden'));

    // Simulation events
    simTypeBfs.addEventListener('click', () => {
        currentSimAlgo = 'bfs';
        simTypeBfs.classList.add('active');
        simTypeDfs.classList.remove('active');
        dsTitle.textContent = 'Hàng đợi (Queue):';
        resetSimulation();
    });

    simTypeDfs.addEventListener('click', () => {
        currentSimAlgo = 'dfs';
        simTypeDfs.classList.add('active');
        simTypeBfs.classList.remove('active');
        dsTitle.textContent = 'Ngăn xếp (Stack):';
        resetSimulation();
    });

    simSpeed.addEventListener('input', () => {
        speedLabel.textContent = `${(simSpeed.value / 1000).toFixed(1)}s`;
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = setInterval(stepForward, parseInt(simSpeed.value));
        }
    });

    btnSimPlay.addEventListener('click', toggleSimPlay);
    btnSimStep.addEventListener('click', stepForward);
    btnSimReset.addEventListener('click', resetSimulation);
    simStartNode.addEventListener('change', resetSimulation);

    // Algorithms
    btnRunDijkstra.addEventListener('click', runDijkstra);
    btnClearAlgo.addEventListener('click', resetHighlights);
    btnRunMst.addEventListener('click', runMst);
    btnColorComponents.addEventListener('click', colorComponents);

    // Code copy
    btnCopyCpp.addEventListener('click', () => {
        navigator.clipboard.writeText(codeCpp.textContent);
        btnCopyCpp.textContent = 'Đã chép!';
        setTimeout(() => btnCopyCpp.textContent = 'Copy', 1500);
    });

    // Random Modal
    btnRandomOpen.addEventListener('click', () => modalRandom.classList.remove('hidden'));
    btnCloseModal.addEventListener('click', () => modalRandom.classList.add('hidden'));
    btnCancelModal.addEventListener('click', () => modalRandom.classList.add('hidden'));
    btnGenerateRand.addEventListener('click', generateRandomGraph);

    // Resize listener
    window.addEventListener('resize', () => {
        resizeDrawingCanvas();
        redrawOverlayCanvas();
        if (network) network.redraw();
    });
}

function setupTabs() {
    const tabBtns = document.querySelectorAll('.nav-tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-tab');
            document.getElementById(targetId).classList.add('active');
        });
    });
}

function toggleSidebar(show) {
    if (show) {
        sidebar.classList.remove('collapsed');
        btnUncollapseSidebar.classList.add('hidden');
    } else {
        sidebar.classList.add('collapsed');
        btnUncollapseSidebar.classList.remove('hidden');
    }
    setTimeout(() => {
        resizeDrawingCanvas();
        redrawOverlayCanvas();
        if (network) {
            network.redraw();
            network.fit();
        }
    }, 320);
}

// ==========================================
// WHITEBOARD DRAWING & RIGHT-CLICK PAN
// ==========================================
function setupDrawingCanvas() {
    drawCtx = drawingCanvas.getContext('2d');
    resizeDrawingCanvas();

    // 1. Right Click = Pan Canvas (Listeners on Viewport)
    canvasViewport.addEventListener('mousedown', (e) => {
        if (e.button === 2) { // Right Click: Pan board
            e.preventDefault();
            isPanning = true;
            startPanX = e.clientX;
            startPanY = e.clientY;
            if (network) startViewPos = network.getViewPosition();
            canvasViewport.style.cursor = 'grabbing';
            drawingCanvas.style.cursor = 'grabbing';
        }
    });

    window.addEventListener('mousemove', (e) => {
        if (isPanning) {
            if (!network) return;
            const scale = network.getScale();
            const dx = (e.clientX - startPanX) / scale;
            const dy = (e.clientY - startPanY) / scale;
            network.moveTo({
                position: {
                    x: startViewPos.x - dx,
                    y: startViewPos.y - dy
                }
            });
            redrawOverlayCanvas();
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (e.button === 2 && isPanning) {
            isPanning = false;
            canvasViewport.style.cursor = '';
            updateCanvasCursor();
        }
    });

    // 2. Left Click = Draw / Erase on drawingCanvas
    drawingCanvas.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Left Click
            if (currentTool === 'pen' || currentTool === 'marker' || currentTool === 'eraser') {
                isDrawing = true;
                const rect = drawingCanvas.getBoundingClientRect();
                const domPt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                const graphPt = network ? network.DOMtoCanvas(domPt) : domPt;

                let strokeWidth = 14;
                if (currentTool === 'pen') strokeWidth = 3.2;
                else if (currentTool === 'eraser') strokeWidth = 24;

                currentStroke = {
                    tool: currentTool,
                    color: markerColor,
                    width: strokeWidth,
                    points: [graphPt]
                };
                redrawOverlayCanvas();
            }
        }
    });

    drawingCanvas.addEventListener('mousemove', (e) => {
        if (isDrawing && currentStroke) {
            const rect = drawingCanvas.getBoundingClientRect();
            const domPt = { x: e.clientX - rect.left, y: e.clientY - rect.top };
            const graphPt = network ? network.DOMtoCanvas(domPt) : domPt;
            currentStroke.points.push(graphPt);
            redrawOverlayCanvas();
        }
    });

    window.addEventListener('mouseup', (e) => {
        if (e.button === 0 && isDrawing) {
            isDrawing = false;
            if (currentStroke && currentStroke.points.length > 0) {
                undoStack.push(currentStroke);
                redoStack = []; // Clear redo stack on new action
            }
            currentStroke = null;
            redrawOverlayCanvas();
        }
    });
}

function resizeDrawingCanvas() {
    const rect = drawingCanvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    drawingCanvas.width = rect.width;
    drawingCanvas.height = rect.height;
}

function setColor(color) {
    markerColor = color;
    penColorsContainer.querySelectorAll('.color-dot').forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('data-color') === color);
    });
}

function setTool(tool) {
    currentTool = tool;
    toolCursor.classList.toggle('active', tool === 'cursor');
    if (toolPen) toolPen.classList.toggle('active', tool === 'pen');
    toolMarker.classList.toggle('active', tool === 'marker');
    toolEraser.classList.toggle('active', tool === 'eraser');

    // Auto smart color recommendation
    if (tool === 'pen' && (markerColor === '#facc15' || markerColor === '#fef08a')) {
        setColor('#18181b'); // Default to black for writing pen
    } else if (tool === 'marker' && markerColor === '#18181b') {
        setColor('#facc15'); // Default to fluorescent yellow for highlighter
    }

    updateCanvasCursor();
}

function updateCanvasCursor() {
    if (currentTool === 'cursor') {
        drawingCanvas.classList.remove('active-drawing');
        drawingCanvas.style.cursor = 'default';
    } else {
        drawingCanvas.classList.add('active-drawing');
        if (currentTool === 'eraser') {
            drawingCanvas.style.cursor = 'cell';
        } else if (currentTool === 'pen') {
            drawingCanvas.style.cursor = 'crosshair';
        } else {
            drawingCanvas.style.cursor = 'crosshair';
        }
    }
}

// Redraw all strokes in real-time, converted from graph coordinates to screen coordinates
function redrawOverlayCanvas() {
    if (!drawCtx) return;
    drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    const allStrokes = [...undoStack];
    if (currentStroke) allStrokes.push(currentStroke);

    const scale = network ? network.getScale() : 1.0;

    allStrokes.forEach(stroke => {
        if (!stroke.points || stroke.points.length === 0) return;

        drawCtx.save();
        if (stroke.tool === 'pen') {
            // Opaque, clean, solid writing pen
            drawCtx.globalCompositeOperation = 'source-over';
            drawCtx.globalAlpha = 1.0;
            drawCtx.strokeStyle = stroke.color;
            drawCtx.lineWidth = Math.max(stroke.width * scale, 1.5);
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
        } else if (stroke.tool === 'marker') {
            // Semi-transparent highlighter with multiply effect
            drawCtx.globalCompositeOperation = 'multiply';
            drawCtx.globalAlpha = 0.55;
            drawCtx.strokeStyle = stroke.color;
            drawCtx.lineWidth = Math.max(stroke.width * scale, 4);
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
        } else if (stroke.tool === 'eraser') {
            // Eraser: erase strokes cleanly
            drawCtx.globalCompositeOperation = 'destination-out';
            drawCtx.lineWidth = Math.max(stroke.width * scale, 6);
            drawCtx.lineCap = 'round';
            drawCtx.lineJoin = 'round';
        }

        drawCtx.beginPath();
        const p0 = network ? network.canvasToDOM(stroke.points[0]) : stroke.points[0];
        drawCtx.moveTo(p0.x, p0.y);

        if (stroke.points.length === 1) {
            drawCtx.lineTo(p0.x + 0.1, p0.y + 0.1);
        } else {
            for (let i = 1; i < stroke.points.length; i++) {
                const pt = network ? network.canvasToDOM(stroke.points[i]) : stroke.points[i];
                drawCtx.lineTo(pt.x, pt.y);
            }
        }
        drawCtx.stroke();
        drawCtx.restore();
    });
}

function undo() {
    if (undoStack.length > 0) {
        const stroke = undoStack.pop();
        redoStack.push(stroke);
        redrawOverlayCanvas();
    }
}

function redo() {
    if (redoStack.length > 0) {
        const stroke = redoStack.pop();
        undoStack.push(stroke);
        redrawOverlayCanvas();
    }
}

function clearDrawingCanvas() {
    undoStack = [];
    redoStack = [];
    currentStroke = null;
    if (drawCtx) {
        drawCtx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
}

// ==========================================
// GRAPH PARSING LOGIC
// ==========================================
function parseInput() {
    const text = edgeInput.value.trim();
    const lines = text.split('\n');

    const nodesSet = new Set();
    const edges = [];
    const adj = {};

    let detectedFirstLineNM = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line || line.startsWith('#') || line.startsWith('//')) continue;

        line = line.replace(/->|-->|--|:/g, ' ').replace(/,/g, ' ');
        const parts = line.split(/\s+/).filter(Boolean);

        if (parts.length === 0) continue;

        // Skip line 1 if N M format from CP problems
        if (!detectedFirstLineNM && i === 0 && parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            if (lines.length > 2) {
                detectedFirstLineNM = true;
                continue;
            }
        }

        let u = parts[0];
        let v = parts[1];
        let w = parts.length >= 3 ? parseFloat(parts[2]) : null;

        if (u === undefined) continue;
        if (v === undefined) {
            nodesSet.add(u);
            if (!adj[u]) adj[u] = [];
            continue;
        }

        nodesSet.add(u);
        nodesSet.add(v);
        if (!adj[u]) adj[u] = [];
        if (!adj[v]) adj[v] = [];

        const edgeId = `e_${u}_${v}_${edges.length}`;
        edges.push({ id: edgeId, from: u, to: v, weight: w });

        adj[u].push({ to: v, weight: w, edgeId });
        if (!isDirected) {
            adj[v].push({ to: u, weight: w, edgeId });
        }
    }

    graphData = {
        nodes: nodesSet,
        edges: edges,
        adj: adj,
        isDirected: isDirected
    };

    updateDropdownsAndStats();
    updateCodeOutputs();
    resetSimulation();
    return graphData;
}

// ==========================================
// RENDERING WITH VIS-NETWORK (WHITEBOARD THEME)
// ==========================================
function renderGraph() {
    parseInput();

    const nodeList = Array.from(graphData.nodes).sort((a, b) => {
        if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);
        return String(a).localeCompare(String(b));
    });

    const layoutMode = layoutSelect.value;
    const isHierarchical = layoutMode.startsWith('hierarchical');
    const isCircular = layoutMode === 'circular';

    const visNodes = [];
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.28;
    const totalNodes = nodeList.length;

    // WHITEBOARD THEME: Crisp black & white nodes
    nodeList.forEach((nodeId, idx) => {
        const nodeObj = {
            id: nodeId,
            label: String(nodeId),
            shape: 'circle',
            font: {
                color: '#0f172a', // Solid Black font
                size: 15,
                face: 'Fira Code',
                bold: { mod: 'bold' }
            },
            color: {
                background: '#ffffff', // Clean White fill
                border: '#0f172a',     // Deep Black border
                highlight: {
                    background: '#fef08a', // Yellow on click
                    border: '#000000'
                },
                hover: {
                    background: '#f8fafc',
                    border: '#0f172a'
                }
            },
            borderWidth: 2.5,
            shadow: {
                enabled: true,
                color: 'rgba(0, 0, 0, 0.08)',
                size: 6,
                x: 2,
                y: 3
            }
        };

        if (isCircular && totalNodes > 0) {
            const angle = (2 * Math.PI * idx) / totalNodes - Math.PI / 2;
            nodeObj.x = Math.cos(angle) * radius;
            nodeObj.y = Math.sin(angle) * radius;
            nodeObj.fixed = true;
        }

        visNodes.push(nodeObj);
    });

    // WHITEBOARD THEME: Solid black edges with white weight badge
    const visEdges = graphData.edges.map(e => {
        const edgeObj = {
            id: e.id,
            from: e.from,
            to: e.to,
            color: {
                color: '#0f172a', // Deep black edge line
                highlight: '#0284c7',
                hover: '#475569'
            },
            width: 2.2,
            selectionWidth: 3.5,
            arrows: isDirected ? { to: { enabled: true, scaleFactor: 0.85 } } : { to: { enabled: false } },
            smooth: isHierarchical ? { type: 'cubicBezier' } : { type: 'continuous', roundness: 0.15 }
        };

        if (e.weight !== null && !isNaN(e.weight)) {
            edgeObj.label = String(e.weight);
            edgeObj.font = {
                color: '#0f172a',
                size: 12,
                face: 'Fira Code',
                background: '#ffffff',
                strokeColor: '#0f172a',
                strokeWidth: 1,
                align: 'middle'
            };
        }

        return edgeObj;
    });

    nodesDataset = new vis.DataSet(visNodes);
    edgesDataset = new vis.DataSet(visEdges);

    let physicsOptions = {
        enabled: isPhysicsEnabled && !isCircular,
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
            gravitationalConstant: -60,
            centralGravity: 0.015,
            springLength: 125,
            springConstant: 0.08,
            damping: 0.5
        },
        stabilization: { iterations: 120, updateInterval: 25 }
    };

    let layoutOptions = {};
    if (isHierarchical) {
        layoutOptions = {
            hierarchical: {
                direction: layoutMode === 'hierarchical-lr' ? 'LR' : 'UD',
                sortMethod: 'directed',
                nodeSpacing: 130,
                levelSeparation: 150
            }
        };
        physicsOptions = { enabled: false };
    }

    const options = {
        nodes: { margin: 10 },
        edges: { hoverWidth: 1.5 },
        physics: physicsOptions,
        layout: layoutOptions,
        interaction: {
            hover: true,
            tooltipDelay: 100,
            zoomView: true,
            dragView: true
        }
    };

    if (network) network.destroy();
    network = new vis.Network(networkContainer, { nodes: nodesDataset, edges: edgesDataset }, options);

    // =========================================================================
    // THE GRAPH IS TIED TO THE BOARD: Draw grid directly in graph coordinates
    // =========================================================================
    network.on('beforeDrawing', (ctx) => {
        const scale = network.getScale();
        const pos = network.getViewPosition();
        const width = networkContainer.clientWidth;
        const height = networkContainer.clientHeight;

        ctx.save();
        // Visible bounds in graph coordinates
        const halfW = (width / (2 * scale)) + 120;
        const halfH = (height / (2 * scale)) + 120;
        const minX = pos.x - halfW;
        const maxX = pos.x + halfW;
        const minY = pos.y - halfH;
        const maxY = pos.y + halfH;

        // Clean white board background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(minX, minY, maxX - minX, maxY - minY);

        // Whiteboard dot grid (scales and pans perfectly with nodes)
        const baseStep = 28;
        const startX = Math.floor(minX / baseStep) * baseStep;
        const endX = Math.ceil(maxX / baseStep) * baseStep;
        const startY = Math.floor(minY / baseStep) * baseStep;
        const endY = Math.ceil(maxY / baseStep) * baseStep;

        ctx.fillStyle = '#cbd5e1'; // Slate dot color
        const dotRadius = Math.max(0.8, 1.25 / Math.sqrt(scale));

        ctx.beginPath();
        for (let x = startX; x <= endX; x += baseStep) {
            for (let y = startY; y <= endY; y += baseStep) {
                ctx.moveTo(x + dotRadius, y);
                ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
            }
        }
        ctx.fill();
        ctx.restore();
    });

    // Sync drawing strokes whenever network zooms or drags
    network.on('zoom', () => redrawOverlayCanvas());
    network.on('dragView', () => redrawOverlayCanvas());
    network.on('dragEnd', () => redrawOverlayCanvas());
    network.on('animationFinished', () => redrawOverlayCanvas());

    // Inspector click
    network.on('click', (params) => {
        if (params.nodes.length > 0) {
            showNodeInspector(params.nodes[0]);
        } else {
            nodeInspector.classList.add('hidden');
        }
    });

    network.on('hoverNode', () => {
        if (currentTool === 'cursor') networkContainer.style.cursor = 'pointer';
    });
    network.on('blurNode', () => {
        if (currentTool === 'cursor') networkContainer.style.cursor = 'default';
    });

    redrawOverlayCanvas();
}

function fitGraph() {
    if (network) network.fit({ animation: { duration: 500, easingFunction: 'easeInOutQuad' } });
}

function togglePhysics() {
    isPhysicsEnabled = !isPhysicsEnabled;
    if (network) network.setOptions({ physics: { enabled: isPhysicsEnabled } });
    if (btnFreeze) btnFreeze.classList.toggle('active', !isPhysicsEnabled);
}

function exportToPng() {
    if (!network) return;
    const netCanvas = networkContainer.querySelector('canvas');
    if (!netCanvas) return;

    // Create an offscreen canvas to combine graph + drawing overlay
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = netCanvas.width;
    exportCanvas.height = netCanvas.height;
    const ctx = exportCanvas.getContext('2d');

    // 1. Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    // 2. Draw network canvas (already has the whiteboard grid inside!)
    ctx.drawImage(netCanvas, 0, 0);

    // 3. Draw marker/pen drawing canvas
    if (drawingCanvas) {
        ctx.drawImage(drawingCanvas, 0, 0, exportCanvas.width, exportCanvas.height);
    }

    const link = document.createElement('a');
    link.download = `graph_whiteboard_${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
}

function clearAll() {
    edgeInput.value = '';
    renderGraph();
    resetHighlights();
    clearDrawingCanvas();
    nodeInspector.classList.add('hidden');
}

function loadPreset(key) {
    const p = PRESETS[key];
    if (!p) return;
    edgeInput.value = p.text;
    isDirected = p.directed;
    if (isDirected) {
        btnDirected.classList.add('active');
        btnUndirected.classList.remove('active');
    } else {
        btnUndirected.classList.add('active');
        btnDirected.classList.remove('active');
    }
}

function showNodeInspector(nodeId) {
    const neighbors = graphData.adj[nodeId] || [];
    inspectorTitle.textContent = `Đỉnh ${nodeId}`;
    inspectorDeg.textContent = neighbors.length;

    inspectorNeighbors.innerHTML = '';
    if (neighbors.length === 0) {
        inspectorNeighbors.innerHTML = '<li>(Không có đỉnh kề)</li>';
    } else {
        neighbors.forEach(item => {
            const li = document.createElement('li');
            const arrow = isDirected ? '→' : '—';
            const wText = item.weight !== null ? ` (w=${item.weight})` : '';
            li.textContent = `${arrow} Đỉnh ${item.to}${wText}`;
            inspectorNeighbors.appendChild(li);
        });
    }

    nodeInspector.classList.remove('hidden');
}

// ==========================================
// SIMULATION ENGINE: DFS / BFS
// ==========================================
function updateDropdownsAndStats() {
    const nodes = Array.from(graphData.nodes).sort((a, b) => {
        if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);
        return String(a).localeCompare(String(b));
    });

    // Sim Start Node
    const prevSim = simStartNode.value;
    simStartNode.innerHTML = '';
    nodes.forEach(n => simStartNode.add(new Option(`Đỉnh ${n}`, n)));
    if (nodes.includes(prevSim)) simStartNode.value = prevSim;
    else if (nodes.length > 0) simStartNode.value = nodes[0];

    // Dijkstra Start / End
    const prevStart = dijkstraStart.value;
    const prevEnd = dijkstraEnd.value;
    dijkstraStart.innerHTML = '';
    dijkstraEnd.innerHTML = '';
    nodes.forEach(n => {
        dijkstraStart.add(new Option(`Đỉnh ${n}`, n));
        dijkstraEnd.add(new Option(`Đỉnh ${n}`, n));
    });
    if (nodes.includes(prevStart)) dijkstraStart.value = prevStart;
    else if (nodes.length > 0) dijkstraStart.value = nodes[0];

    if (nodes.includes(prevEnd)) dijkstraEnd.value = prevEnd;
    else if (nodes.length > 1) dijkstraEnd.value = nodes[nodes.length - 1];

    computeGraphStats();
}

function buildSimulationSteps() {
    const start = simStartNode.value;
    if (!start) return [];

    simSteps = [];
    if (currentSimAlgo === 'bfs') {
        buildBfsSteps(start);
    } else {
        buildDfsSteps(start);
    }
}

// BFS Steps Builder
function buildBfsSteps(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);

    const traversalOrder = [];

    // Step 0: Initialize
    simSteps.push({
        action: `Khởi tạo BFS: Đẩy đỉnh bắt đầu <strong>${start}</strong> vào Hàng đợi (Queue).`,
        activeNode: start,
        visitedNodes: new Set(),
        activeEdges: new Set(),
        dataStructure: [start],
        traversalOrder: []
    });

    const activeEdgesSet = new Set();

    while (queue.length > 0) {
        const u = queue.shift();
        traversalOrder.push(u);

        // Step: Visiting node u
        simSteps.push({
            action: `Lấy đỉnh <strong>${u}</strong> ra khỏi Queue để xét các đỉnh kề.`,
            activeNode: u,
            visitedNodes: new Set(traversalOrder),
            activeEdges: new Set(activeEdgesSet),
            dataStructure: [...queue],
            traversalOrder: [...traversalOrder]
        });

        const neighbors = graphData.adj[u] || [];
        for (let item of neighbors) {
            const v = item.to;
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
                activeEdgesSet.add(item.edgeId);

                // Step: Discovering neighbor v
                simSteps.push({
                    action: `Từ đỉnh <strong>${u}</strong> tìm thấy đỉnh kề chưa thăm là <strong>${v}</strong> ➔ Đẩy <strong>${v}</strong> vào Queue.`,
                    activeNode: v,
                    highlightEdge: item.edgeId,
                    visitedNodes: new Set(traversalOrder),
                    activeEdges: new Set(activeEdgesSet),
                    dataStructure: [...queue],
                    traversalOrder: [...traversalOrder]
                });
            }
        }
    }

    // Final step
    simSteps.push({
        action: `✅ Hoàn thành duyệt BFS! Tổng số đỉnh đã duyệt: ${traversalOrder.length}.`,
        activeNode: null,
        visitedNodes: new Set(traversalOrder),
        activeEdges: new Set(activeEdgesSet),
        dataStructure: [],
        traversalOrder: [...traversalOrder]
    });
}

// DFS Steps Builder
function buildDfsSteps(start) {
    const visited = new Set();
    const stack = [start];
    const traversalOrder = [];
    const activeEdgesSet = new Set();

    simSteps.push({
        action: `Khởi tạo DFS: Đẩy đỉnh bắt đầu <strong>${start}</strong> vào Ngăn xếp (Stack).`,
        activeNode: start,
        visitedNodes: new Set(),
        activeEdges: new Set(),
        dataStructure: [start],
        traversalOrder: []
    });

    function dfs(u, parentEdgeId) {
        visited.add(u);
        traversalOrder.push(u);
        if (parentEdgeId) activeEdgesSet.add(parentEdgeId);

        simSteps.push({
            action: `Thăm đỉnh <strong>${u}</strong> (Đi sâu theo nhánh).`,
            activeNode: u,
            visitedNodes: new Set(traversalOrder),
            activeEdges: new Set(activeEdgesSet),
            dataStructure: [...stack],
            traversalOrder: [...traversalOrder]
        });

        const neighbors = graphData.adj[u] || [];
        for (let item of neighbors) {
            const v = item.to;
            if (!visited.has(v)) {
                stack.push(v);
                simSteps.push({
                    action: `Từ đỉnh <strong>${u}</strong> phát hiện đỉnh kề <strong>${v}</strong> chưa thăm ➔ Gọi đệ quy đi tới <strong>${v}</strong>.`,
                    activeNode: v,
                    highlightEdge: item.edgeId,
                    visitedNodes: new Set(traversalOrder),
                    activeEdges: new Set(activeEdgesSet),
                    dataStructure: [...stack],
                    traversalOrder: [...traversalOrder]
                });

                dfs(v, item.edgeId);

                stack.pop();
                simSteps.push({
                    action: `Quay lui (Backtrack) về đỉnh <strong>${u}</strong>.`,
                    activeNode: u,
                    visitedNodes: new Set(traversalOrder),
                    activeEdges: new Set(activeEdgesSet),
                    dataStructure: [...stack],
                    traversalOrder: [...traversalOrder]
                });
            }
        }
    }

    dfs(start, null);

    simSteps.push({
        action: `✅ Hoàn thành duyệt DFS! Tổng số đỉnh đã duyệt: ${traversalOrder.length}.`,
        activeNode: null,
        visitedNodes: new Set(traversalOrder),
        activeEdges: new Set(activeEdgesSet),
        dataStructure: [],
        traversalOrder: [...traversalOrder]
    });
}

function applySimStep(stepIdx) {
    if (stepIdx < 0 || stepIdx >= simSteps.length) return;
    const step = simSteps[stepIdx];

    simStepBadge.textContent = `Bước: ${stepIdx + 1}/${simSteps.length}`;
    simCurrentAction.innerHTML = step.action;

    // Render Data Structure View (Queue / Stack)
    simDsContent.innerHTML = '';
    if (step.dataStructure.length === 0) {
        simDsContent.innerHTML = '<span class="empty-hint">(Trống)</span>';
    } else {
        step.dataStructure.forEach((item, i) => {
            const chip = document.createElement('span');
            chip.className = 'ds-chip';
            if (i === 0 && currentSimAlgo === 'bfs') chip.classList.add('active-head');
            if (i === step.dataStructure.length - 1 && currentSimAlgo === 'dfs') chip.classList.add('active-head');
            chip.textContent = item;
            simDsContent.appendChild(chip);
        });
    }

    // Render Traversal Order View
    simOrderContent.innerHTML = '';
    if (step.traversalOrder.length === 0) {
        simOrderContent.innerHTML = '<span class="empty-hint">(Chưa có đỉnh nào)</span>';
    } else {
        step.traversalOrder.forEach((nodeId, idx) => {
            const span = document.createElement('span');
            span.className = 'ds-chip';
            span.textContent = `${idx + 1}. Đỉnh ${nodeId}`;
            simOrderContent.appendChild(span);
        });
    }

    // Apply Node Highlighting in Vis Network
    const allNodes = Array.from(graphData.nodes);
    allNodes.forEach(nodeId => {
        let bg = '#ffffff';
        let border = '#0f172a';
        let fontColor = '#0f172a';
        let borderWidth = 2.5;

        if (nodeId === step.activeNode) {
            // Currently active: Bright Amber Yellow
            bg = '#facc15';
            border = '#000000';
            borderWidth = 4;
        } else if (step.visitedNodes && step.visitedNodes.has(nodeId)) {
            // Visited: Emerald Green
            bg = '#34d399';
            border = '#065f46';
            borderWidth = 3;
            fontColor = '#064e3b';
        }

        nodesDataset.update({
            id: nodeId,
            color: { background: bg, border: border },
            font: { color: fontColor },
            borderWidth: borderWidth
        });
    });

    // Apply Edge Highlighting
    graphData.edges.forEach(e => {
        let edgeColor = '#0f172a';
        let width = 2.2;

        if (step.activeEdges && step.activeEdges.has(e.id)) {
            edgeColor = '#10b981'; // Green for traversed tree edge
            width = 4.2;
        }

        edgesDataset.update({
            id: e.id,
            color: { color: edgeColor },
            width: width
        });
    });
}

function stepForward() {
    if (simSteps.length === 0) buildSimulationSteps();
    if (currentStepIdx < simSteps.length - 1) {
        currentStepIdx++;
        applySimStep(currentStepIdx);
    } else {
        // Finished
        if (simTimer) {
            clearInterval(simTimer);
            simTimer = null;
            simPlayText.textContent = 'Phát Lại';
        }
    }
}

function toggleSimPlay() {
    if (simTimer) {
        // Pause
        clearInterval(simTimer);
        simTimer = null;
        simPlayText.textContent = 'Tiếp Tục';
    } else {
        // Play
        if (currentStepIdx >= simSteps.length - 1) {
            resetSimulation();
        }
        simPlayText.textContent = 'Tạm Dừng';
        simTimer = setInterval(stepForward, parseInt(simSpeed.value));
    }
}

function resetSimulation() {
    if (simTimer) {
        clearInterval(simTimer);
        simTimer = null;
    }
    simPlayText.textContent = 'Bắt Đầu';
    currentStepIdx = -1;
    simSteps = [];
    simStepBadge.textContent = 'Bước: 0';
    simCurrentAction.textContent = 'Chưa bắt đầu mô phỏng';
    simDsContent.innerHTML = '<span class="empty-hint">(Trống)</span>';
    simOrderContent.innerHTML = '<span class="empty-hint">(Chưa có đỉnh nào)</span>';
    resetHighlights();
}

// ==========================================
// ALGORITHMS (DIJKSTRA & MST)
// ==========================================
function runDijkstra() {
    const start = dijkstraStart.value;
    const end = dijkstraEnd.value;
    if (!start || !end) return;

    resetHighlights();

    const dist = {};
    const parent = {};
    const parentEdge = {};
    const nodes = Array.from(graphData.nodes);

    nodes.forEach(n => dist[n] = Infinity);
    dist[start] = 0;

    const unvisited = new Set(nodes);

    while (unvisited.size > 0) {
        let u = null;
        let minDist = Infinity;
        for (let n of unvisited) {
            if (dist[n] < minDist) {
                minDist = dist[n];
                u = n;
            }
        }

        if (u === null || dist[u] === Infinity || u === end) break;
        unvisited.delete(u);

        const neighbors = graphData.adj[u] || [];
        for (let item of neighbors) {
            const v = item.to;
            if (unvisited.has(v)) {
                const w = (item.weight !== null && !isNaN(item.weight)) ? item.weight : 1;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    parent[v] = u;
                    parentEdge[v] = item.edgeId;
                }
            }
        }
    }

    dijkstraResult.classList.remove('hidden');

    if (dist[end] === Infinity) {
        dijkstraResult.innerHTML = `❌ Không có đường đi từ <strong>${start}</strong> đến <strong>${end}</strong>!`;
        return;
    }

    const pathNodes = [];
    const pathEdgeIds = [];
    let cur = end;
    while (cur) {
        pathNodes.unshift(cur);
        if (parentEdge[cur]) pathEdgeIds.unshift(parentEdge[cur]);
        cur = parent[cur];
    }

    dijkstraResult.innerHTML = `
        <div>✅ <strong>Đường đi ngắn nhất:</strong> ${pathNodes.join(' ➔ ')}</div>
        <div style="margin-top: 4px;">⚡ <strong>Tổng chi phí (Trọng số):</strong> ${dist[end]}</div>
        <div>📍 <strong>Số bước:</strong> ${pathNodes.length - 1} cạnh</div>
    `;

    // Highlight on whiteboard: Glowing Amber and Green
    pathNodes.forEach((nodeId, idx) => {
        let bg = '#facc15';
        if (idx === 0) bg = '#4ade80'; // Start: green
        else if (idx === pathNodes.length - 1) bg = '#f87171'; // End: red

        nodesDataset.update({
            id: nodeId,
            color: { background: bg, border: '#000000' },
            borderWidth: 4
        });
    });

    pathEdgeIds.forEach(edgeId => {
        edgesDataset.update({
            id: edgeId,
            color: { color: '#f59e0b' },
            width: 5
        });
    });
}

function runMst() {
    resetHighlights();
    mstResult.classList.remove('hidden');

    const nodes = Array.from(graphData.nodes);
    const parent = {};
    const rank = {};

    function find(i) {
        if (parent[i] === i) return i;
        return parent[i] = find(parent[i]);
    }

    function union(i, j) {
        const rootI = find(i);
        const rootJ = find(j);
        if (rootI !== rootJ) {
            if (rank[rootI] < rank[rootJ]) parent[rootI] = rootJ;
            else if (rank[rootI] > rank[rootJ]) parent[rootJ] = rootI;
            else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
            return true;
        }
        return false;
    }

    nodes.forEach(n => {
        parent[n] = n;
        rank[n] = 0;
    });

    const sortedEdges = [...graphData.edges].map(e => ({
        ...e,
        w: (e.weight !== null && !isNaN(e.weight)) ? e.weight : 1
    })).sort((a, b) => a.w - b.w);

    const mstEdges = [];
    let totalMstWeight = 0;

    for (let e of sortedEdges) {
        if (union(e.from, e.to)) {
            mstEdges.push(e);
            totalMstWeight += e.w;
            if (mstEdges.length === nodes.length - 1) break;
        }
    }

    mstResult.innerHTML = `
        <div>🌳 <strong>Cây khung nhỏ nhất (MST):</strong> ${mstEdges.length} cạnh</div>
        <div>⚖️ <strong>Tổng trọng số:</strong> ${totalMstWeight}</div>
    `;

    mstEdges.forEach(e => {
        edgesDataset.update({
            id: e.id,
            color: { color: '#10b981' },
            width: 5
        });
    });

    nodes.forEach(n => {
        nodesDataset.update({
            id: n,
            color: { background: '#a7f3d0', border: '#047857' },
            borderWidth: 3
        });
    });
}

function colorComponents() {
    resetHighlights();
    const nodes = Array.from(graphData.nodes);
    const visited = new Set();
    const componentColors = [
        { bg: '#bae6fd', border: '#0284c7' },
        { bg: '#ddd6fe', border: '#7c3aed' },
        { bg: '#a7f3d0', border: '#059669' },
        { bg: '#fef08a', border: '#d97706' },
        { bg: '#fecdd3', border: '#e11d48' },
        { bg: '#fed7aa', border: '#ea580c' }
    ];

    const undirectedAdj = {};
    nodes.forEach(n => undirectedAdj[n] = []);
    graphData.edges.forEach(e => {
        undirectedAdj[e.from].push({ to: e.to, edgeId: e.id });
        undirectedAdj[e.to].push({ to: e.from, edgeId: e.id });
    });

    let compIdx = 0;
    nodes.forEach(n => {
        if (!visited.has(n)) {
            const color = componentColors[compIdx % componentColors.length];
            compIdx++;

            const q = [n];
            visited.add(n);

            while (q.length > 0) {
                const u = q.shift();
                nodesDataset.update({
                    id: u,
                    color: { background: color.bg, border: color.border },
                    borderWidth: 3
                });

                (undirectedAdj[u] || []).forEach(edge => {
                    edgesDataset.update({
                        id: edge.edgeId,
                        color: { color: color.border }
                    });
                    if (!visited.has(edge.to)) {
                        visited.add(edge.to);
                        q.push(edge.to);
                    }
                });
            }
        }
    });
}

function computeGraphStats() {
    const nodes = Array.from(graphData.nodes);
    if (nodes.length === 0) {
        statComponents.textContent = '0';
        statCycle.textContent = 'Không';
        statBipartite.textContent = '-';
        return;
    }

    const visited = new Set();
    let componentsCount = 0;
    const undirectedAdj = {};
    nodes.forEach(n => undirectedAdj[n] = []);
    graphData.edges.forEach(e => {
        undirectedAdj[e.from].push(e.to);
        undirectedAdj[e.to].push(e.from);
    });

    nodes.forEach(n => {
        if (!visited.has(n)) {
            componentsCount++;
            const queue = [n];
            visited.add(n);
            while (queue.length > 0) {
                const cur = queue.shift();
                (undirectedAdj[cur] || []).forEach(nxt => {
                    if (!visited.has(nxt)) {
                        visited.add(nxt);
                        queue.push(nxt);
                    }
                });
            }
        }
    });
    statComponents.textContent = componentsCount;

    // Cycle detection
    const hasCycle = detectCycle(nodes);
    statCycle.textContent = hasCycle ? 'Có chu trình ⚠️' : 'Không có chu trình ✅';
    statCycle.style.color = hasCycle ? '#ef4444' : '#10b981';

    // Bipartite check
    const isBipartite = checkBipartite(nodes, undirectedAdj);
    statBipartite.textContent = isBipartite ? 'Đúng (2 phía) ✅' : 'Không ❌';
    statBipartite.style.color = isBipartite ? '#10b981' : '#ef4444';
}

function detectCycle(nodes) {
    if (isDirected) {
        const state = {};
        nodes.forEach(n => state[n] = 0);
        function dfs(u) {
            state[u] = 1;
            for (let edge of (graphData.adj[u] || [])) {
                const v = edge.to;
                if (state[v] === 1) return true;
                if (state[v] === 0 && dfs(v)) return true;
            }
            state[u] = 2;
            return false;
        }
        for (let n of nodes) {
            if (state[n] === 0 && dfs(n)) return true;
        }
        return false;
    } else {
        const visited = new Set();
        function dfsUndirected(u, parent) {
            visited.add(u);
            for (let edge of (graphData.adj[u] || [])) {
                const v = edge.to;
                if (!visited.has(v)) {
                    if (dfsUndirected(v, u)) return true;
                } else if (v !== parent) {
                    return true;
                }
            }
            return false;
        }
        for (let n of nodes) {
            if (!visited.has(n)) {
                if (dfsUndirected(n, null)) return true;
            }
        }
        return false;
    }
}

function checkBipartite(nodes, undirectedAdj) {
    const color = {};
    for (let n of nodes) color[n] = -1;
    for (let start of nodes) {
        if (color[start] === -1) {
            color[start] = 0;
            const q = [start];
            while (q.length > 0) {
                const u = q.shift();
                for (let v of (undirectedAdj[u] || [])) {
                    if (color[v] === -1) {
                        color[v] = 1 - color[u];
                        q.push(v);
                    } else if (color[v] === color[u]) return false;
                }
            }
        }
    }
    return true;
}

function resetHighlights() {
    dijkstraResult.classList.add('hidden');
    mstResult.classList.add('hidden');

    const nodes = Array.from(graphData.nodes);
    nodes.forEach(n => {
        nodesDataset.update({
            id: n,
            color: { background: '#ffffff', border: '#0f172a' },
            font: { color: '#0f172a' },
            borderWidth: 2.5
        });
    });

    graphData.edges.forEach(e => {
        edgesDataset.update({
            id: e.id,
            color: { color: '#0f172a' },
            width: 2.2
        });
    });
}

// ==========================================
// CODE OUTPUTS & MATRIX
// ==========================================
function updateCodeOutputs() {
    const nodes = Array.from(graphData.nodes).sort((a, b) => {
        if (!isNaN(a) && !isNaN(b)) return Number(a) - Number(b);
        return String(a).localeCompare(String(b));
    });

    // 1. Adj List
    let adjText = '';
    nodes.forEach(u => {
        const neighbors = graphData.adj[u] || [];
        const items = neighbors.map(item => item.weight !== null ? `(${item.to}, w=${item.weight})` : `${item.to}`);
        adjText += `${u}: [ ${items.join(', ')} ]\n`;
    });
    codeAdjList.textContent = adjText || '(Trống)';

    // 2. Matrix
    if (nodes.length > 0 && nodes.length <= 25) {
        const header = '     ' + nodes.map(n => String(n).padStart(4, ' ')).join(' ');
        let matrixText = header + '\n' + '    ' + '-'.repeat(nodes.length * 5 + 1) + '\n';
        nodes.forEach(u => {
            let row = String(u).padStart(3, ' ') + ' |';
            nodes.forEach(v => {
                let foundEdge = null;
                for (let edge of (graphData.adj[u] || [])) {
                    if (edge.to === v) { foundEdge = edge; break; }
                }
                if (foundEdge) {
                    const wVal = foundEdge.weight !== null ? foundEdge.weight : 1;
                    row += String(wVal).padStart(4, ' ') + ' ';
                } else {
                    row += '   0 ';
                }
            });
            matrixText += row + '\n';
        });
        codeAdjMatrix.textContent = matrixText;
    } else {
        codeAdjMatrix.textContent = '(Trống hoặc đồ thị quá lớn)';
    }

    // 3. C++ Code
    let cpp = `// C++ Competitive Programming Graph Template\n`;
    cpp += `// Đỉnh V = ${nodes.length}, Cạnh E = ${graphData.edges.length}\n`;
    cpp += `#include <bits/stdc++.h>\nusing namespace std;\n\n`;

    const hasWeights = graphData.edges.some(e => e.weight !== null);
    const allNumeric = nodes.every(n => !isNaN(n));

    if (allNumeric) {
        const maxId = nodes.length > 0 ? Math.max(...nodes.map(Number)) : 0;
        const arraySize = Math.max(maxId + 5, 100005);

        if (hasWeights) {
            cpp += `const int MAXN = ${arraySize};\n`;
            cpp += `vector<pair<int, int>> adj[MAXN]; // {v, weight}\n\n`;
            cpp += `void addEdge(int u, int v, int w) {\n`;
            cpp += `    adj[u].push_back({v, w});\n`;
            if (!isDirected) cpp += `    adj[v].push_back({u, w});\n`;
            cpp += `}\n\n`;
        } else {
            cpp += `const int MAXN = ${arraySize};\n`;
            cpp += `vector<int> adj[MAXN];\n\n`;
            cpp += `void addEdge(int u, int v) {\n`;
            cpp += `    adj[u].push_back(v);\n`;
            if (!isDirected) cpp += `    adj[v].push_back(u);\n`;
            cpp += `}\n\n`;
        }

        cpp += `int main() {\n`;
        cpp += `    ios_base::sync_with_stdio(false); cin.tie(NULL);\n\n`;
        graphData.edges.forEach(e => {
            const wArg = e.weight !== null ? `, ${e.weight}` : (hasWeights ? `, 1` : ``);
            cpp += `    addEdge(${e.from}, ${e.to}${wArg});\n`;
        });
        cpp += `    return 0;\n}`;
    } else {
        cpp += `map<string, vector<pair<string, int>>> adj;\n`;
    }

    codeCpp.textContent = cpp;
}

// Random Generator
function generateRandomGraph() {
    const v = parseInt(document.getElementById('rand-v').value) || 6;
    const e = parseInt(document.getElementById('rand-e').value) || 8;
    const weighted = document.getElementById('rand-weighted').checked;

    const maxEdges = isDirected ? v * (v - 1) : (v * (v - 1)) / 2;
    const actualE = Math.min(e, maxEdges);
    const edgeSet = new Set();
    const lines = [];

    for (let i = 2; i <= v; i++) {
        const u = Math.floor(Math.random() * (i - 1)) + 1;
        const key = isDirected ? `${u}_${i}` : (u < i ? `${u}_${i}` : `${i}_${u}`);
        edgeSet.add(key);
        const w = weighted ? Math.floor(Math.random() * 15) + 1 : '';
        lines.push(`${u} ${i} ${w}`.trim());
    }

    while (edgeSet.size < actualE) {
        const u = Math.floor(Math.random() * v) + 1;
        const to = Math.floor(Math.random() * v) + 1;
        if (u === to) continue;
        const key = isDirected ? `${u}_${to}` : (u < to ? `${u}_${to}` : `${to}_${u}`);
        if (!edgeSet.has(key)) {
            edgeSet.add(key);
            const w = weighted ? Math.floor(Math.random() * 15) + 1 : '';
            lines.push(`${u} ${to} ${w}`.trim());
        }
    }

    edgeInput.value = lines.join('\n');
    modalRandom.classList.add('hidden');
    renderGraph();
}

window.addEventListener('DOMContentLoaded', init);
