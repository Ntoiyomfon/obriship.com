'use client'

import { useEffect, useRef } from 'react'

interface Route {
  from: [number, number]
  to: [number, number]
  color: string
  speed: number
}

const CONTINENTS: [number, number][][] = [
  // North America
  [[70,-140],[72,-120],[70,-100],[60,-80],[50,-60],[45,-60],[43,-65],[40,-70],[35,-75],[30,-80],[25,-80],[20,-87],[15,-85],[10,-83],[8,-77],[10,-75],[12,-71],[15,-61],[18,-66],[20,-70],[22,-80],[25,-80],[28,-80],[30,-81],[35,-76],[40,-74],[45,-63],[50,-55],[55,-60],[58,-68],[60,-64],[65,-68],[68,-72],[70,-80],[72,-90],[74,-100],[74,-120],[72,-140],[70,-140]],
  // South America
  [[12,-72],[10,-62],[8,-60],[5,-52],[2,-50],[0,-50],[-5,-35],[-10,-37],[-15,-39],[-20,-40],[-25,-48],[-30,-50],[-33,-53],[-35,-57],[-38,-57],[-40,-62],[-45,-65],[-50,-68],[-55,-68],[-55,-64],[-52,-58],[-50,-55],[-45,-52],[-40,-48],[-35,-38],[-30,-35],[-25,-43],[-20,-40],[-15,-38],[-10,-38],[-5,-35],[0,-48],[5,-52],[8,-60],[10,-62],[12,-72]],
  // Europe
  [[70,30],[68,20],[65,14],[60,5],[57,8],[53,8],[50,2],[47,0],[45,8],[43,5],[38,0],[36,5],[36,14],[38,20],[40,28],[42,28],[45,30],[48,38],[50,30],[54,18],[56,10],[58,5],[62,5],[65,14],[68,20],[70,25],[72,28],[70,30]],
  // Africa
  [[37,10],[35,10],[30,32],[25,35],[15,42],[10,42],[5,40],[0,42],[-5,40],[-10,38],[-15,35],[-20,35],[-25,33],[-30,30],[-33,27],[-35,20],[-33,17],[-30,16],[-25,14],[-20,12],[-15,11],[-10,14],[-5,8],[0,8],[5,1],[10,-5],[15,-17],[20,-16],[25,-15],[30,-9],[35,0],[37,10]],
  // Asia
  [[70,30],[70,60],[72,80],[70,100],[68,130],[65,140],[60,140],[55,130],[50,140],[45,135],[40,130],[35,128],[30,120],[25,121],[20,110],[15,108],[10,104],[5,100],[0,104],[5,115],[10,124],[15,120],[20,110],[25,119],[30,120],[35,118],[40,116],[45,120],[50,130],[55,130],[60,130],[65,140],[68,165],[68,180],[65,170],[60,160],[55,160],[50,160],[45,150],[40,145],[35,136],[30,130],[25,121],[20,110],[15,100],[10,98],[5,100],[0,108],[5,116],[10,124],[15,120],[20,110],[25,115],[30,118],[35,120],[40,120],[45,132],[50,138],[55,130],[60,130],[65,140],[70,140],[72,120],[74,100],[74,80],[70,60],[68,50],[65,40],[60,30],[55,25],[50,28],[45,30],[42,28],[45,30],[50,30],[55,25],[60,28],[65,30],[70,30]],
  // Australia
  [[-15,130],[-17,136],[-20,138],[-25,135],[-30,130],[-33,122],[-35,117],[-33,114],[-30,115],[-25,113],[-20,116],[-17,122],[-15,124],[-14,130],[-15,136],[-20,140],[-25,153],[-28,153],[-33,151],[-37,149],[-38,146],[-37,140],[-35,136],[-32,133],[-30,130],[-28,114],[-22,114],[-17,122],[-15,130]],
  // Greenland
  [[83,-30],[80,-20],[76,-18],[72,-22],[70,-24],[68,-30],[66,-38],[68,-46],[70,-52],[72,-56],[74,-60],[76,-68],[78,-72],[80,-62],[82,-45],[84,-30],[83,-30]],
]

const CITIES: [number, number][] = [
  [51.5,-0.1],[40.7,-74.0],[1.3,103.8],[48.8,2.3],
  [35.6,139.7],[-33.8,151.2],[19.4,-99.1],[-23.5,-46.6],
  [55.7,37.6],[31.2,121.5],[-1.3,36.8],[30.0,31.2],
  [28.6,77.2],[6.5,3.4],[23.1,-82.4],
]

