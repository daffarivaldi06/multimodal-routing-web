"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import type { RoutingResult, RouteLeg } from "@/types/api";

// Fix Leaflet default icon path (broken by Webpack asset hashing)
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// ── Color Configuration for Transport Modes ──
const MODE_COLORS: Record<string, string> = {
  walk:  "#94a3b8", // Slate
  bike:  "#f59e0b", // Amber
  bus:   "#3b82f6", // Blue
  metro: "#8b5cf6", // Violet
  tram:  "#06b6d4", // Cyan
  train: "#10b981", // Emerald
};

// ── Custom Marker Factories ──
function makeDotIcon(color: string, size = 14) {
  return L.divIcon({
    className: "custom-dot-marker",
    html: `
      <div style="
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:${color};
        border:2.5px solid rgba(255,255,255,0.95);
        box-shadow:0 0 10px ${color}80, 0 2px 8px rgba(0,0,0,0.6);
        transition: transform 0.2s ease;
      "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function makePinIcon(color: string, label: string, emoji: string) {
  return L.divIcon({
    className: "custom-pin-marker",
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;">
        <div style="
          padding: 3px 8px;
          border-radius: 9999px;
          background: rgba(18, 18, 20, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
          font-family: system-ui, sans-serif;
          font-size: 11px;
          font-weight: 600;
          color: #f4f4f5;
          white-space: nowrap;
          box-shadow: 0 4px 14px rgba(0,0,0,0.5);
          margin-bottom: 4px;
        ">${emoji} ${label}</div>
        <div style="
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${color};
          border: 3px solid #ffffff;
          box-shadow: 0 0 12px ${color}, 0 2px 8px rgba(0,0,0,0.6);
        "></div>
      </div>`,
    iconSize: [120, 48],
    iconAnchor: [60, 44],
    popupAnchor: [0, -44],
  });
}

// ── Controller for Invalidate Size & Bounds Fitting ──
function MapViewController({ positions }: { positions: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 200);
    return () => clearTimeout(timer);
  }, [map]);

  useEffect(() => {
    if (!positions || positions.length === 0) return;

    if (positions.length === 1) {
      map.setView(positions[0], 14, { animate: true });
    } else {
      const bounds = L.latLngBounds(positions.map((p) => L.latLng(p[0], p[1])));
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 15,
        animate: true,
      });
    }
  }, [map, positions]);

  return null;
}

// ── Main LeafletMap Component ──
export interface LeafletMapProps {
  result: RoutingResult;
}

