'use client';

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type Post from "@/interfaces/post";

type Props = {
  posts: Post[];
};

type PostPosition = {
  post: Post;
  y: number;
  height: number;
};

type Vec3 = [number, number, number];

export default function Canvas({ posts }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const ctx = useRef<CanvasRenderingContext2D | null>(null);
  const postPositions = useRef<PostPosition[]>([]);
  const router = useRouter();
  const animationFrame = useRef<number>();
  const time = useRef<number>(0);

  // ベクトル演算
  const vec3Sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const vec3Add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const vec3Mul = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
  const vec3Dot = (a: Vec3, b: Vec3): number => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const vec3Length = (a: Vec3): number => Math.sqrt(vec3Dot(a, a));
  const vec3Normalize = (a: Vec3): Vec3 => {
    const len = vec3Length(a);
    return len > 0 ? vec3Mul(a, 1 / len) : [0, 0, 0];
  };

  // 距離関数（球）
  const sdSphere = (p: Vec3, center: Vec3, radius: number): number => {
    return vec3Length(vec3Sub(p, center)) - radius;
  };

  // 距離関数（複数のオブジェクトの最小値）
  const sceneSDF = (p: Vec3, time: number): number => {
    const sphere1: Vec3 = [Math.sin(time * 0.5) * 2, Math.cos(time * 0.3) * 1.5, 0];
    const sphere2: Vec3 = [Math.cos(time * 0.4) * 2, Math.sin(time * 0.6) * 1.5, 0];
    const d1 = sdSphere(p, sphere1, 0.8);
    const d2 = sdSphere(p, sphere2, 0.6);
    return Math.min(d1, d2);
  };

  // 法線計算
  const calculateNormal = (p: Vec3, time: number): Vec3 => {
    const eps = 0.001;
    const dx = sceneSDF([p[0] + eps, p[1], p[2]], time) - sceneSDF([p[0] - eps, p[1], p[2]], time);
    const dy = sceneSDF([p[0], p[1] + eps, p[2]], time) - sceneSDF([p[0], p[1] - eps, p[2]], time);
    const dz = sceneSDF([p[0], p[1], p[2] + eps], time) - sceneSDF([p[0], p[1], p[2] - eps], time);
    return vec3Normalize([dx, dy, dz]);
  };

  // レイマーチング
  const raymarch = (ro: Vec3, rd: Vec3, time: number): number => {
    let t = 0;
    const maxSteps = 100;
    const maxDist = 20;
    const minDist = 0.001;

    for (let i = 0; i < maxSteps; i++) {
      const p = vec3Add(ro, vec3Mul(rd, t));
      const d = sceneSDF(p, time);
      
      if (d < minDist) {
        return t;
      }
      
      t += d;
      
      if (t > maxDist) {
        break;
      }
    }
    
    return -1;
  };

  useEffect(() => {
    if (canvas.current) {
      ctx.current = canvas.current.getContext("2d");
      
      const render = () => {
        if (!canvas.current || !ctx.current) return;
        
        const container = canvas.current.parentElement;
        if (!container) return;
        
        const containerWidth = container.clientWidth;
        const containerHeight = (containerWidth * 2) / 3;
        canvas.current.width = containerWidth;
        canvas.current.height = containerHeight;
        
        const imageData = ctx.current.createImageData(containerWidth, containerHeight);
        const data = imageData.data;
        
        // カメラ設定
        const cameraPos: Vec3 = [0, 0, -5];
        const lightPos: Vec3 = [2, 3, -2];
        
        time.current += 0.016; // 約60fps
        
        // レイマーチングで各ピクセルを描画
        for (let y = 0; y < containerHeight; y++) {
          for (let x = 0; x < containerWidth; x++) {
            const u = (x / containerWidth) * 2 - 1;
            const v = ((containerHeight - y) / containerHeight) * 2 - 1;
            const aspect = containerWidth / containerHeight;
            
            // レイの方向
            const rd: Vec3 = vec3Normalize([u * aspect, v, 1]);
            
            // レイマーチング
            const t = raymarch(cameraPos, rd, time.current);
            
            let r = 0, g = 0, b = 0;
            
            if (t > 0) {
              // ヒットした場合、ライティング計算
              const hitPoint = vec3Add(cameraPos, vec3Mul(rd, t));
              const normal = calculateNormal(hitPoint, time.current);
              const lightDir = vec3Normalize(vec3Sub(lightPos, hitPoint));
              const diff = Math.max(0, vec3Dot(normal, lightDir));
              
              // アンビエント + ディフューズ
              const ambient = 0.2;
              const intensity = ambient + diff * 0.8;
              
              // 色を設定（青系）
              r = Math.floor(50 * intensity);
              g = Math.floor(100 * intensity);
              b = Math.floor(200 * intensity);
            } else {
              // 背景色（グラデーション）
              const bgIntensity = (v + 1) * 0.5;
              r = Math.floor(10 * bgIntensity);
              g = Math.floor(10 * bgIntensity);
              b = Math.floor(20 * bgIntensity);
            }
            
            const idx = (y * containerWidth + x) * 4;
            data[idx] = r;
            data[idx + 1] = g;
            data[idx + 2] = b;
            data[idx + 3] = 255;
          }
        }
        
        ctx.current.putImageData(imageData, 0, 0);
        
        // Postsを描画（半透明の背景付き）
        ctx.current.fillStyle = "rgba(0, 0, 0, 0.7)";
        const padding = 20;
        const lineHeight = 24;
        let textY = padding + lineHeight;
        
        postPositions.current = [];
        
        posts.forEach((post) => {
          if (textY + lineHeight > containerHeight - padding) {
            return;
          }
          
          const startY = textY - lineHeight;
          ctx.current!.fillStyle = "#FFFFFF";
          ctx.current!.font = "16px sans-serif";
          ctx.current!.fillText(post.title, padding, textY);
          
          postPositions.current.push({
            post,
            y: startY,
            height: lineHeight + 8,
          });
          
          textY += lineHeight + 8;
        });
      };

      const animate = () => {
        render();
        animationFrame.current = requestAnimationFrame(animate);
      };

      const handleClick = (event: MouseEvent) => {
        if (!canvas.current) return;
        
        const rect = canvas.current.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const clickedPost = postPositions.current.find((pos) => {
          return y >= pos.y && y <= pos.y + pos.height;
        });
        
        if (clickedPost) {
          router.push(`/${clickedPost.post.slug}`);
        }
      };

      animate();
      window.addEventListener("resize", render);
      canvas.current.addEventListener("click", handleClick);

      return () => {
        if (animationFrame.current) {
          cancelAnimationFrame(animationFrame.current);
        }
        window.removeEventListener("resize", render);
        canvas.current?.removeEventListener("click", handleClick);
      };
    }
  }, [posts, router]);

  return (
    <canvas 
      ref={canvas} 
      id="canvas" 
      style={{ width: "100%", aspectRatio: "3/2", cursor: "pointer" }}
    ></canvas>
  );
}