const ROUTES: Route[] = [
  { from: [51.5, -0.1],  to: [40.7, -74.0],  color: '#E8FF47',                speed: 0.0016 },
  { from: [1.3, 103.8],  to: [48.8, 2.3],    color: 'rgba(255,255,255,0.55)', speed: 0.0012 },
  { from: [35.6, 139.7], to: [-33.8, 151.2], color: 'rgba(255,255,255,0.38)', speed: 0.0014 },
  { from: [19.4, -99.1], to: [-23.5, -46.6], color: 'rgba(255,255,255,0.3)',  speed: 0.001  },
]

export default function GlobeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const currentCanvas = canvasRef.current
    if (!currentCanvas) return
    const canvas = currentCanvas
    const currentCtx = canvas.getContext('2d')
    if (!currentCtx) return
    const ctx = currentCtx

    let animId: number
    let rotY = 0.3

    const ACCENT = '#E8FF47'
    const LAND = 'rgba(255,255,255,0.11)'
    const LAND_STROKE = 'rgba(255,255,255,0.22)'
    const MESH = 'rgba(255,255,255,0.045)'

    const progress = ROUTES.map(() => Math.random() * 0.6)

    function resize() {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function getDims() {
      return {
        CX: canvas.width * 0.55,
        CY: canvas.height / 2,
        R: Math.min(canvas.width, canvas.height) * 0.42,
      }
    }

    function latLngTo3D(lat: number, lng: number, lngOffset: number) {
      const lo = (lng + lngOffset) * Math.PI / 180
      const la = lat * Math.PI / 180
      return {
        x: Math.cos(la) * Math.cos(lo),
        y: Math.sin(la),
        z: Math.cos(la) * Math.sin(lo),
      }
    }

    function project(x: number, y: number, z: number) {
      const { CX, CY, R } = getDims()
      const cosR = Math.cos(rotY), sinR = Math.sin(rotY)
      const rx = x * cosR + z * sinR
      const rz = -x * sinR + z * cosR
      const scale = (rz + 2.6) / 3.6
      return {
        sx: CX + rx * R * scale,
        sy: CY - y * R * scale,
        visible: rz > -0.15,
      }
    }

    function drawGlobeEdge() {
      const { CX, CY, R } = getDims()
      ctx.beginPath()
      ctx.arc(CX, CY, R, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.08)'
      ctx.lineWidth = 1
      ctx.stroke()
    }

    function drawMesh(lngOffset: number) {
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath()
        let first = true
        for (let lng = -180; lng <= 180; lng += 4) {
          const p3 = latLngTo3D(lat, lng, lngOffset)
          const p = project(p3.x, p3.y, p3.z)
          if (p.visible) {
            if (first) { ctx.moveTo(p.sx, p.sy); first = false }
            else ctx.lineTo(p.sx, p.sy)
          } else first = true
        }
        ctx.strokeStyle = MESH
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      for (let lng = 0; lng < 360; lng += 40) {
        ctx.beginPath()
        let first = true
        for (let lat = -85; lat <= 85; lat += 3) {
          const p3 = latLngTo3D(lat, lng, lngOffset)
          const p = project(p3.x, p3.y, p3.z)
          if (p.visible) {
            if (first) { ctx.moveTo(p.sx, p.sy); first = false }
            else ctx.lineTo(p.sx, p.sy)
          } else first = true
        }
        ctx.strokeStyle = MESH
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    function drawContinent(points: [number, number][], lngOffset: number) {
      ctx.beginPath()
      let started = false
      let lastVis = false
      for (const [lat, lng] of points) {
        const p3 = latLngTo3D(lat, lng, lngOffset)
        const p = project(p3.x, p3.y, p3.z)
        if (p.visible) {
          if (!started || !lastVis) { ctx.moveTo(p.sx, p.sy); started = true }
          else ctx.lineTo(p.sx, p.sy)
          lastVis = true
        } else {
          lastVis = false
        }
      }
      ctx.closePath()
      ctx.fillStyle = LAND
      ctx.fill()
      ctx.strokeStyle = LAND_STROKE
      ctx.lineWidth = 0.7
      ctx.stroke()
    }

    function slerp(
      p1: { x: number; y: number; z: number },
      p2: { x: number; y: number; z: number },
      t: number
    ) {
      const dot = Math.max(-1, Math.min(1, p1.x*p2.x + p1.y*p2.y + p1.z*p2.z))
      const omega = Math.acos(dot)
      if (Math.abs(omega) < 0.0001) return p1
      const s = Math.sin(omega)
      return {
        x: (Math.sin((1-t)*omega)/s)*p1.x + (Math.sin(t*omega)/s)*p2.x,
        y: (Math.sin((1-t)*omega)/s)*p1.y + (Math.sin(t*omega)/s)*p2.y,
        z: (Math.sin((1-t)*omega)/s)*p1.z + (Math.sin(t*omega)/s)*p2.z,
      }
    }

    function drawRoute(route: Route, t: number, lngOffset: number) {
      const p3a = latLngTo3D(route.from[0], route.from[1], lngOffset)
      const p3b = latLngTo3D(route.to[0], route.to[1], lngOffset)
      const steps = 90
      const drawSteps = Math.floor(t * steps)

      ctx.beginPath()
      let first = true
      let lastVis: { sx: number; sy: number } | null = null

      for (let i = 0; i <= drawSteps; i++) {
        const interp = slerp(p3a, p3b, i / steps)
        const p = project(interp.x, interp.y, interp.z)
        if (p.visible) {
          if (first || !lastVis) { ctx.moveTo(p.sx, p.sy); first = false }
          else ctx.lineTo(p.sx, p.sy)
          lastVis = p
        } else { first = true; lastVis = null }
      }

      ctx.strokeStyle = route.color
      ctx.lineWidth = route.color === ACCENT ? 2 : 1.3
      ctx.setLineDash([])
      ctx.stroke()

      const pa = project(p3a.x, p3a.y, p3a.z)
      if (pa.visible) {
        ctx.beginPath()
        ctx.arc(pa.sx, pa.sy, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = route.color
        ctx.fill()
      }

      if (lastVis && drawSteps > 0) {
        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.005)
        const r = route.color === ACCENT ? 5 + pulse * 2.5 : 3.5 + pulse
        if (route.color === ACCENT) {
          ctx.beginPath()
          ctx.arc(lastVis.sx, lastVis.sy, r + 5, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(232,255,71,0.18)'
          ctx.lineWidth = 1.5
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(lastVis.sx, lastVis.sy, r + 2, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(232,255,71,0.3)'
          ctx.lineWidth = 1
          ctx.stroke()
        }
        ctx.beginPath()
        ctx.arc(lastVis.sx, lastVis.sy, r, 0, Math.PI * 2)
        ctx.fillStyle = route.color
        ctx.fill()
      }

      if (t > 0.95) {
        const pb = project(p3b.x, p3b.y, p3b.z)
        if (pb.visible) {
          ctx.beginPath()
          ctx.arc(pb.sx, pb.sy, 4, 0, Math.PI * 2)
          ctx.fillStyle = route.color
          ctx.fill()
        }
      }
    }

    function drawCities(lngOffset: number) {
      for (const [lat, lng] of CITIES) {
        const p3 = latLngTo3D(lat, lng, lngOffset)
        const p = project(p3.x, p3.y, p3.z)
        if (p.visible) {
          ctx.beginPath()
          ctx.arc(p.sx, p.sy, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,255,255,0.35)'
          ctx.fill()
        }
      }
    }

    function drawFrame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const lngOffset = rotY * 180 / Math.PI
      drawGlobeEdge()
      drawMesh(lngOffset)
      CONTINENTS.forEach(pts => drawContinent(pts, lngOffset))
      drawCities(lngOffset)
      ROUTES.forEach((route, i) => {
        progress[i] = (progress[i] + route.speed) % 1.08
        drawRoute(route, Math.min(progress[i], 1), lngOffset)
      })
      rotY += 0.0007
      animId = requestAnimationFrame(drawFrame)
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ro = new ResizeObserver(() => { resize() })
    ro.observe(canvas)
    resize()

    if (!prefersReduced) {
      drawFrame()
    } else {
      const lngOffset = rotY * 180 / Math.PI
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGlobeEdge()
      drawMesh(lngOffset)
      CONTINENTS.forEach(pts => drawContinent(pts, lngOffset))
      drawCities(lngOffset)
    }

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ display: 'block' }}
      aria-label="Animated globe showing live shipment routes across the world"
      role="img"
    />
  )
}