export function LeafletMap({ result }: LeafletMapProps) {
  const { legs = [], origin = "Origin", destination = "Destination", bikeOptions = [] } = result || {};

  // Extract all points and segments with spatial coordinates
  const { allPoints, legSegments, waypoints } = useMemo(() => {
    const points: [number, number][] = [];
    const segments: Array<{
      positions: [number, number][];
      mode: string;
      line?: string;
      operator?: string;
      from: string;
      to: string;
    }> = [];
    const wpList: Array<{
      pos: [number, number];
      label: string;
      mode: string;
      line?: string;
      operator?: string;
      type: "origin" | "transfer" | "destination";
    }> = [];

    legs.forEach((leg, index) => {
      const segCoords: [number, number][] = [];

      if (leg.originCoords?.lat && leg.originCoords?.lng) {
        const originPos: [number, number] = [leg.originCoords.lat, leg.originCoords.lng];
        segCoords.push(originPos);
        points.push(originPos);

        wpList.push({
          pos: originPos,
          label: leg.from,
          mode: leg.mode,
          line: leg.line,
          operator: leg.operator,
          type: index === 0 ? "origin" : "transfer",
        });
      }

      if (leg.destinationCoords?.lat && leg.destinationCoords?.lng) {
        const destPos: [number, number] = [leg.destinationCoords.lat, leg.destinationCoords.lng];
        segCoords.push(destPos);
        points.push(destPos);

        if (index === legs.length - 1) {
          wpList.push({
            pos: destPos,
            label: leg.to,
            mode: leg.mode,
            type: "destination",
          });
        }
      }

      if (segCoords.length > 0) {
        segments.push({
          positions: segCoords,
          mode: leg.mode,
          line: leg.line,
          operator: leg.operator,
          from: leg.from,
          to: leg.to,
        });
      }
    });

    return { allPoints: points, legSegments: segments, waypoints: wpList };
  }, [legs]);

  // Default center (Lille / Valenciennes area)
  const defaultCenter: [number, number] = [50.6292, 3.0573];
  const center: [number, number] = allPoints.length > 0 ? allPoints[0] : defaultCenter;

  const firstLeg = legs[0] as RouteLeg | undefined;
  const lastLeg = legs[legs.length - 1] as RouteLeg | undefined;

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "100%", width: "100%", minHeight: "600px" }}
      className="w-full h-full z-0 dark-map-container"
      zoomControl={true}
    >
      <MapViewController positions={allPoints} />

      {/* 100% Free OpenStreetMap Dark Mode Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        maxZoom={19}
        className="dark-map-tiles"
      />

      {/* ── Segment Polylines per transport mode ── */}
      {legSegments.map((seg, idx) => {
        const modeColor = MODE_COLORS[seg.mode] ?? "#6366f1";
        return (
          <Polyline
            key={`segment-${idx}`}
            positions={seg.positions}
            pathOptions={{
              color: modeColor,
              weight: seg.mode === "walk" ? 4 : 5,
              opacity: 0.9,
              dashArray: seg.mode === "walk" ? "6 8" : undefined,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        );
      })}

      {/* ── Overall Connecting Route Line (Subtle backdrop) ── */}
      {allPoints.length > 1 && (
        <Polyline
          positions={allPoints}
          pathOptions={{
            color: "#6366f1",
            weight: 8,
            opacity: 0.25,
            lineCap: "round",
          }}
        />
      )}

      {/* ── Intermediate Waypoints / Transfer Stops ── */}
      {waypoints
        .filter((w) => w.type === "transfer")
        .map((m, i) => (
          <Marker
            key={`transfer-${i}`}
            position={m.pos}
            icon={makeDotIcon(MODE_COLORS[m.mode] ?? "#94a3b8", 14)}
          >
            <Popup>
              <div className="text-xs font-sans p-1">
                <div className="font-semibold text-zinc-100 text-sm mb-1">{m.label}</div>
                {m.line && (
                  <div className="inline-block px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[11px] font-mono mb-1">
                    {m.line}
                  </div>
                )}
                {m.operator && (
                  <div className="text-zinc-400 text-[11px]">Operator: {m.operator}</div>
                )}
                <div className="text-zinc-500 text-[10px] mt-1 capitalize">Mode: {m.mode}</div>
              </div>
            </Popup>
          </Marker>
        ))}

      {/* ── Origin Pin Marker ── */}
      {firstLeg?.originCoords && (
        <Marker
          position={[firstLeg.originCoords.lat, firstLeg.originCoords.lng]}
          icon={makePinIcon("#10b981", origin, "📍")}
        >
          <Popup>
            <div className="text-xs font-sans p-1">
              <div className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                Departure (Origin)
              </div>
              <div className="font-semibold text-zinc-100 text-sm">{origin}</div>
              <div className="text-zinc-400 text-[11px] mt-1">Starting point of your multimodal journey</div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* ── Destination Pin Marker ── */}
      {lastLeg?.destinationCoords && (
        <Marker
          position={[lastLeg.destinationCoords.lat, lastLeg.destinationCoords.lng]}
          icon={makePinIcon("#6366f1", destination, "🏁")}
        >
          <Popup>
            <div className="text-xs font-sans p-1">
              <div className="text-indigo-400 font-bold uppercase tracking-wider text-[10px] mb-1">
                Arrival (Destination)
              </div>
              <div className="font-semibold text-zinc-100 text-sm">{destination}</div>
              <div className="text-zinc-400 text-[11px] mt-1">Final destination</div>
            </div>
          </Popup>
        </Marker>
      )}

      {/* ── Bike Station Options (if any) ── */}
      {bikeOptions.map((bike) => (
        <Marker
          key={`bike-${bike.id}`}
          position={[50.6365, 3.0636]} // Fallback or dynamic
          icon={makeDotIcon("#f59e0b", 12)}
        >
          <Popup>
            <div className="text-xs font-sans p-1">
              <div className="font-semibold text-amber-400">{bike.name}</div>
              <div className="text-zinc-300">Bikes available: {bike.availableBikes} / {bike.totalSlots}</div>
              <div className="text-zinc-500 text-[10px]">Provider: {bike.provider}</div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LeafletMap;
