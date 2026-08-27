import React, { useState, useEffect, useRef } from 'react';
import { NetworkNode, NetworkEdge } from '../types';
import { MOCK_NETWORK_NODES, MOCK_NETWORK_EDGES } from '../data/mockData';

interface NetworkGraphViewProps {
  onSelectNode?: (node: NetworkNode) => void;
}

export const NetworkGraphView: React.FC<NetworkGraphViewProps> = ({ onSelectNode }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodes, setNodes] = useState<NetworkNode[]>(MOCK_NETWORK_NODES);
  const [edges] = useState<NetworkEdge[]>(MOCK_NETWORK_EDGES);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(MOCK_NETWORK_NODES[0]);
  const [temporalStep, setTemporalStep] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showBotOnly, setShowBotOnly] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);

  // Position nodes nicely on mount
  useEffect(() => {
    const width = 800;
    const height = 500;
    const centerX = width / 2;
    const centerY = height / 2;

    const initialized = MOCK_NETWORK_NODES.map((node, i) => {
      const angle = (i / MOCK_NETWORK_NODES.length) * 2 * Math.PI;
      const radius = 120 + (i % 3) * 60;
      return {
        ...node,
        x: centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 30,
        y: centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 30,
        vx: 0,
        vy: 0,
        radius: 12 + node.betweennessCentrality * 20
      };
    });
    setNodes(initialized);
  }, []);

  // Temporal animation playback
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTemporalStep((prev) => (prev >= 5 ? 1 : prev + 1));
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Force simulation tick & canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

      // Draw subtle grid
      ctx.strokeStyle = isDark ? '#26282a' : '#e5e7eb';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < canvas.width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Filter active nodes by temporal step & filters
      const activeNodes = nodes.filter((n) => {
        const isActiveAtStep = n.activeTimestamps.includes(temporalStep);
        if (!isActiveAtStep) return false;
        if (showBotOnly && n.botProbability < 0.5) return false;
        if (filterRole !== 'all' && n.role !== filterRole) return false;
        return true;
      });

      const activeNodeIds = new Set(activeNodes.map((n) => n.id));

      // Draw Edges
      edges.forEach((edge) => {
        if (!activeNodeIds.has(edge.source) || !activeNodeIds.has(edge.target)) return;
        const src = nodes.find((n) => n.id === edge.source);
        const tgt = nodes.find((n) => n.id === edge.target);
        if (!src || !tgt || src.x === undefined || tgt.x === undefined) return;

        ctx.beginPath();
        ctx.moveTo(src.x, src.y!);
        ctx.lineTo(tgt.x, tgt.y!);

        if (edge.type === 'retweet') {
          ctx.strokeStyle = isDark ? '#4d88ff' : '#003366';
          ctx.setLineDash([]);
        } else if (edge.type === 'reply') {
          ctx.strokeStyle = '#fe6500';
          ctx.setLineDash([4, 4]);
        } else {
          ctx.strokeStyle = isDark ? '#737780' : '#737780';
          ctx.setLineDash([2, 2]);
        }

        ctx.lineWidth = Math.max(1, edge.weight * 0.8);
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1.0;
      });

      // Draw Nodes
      activeNodes.forEach((node) => {
        if (node.x === undefined || node.y === undefined) return;

        const isSelected = selectedNode?.id === node.id;
        const isHovered = hoveredNode?.id === node.id;
        const r = node.radius || 14;

        // Glow on selected/hovered
        if (isSelected || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, r + 6, 0, 2 * Math.PI);
          ctx.fillStyle = isSelected ? 'rgba(254, 101, 0, 0.3)' : (isDark ? 'rgba(77, 136, 255, 0.3)' : 'rgba(0, 51, 102, 0.2)');
          ctx.fill();
        }

        // Base Circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);

        if (node.role === 'Bot') {
          ctx.fillStyle = '#E31E2E';
        } else if (node.role === 'Official') {
          ctx.fillStyle = isDark ? '#1a365d' : '#001e40';
        } else if (node.role === 'KOL') {
          ctx.fillStyle = '#fe6500';
        } else {
          ctx.fillStyle = isDark ? '#2b5797' : '#003366';
        }
        ctx.fill();

        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.strokeStyle = isDark ? '#121314' : '#ffffff';
        ctx.stroke();

        // Node Label
        ctx.fillStyle = isDark ? '#e3e3e3' : '#1a1c1c';
        ctx.font = 'bold 11px "Noto Sans", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + r + 14);

        // Subtext (Handle)
        ctx.fillStyle = isDark ? '#a8abb3' : '#737780';
        ctx.font = '9px monospace';
        ctx.fillText(node.username, node.x, node.y + r + 25);
      });

      animFrame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animFrame);
  }, [nodes, edges, selectedNode, hoveredNode, temporalStep, filterRole, showBotOnly]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const clicked = nodes.find((n) => {
      if (n.x === undefined || n.y === undefined) return false;
      const dist = Math.hypot(n.x - clickX, n.y - clickY);
      return dist <= (n.radius || 14) + 6;
    });

    if (clicked) {
      setSelectedNode(clicked);
      if (onSelectNode) onSelectNode(clicked);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const hover = nodes.find((n) => {
      if (n.x === undefined || n.y === undefined) return false;
      const dist = Math.hypot(n.x - mouseX, n.y - mouseY);
      return dist <= (n.radius || 14) + 6;
    });

    setHoveredNode(hover || null);
  };

  return (
    <div className="bg-surface border border-main p-4 flex flex-col gap-4 shadow-sm transition-colors duration-200">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-subtle pb-3">
        <div>
          <h3 className="font-serif-headline text-lg font-bold text-headline flex items-center gap-2">
            <span className="material-symbols-outlined text-brand">hub</span>
            <span>Link Analysis & Network Topology Map</span>
          </h3>
          <p className="text-xs text-muted">
            Component 3.5 &bull; High-Centrality Influencer Discovery & Coordinated Inauthentic Network Detection
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-navy"></span>
            <span className="text-primary font-medium">Official</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-saffron"></span>
            <span className="text-primary font-medium">KOL (High Centrality)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-brand"></span>
            <span className="text-primary font-medium">Amplifier</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-[#E31E2E]"></span>
            <span className="text-primary font-medium">Suspected Bot</span>
          </span>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Force Directed Canvas (2 Columns) */}
        <div className="lg:col-span-2 relative bg-subtle border border-main rounded overflow-hidden">
          <canvas
            ref={canvasRef}
            width={750}
            height={480}
            onClick={handleCanvasClick}
            onMouseMove={handleCanvasMouseMove}
            className="w-full h-[440px] cursor-pointer"
          />

          {/* Temporal Timeline Controller Overlay */}
          <div className="absolute bottom-3 left-3 right-3 bg-surface/95 backdrop-blur-xs p-3 border border-main rounded shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 bg-brand hover:bg-navy text-white rounded transition-colors flex items-center justify-center cursor-pointer"
                title={isPlaying ? 'Pause Timeline' : 'Play Propagation Animation'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <span className="text-xs font-bold text-navy">Propagation Step {temporalStep}/5</span>
            </div>

            <div className="flex-grow max-w-xs w-full flex items-center gap-2">
              <span className="text-[10px] text-muted font-mono">T-0h</span>
              <input
                type="range"
                min={1}
                max={5}
                value={temporalStep}
                onChange={(e) => setTemporalStep(parseInt(e.target.value))}
                className="w-full h-1.5 bg-subtle rounded-lg appearance-none cursor-pointer accent-brand"
              />
              <span className="text-[10px] text-muted font-mono">T-24h</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1.5 text-xs text-primary font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={showBotOnly}
                  onChange={(e) => setShowBotOnly(e.target.checked)}
                  className="rounded border-muted text-[#E31E2E] focus:ring-[#E31E2E]"
                />
                <span>Bot Clusters Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Selected Node Inspector (1 Column) */}
        <div className="bg-subtle border border-main p-4 flex flex-col justify-between rounded">
          {selectedNode ? (
            <div className="space-y-4">
              <div className="flex items-start justify-between border-b border-main pb-3">
                <div>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                    selectedNode.role === 'Bot'
                      ? 'bg-red-bg text-red font-bold'
                      : selectedNode.role === 'KOL'
                      ? 'bg-saffron-bg text-saffron-dark font-bold'
                      : selectedNode.role === 'Official'
                      ? 'bg-navy-light text-navy font-bold'
                      : 'bg-card text-secondary font-bold'
                  }`}>
                    {selectedNode.role}
                  </span>
                  <h4 className="font-serif-headline text-lg font-bold text-navy mt-1">
                    {selectedNode.label}
                  </h4>
                  <p className="text-xs text-muted font-mono">{selectedNode.username}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted">Platform</span>
                  <p className="text-xs font-bold text-brand uppercase">{selectedNode.platform}</p>
                </div>
              </div>

              {/* Node Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-surface p-2.5 border border-subtle rounded">
                  <span className="text-muted block text-[10px] uppercase">Betweenness Score</span>
                  <span className="text-sm font-bold text-brand">
                    {(selectedNode.betweennessCentrality * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bg-surface p-2.5 border border-subtle rounded">
                  <span className="text-muted block text-[10px] uppercase">Eigenvector Rank</span>
                  <span className="text-sm font-bold text-brand">
                    {(selectedNode.eigenvectorCentrality * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="bg-surface p-2.5 border border-subtle rounded">
                  <span className="text-muted block text-[10px] uppercase">Followers Reached</span>
                  <span className="text-sm font-bold text-primary">
                    {selectedNode.followers.toLocaleString()}
                  </span>
                </div>
                <div className={`p-2.5 border rounded ${
                  selectedNode.botProbability > 0.5
                    ? 'bg-red-bg border-red text-red'
                    : 'bg-surface border-subtle text-primary'
                }`}>
                  <span className="block text-[10px] uppercase">Bot Likelihood</span>
                  <span className="text-sm font-bold">
                    {(selectedNode.botProbability * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Dominant Polarity */}
              <div className="bg-surface p-3 border border-subtle rounded">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-secondary">Dominant Emotion Stance</span>
                  <span className="font-bold uppercase text-brand">{selectedNode.dominantSentiment}</span>
                </div>
                <div className="w-full bg-subtle h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      selectedNode.dominantSentiment === 'supportive' || selectedNode.dominantSentiment === 'excited'
                        ? 'bg-brand'
                        : selectedNode.dominantSentiment === 'sarcastic'
                        ? 'bg-saffron'
                        : 'bg-red'
                    }`}
                    style={{ width: `${selectedNode.betweennessCentrality * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => alert(`Node ${selectedNode.username} added to high-priority intelligence watchlist.`)}
                  className="w-full py-2 bg-brand hover:bg-navy text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[14px]">visibility</span>
                  <span>Monitor Narrative Stream</span>
                </button>
                {selectedNode.botProbability > 0.5 && (
                  <button
                    onClick={() => alert(`Node ${selectedNode.username} isolated and flagged in coordinated botnet registry.`)}
                    className="w-full py-2 bg-red hover:bg-red-hover text-white font-bold text-xs uppercase tracking-wider rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">block</span>
                    <span>Flag Coordinated Cluster</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-muted text-xs">
              <span className="material-symbols-outlined text-3xl mb-2">touch_app</span>
              <p>Click on any node in the graph to inspect centrality scores, follower reach, and propagation paths.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
