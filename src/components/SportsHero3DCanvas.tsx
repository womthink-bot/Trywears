import React, { useEffect, useRef, useState } from "react";
import { Rotate3d, Eye, Sparkles, Layers, Box, Cpu } from "lucide-react";

interface SportsHero3DCanvasProps {
  interactive?: boolean;
}

export const SportsHero3DCanvas: React.FC<SportsHero3DCanvasProps> = ({ interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wireframeMode, setWireframeMode] = useState<"hologram" | "carbon" | "gold">("hologram");
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0.2, y: 0.5 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // 3D Glove / Polygonal Combat Core Geometry Nodes
    // Defining 3D vertices for an aerodynamic 3D boxing glove & armor polygon mesh
    const vertices: [number, number, number][] = [
      // Wrist cuff (base)
      [-40, 100, -25], [40, 100, -25], [45, 100, 25], [-35, 100, 25],
      [-45, 40, -35],  [45, 40, -35],  [50, 40, 30],  [-40, 40, 30],
      // Main fist body & knuckle padding
      [-65, -30, -50], [65, -30, -50], [70, -30, 45], [-60, -30, 45],
      [-55, -90, -40], [55, -90, -40], [60, -90, 35], [-50, -90, 35],
      // Fist peak apex
      [-25, -120, -15], [25, -120, -15], [30, -120, 20], [-20, -120, 20],
      // Ergonomic thumb pod
      [75, -10, 20],   [95, -20, 25],   [90, -50, 20],  [65, -45, 15]
    ];

    // Polygon Faces / Edges linking the 3D vertices
    const edges: [number, number][] = [
      // Cuff ring
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
      // Mid fist
      [8, 9], [9, 10], [10, 11], [11, 8],
      [4, 8], [5, 9], [6, 10], [7, 11],
      // Knuckle shock-shield
      [12, 13], [13, 14], [14, 15], [15, 12],
      [8, 12], [9, 13], [10, 14], [11, 15],
      // Crown apex
      [16, 17], [17, 18], [18, 19], [19, 16],
      [12, 16], [13, 17], [14, 18], [15, 19],
      // Thumb arm
      [10, 20], [20, 21], [21, 22], [22, 23], [23, 9],
      [14, 22], [6, 20]
    ];

    // Ambient floating 3D depth particles
    const particles = Array.from({ length: 45 }, () => ({
      x: (Math.random() - 0.5) * 600,
      y: (Math.random() - 0.5) * 600,
      z: (Math.random() - 0.5) * 600,
      size: Math.random() * 2 + 1,
      speedY: Math.random() * 0.4 + 0.1
    }));

    let currentRotX = rotation.x;
    let currentRotY = rotation.y;
    let autoRotSpeed = 0.008;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Auto rotation if not user-dragging
      if (!isDragging) {
        currentRotY += autoRotSpeed;
      } else {
        currentRotX = rotation.x;
        currentRotY = rotation.y;
      }

      const cx = width / 2;
      const cy = height / 2;
      const fov = 420;

      // Draw background 3D particles in space
      ctx.fillStyle = wireframeMode === "gold" ? "#F59E0B" : wireframeMode === "carbon" ? "#94A3B8" : "#E21D1D";
      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < -300) p.y = 300;

        // Rotate particle in 3D
        const cosY = Math.cos(currentRotY * 0.4);
        const sinY = Math.sin(currentRotY * 0.4);
        const rx = p.x * cosY - p.z * sinY;
        const rz = p.z * cosY + p.x * sinY + 450;

        if (rz > 0) {
          const scale = fov / rz;
          const sx = cx + rx * scale;
          const sy = cy + p.y * scale;

          ctx.beginPath();
          ctx.arc(sx, sy, p.size * scale * 0.8, 0, Math.PI * 2);
          ctx.globalAlpha = Math.min(Math.max((rz - 200) / 400, 0.1), 0.6);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // Project 3D vertices to 2D screen coordinates
      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      const projected = vertices.map(([vx, vy, vz]) => {
        // Rotate around Y
        const x1 = vx * cosY - vz * sinY;
        const z1 = vz * cosY + vx * sinY;

        // Rotate around X
        const y2 = vy * cosX - z1 * sinX;
        const z2 = z1 * cosX + vy * sinX + 380; // Distance to camera

        const scale = fov / Math.max(z2, 50);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale
        };
      });

      // Style configurations
      let edgeColor = "#E21D1D";
      let nodeColor = "#FFFFFF";
      let glowColor = "rgba(226, 29, 29, 0.4)";

      if (wireframeMode === "gold") {
        edgeColor = "#F59E0B";
        nodeColor = "#FEF3C7";
        glowColor = "rgba(245, 158, 11, 0.35)";
      } else if (wireframeMode === "carbon") {
        edgeColor = "#64748B";
        nodeColor = "#E2E8F0";
        glowColor = "rgba(100, 116, 139, 0.3)";
      }

      // Draw wireframe connecting 3D edges
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = edgeColor;
      ctx.shadowColor = glowColor;
      ctx.shadowBlur = 12;

      edges.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];

        // Depth cueing
        const avgZ = (p1.z + p2.z) / 2;
        const alpha = Math.max(0.2, Math.min(1, (600 - avgZ) / 400));
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw interactive glowing 3D nodes (joints)
      projected.forEach((p) => {
        ctx.globalAlpha = Math.max(0.3, Math.min(1, (600 - p.z) / 400));
        ctx.fillStyle = nodeColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0;

      // Draw 3D coordinate orbital ring
      ctx.beginPath();
      ctx.ellipse(cx, cy + 130, 160, 45, 0, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.setLineDash([]);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [rotation, isDragging, wireframeMode]);

  // Mouse & Touch 3D Drag Rotation Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-1.2, Math.min(1.2, prev.x + dy * 0.008)),
      y: prev.y + dx * 0.008
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden group">
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing z-10"
      />

      {/* Floating 3D Interaction Control HUD */}
      <div className="absolute top-6 right-6 z-20 flex flex-col gap-2">
        <div className="bg-black/70 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex flex-col gap-1.5 shadow-xl">
          <span className="text-[9px] font-mono text-neutral-400 font-bold px-2 py-0.5 uppercase tracking-wider text-center">
            3D FINISH
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setWireframeMode("hologram")}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                wireframeMode === "hologram"
                  ? "bg-[#E21D1D] text-white shadow-md shadow-[#E21D1D]/30"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              Holo Neon
            </button>
            <button
              onClick={() => setWireframeMode("carbon")}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                wireframeMode === "carbon"
                  ? "bg-neutral-300 text-black shadow-md"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              Carbon
            </button>
            <button
              onClick={() => setWireframeMode("gold")}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-mono font-bold uppercase transition-all cursor-pointer ${
                wireframeMode === "gold"
                  ? "bg-amber-500 text-black shadow-md shadow-amber-500/30 font-black"
                  : "bg-neutral-900 text-neutral-400 hover:text-white"
              }`}
            >
              Gold Champ
            </button>
          </div>
        </div>
      </div>

      {/* 3D Holographic Base Plate */}
      <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-[10px] font-mono text-neutral-300">
          <Rotate3d className="w-3.5 h-3.5 text-[#E21D1D] animate-spin" />
          <span className="font-bold text-white uppercase tracking-wider">
            DRAG MOUSE TO ROTATE 360° IN 3D
          </span>
        </div>
      </div>
    </div>
  );
};
