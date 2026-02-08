"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CameraViewport } from "@/components/scanner/camera-viewport";
import { ArOverlay } from "@/components/scanner/ar-overlay";
import { DetectionHud } from "@/components/scanner/detection-hud";
import { SpatialMeasurementOverlay } from "@/components/scanner/spatial-measurement-overlay";
import { DeviceOrientationWarning } from "@/components/scanner/device-orientation-warning";
import { ScanControls } from "@/components/scanner/scan-controls";
import { LiveDetectionPanel } from "@/components/scanner/live-detection-panel";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { mockDetectedObjects } from "@/data/mock-detected-objects";
import { mockSpatialMeasurements } from "@/data/mock-spatial-measurements";
import { DetectedObject, ScanSession, SpatialMeasurement } from "@/lib/types";

// Pool of objects to randomly pick from during scan
const objectPool = mockDetectedObjects.filter((o) => o.scanId === "scan_001" || o.scanId === "scan_002" || o.scanId === "scan_003");

const MAX_OBJECTS = 12;

export default function ScannerPage() {
  const router = useRouter();
  const [scanning, setScanning] = useState(false);
  const [detectedObjects, setDetectedObjects] = useState<DetectedObject[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [calibrating, setCalibrating] = useState(false);
  const [showOrientationWarning, setShowOrientationWarning] = useState(false);
  const [scans, setScans] = useLocalStorage<ScanSession[]>("scans", []);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const detectionRef = useRef<NodeJS.Timeout | null>(null);
  const scanStartRef = useRef<string>("");
  const usedIndicesRef = useRef<Set<number>>(new Set());

  const avgConfidence = detectedObjects.length > 0
    ? detectedObjects.reduce((sum, o) => sum + o.confidence, 0) / detectedObjects.length
    : 0;

  // Build spatial measurements for currently detected objects
  const activeMeasurements: SpatialMeasurement[] = mockSpatialMeasurements.filter(
    (m) =>
      detectedObjects.some((o) => o.id === m.fromObjectId) &&
      detectedObjects.some((o) => o.id === m.toObjectId)
  );

  const stopScan = useCallback(() => {
    // Clear timers
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (detectionRef.current) {
      clearInterval(detectionRef.current);
      detectionRef.current = null;
    }

    setScanning(false);

    // If we have detected objects, save the session
    if (detectedObjects.length > 0) {
      const newScanId = `scan_live_${Date.now()}`;
      const newScan: ScanSession = {
        id: newScanId,
        name: `Live Scan ${new Date().toLocaleTimeString()}`,
        location: "Current Location",
        sport: "multi-sport",
        status: "completed",
        date: scanStartRef.current,
        duration: elapsedSeconds,
        objectsDetected: detectedObjects.length,
        avgConfidence,
        qualityScore: Math.round(avgConfidence * 100),
        device: "iPhone 15 Pro Max",
      };

      setScans((prev: ScanSession[]) => [newScan, ...prev]);

      // Navigate to the results detail page
      setTimeout(() => {
        router.push(`/results/${newScanId}`);
      }, 500);
    }
  }, [detectedObjects, elapsedSeconds, avgConfidence, setScans, router]);

  const startScan = useCallback(() => {
    setDetectedObjects([]);
    setElapsedSeconds(0);
    usedIndicesRef.current = new Set();
    scanStartRef.current = new Date().toISOString();
    setScanning(true);
    setShowOrientationWarning(false);

    // Timer
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev >= 29) {
          // Auto-stop after 30 seconds
          return prev + 1;
        }
        return prev + 1;
      });
    }, 1000);

    // Detection simulation - add objects every 1-2 seconds
    const addObject = () => {
      setDetectedObjects((prev) => {
        if (prev.length >= MAX_OBJECTS) return prev;

        // Pick a random unused object from the pool
        let idx: number;
        let attempts = 0;
        do {
          idx = Math.floor(Math.random() * objectPool.length);
          attempts++;
        } while (usedIndicesRef.current.has(idx) && attempts < 50);

        if (usedIndicesRef.current.has(idx)) return prev;
        usedIndicesRef.current.add(idx);

        const baseObj = objectPool[idx];
        const newObj: DetectedObject = {
          ...baseObj,
          id: `live_${baseObj.id}_${Date.now()}`,
          scanId: `scan_live_${Date.now()}`,
          timestamp: new Date().toISOString(),
          // Slight randomization of confidence
          confidence: Math.min(0.99, Math.max(0.55, baseObj.confidence + (Math.random() - 0.5) * 0.1)),
        };

        return [...prev, newObj];
      });
    };

    // Stagger the detection interval
    detectionRef.current = setInterval(() => {
      const delay = Math.random() * 800;
      setTimeout(addObject, delay);
    }, 1500);
  }, []);

  // Auto-stop after 30 seconds or MAX_OBJECTS
  useEffect(() => {
    if (scanning && elapsedSeconds >= 30) {
      stopScan();
    }
  }, [scanning, elapsedSeconds, stopScan]);

  useEffect(() => {
    if (scanning && detectedObjects.length >= MAX_OBJECTS) {
      stopScan();
    }
  }, [scanning, detectedObjects.length, stopScan]);

  // Occasionally show orientation warning
  useEffect(() => {
    if (scanning && detectedObjects.length >= 5 && detectedObjects.length <= 7) {
      const chance = Math.random();
      if (chance > 0.6) {
        setShowOrientationWarning(true);
        setTimeout(() => setShowOrientationWarning(false), 3000);
      }
    }
  }, [scanning, detectedObjects.length]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (detectionRef.current) clearInterval(detectionRef.current);
    };
  }, []);

  const handleCalibrate = () => {
    setCalibrating(true);
    setTimeout(() => setCalibrating(false), 2000);
  };

  const handleStartStop = () => {
    if (scanning) {
      stopScan();
    } else {
      startScan();
    }
  };

  const handleReset = () => {
    setDetectedObjects([]);
    setElapsedSeconds(0);
    usedIndicesRef.current = new Set();
    setShowOrientationWarning(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] overflow-hidden">
      {/* Main viewport area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1 relative">
          <CameraViewport scanning={scanning}>
            <DetectionHud
              scanning={scanning}
              objectCount={detectedObjects.length}
              maxObjects={MAX_OBJECTS}
              elapsedSeconds={elapsedSeconds}
              avgConfidence={avgConfidence}
            />
            <ArOverlay
              objects={detectedObjects}
              showLabels={true}
              showConfidence={true}
              showDistance={true}
            />
            <SpatialMeasurementOverlay
              measurements={activeMeasurements}
              objects={detectedObjects}
              visible={detectedObjects.length >= 2}
            />
            <DeviceOrientationWarning show={showOrientationWarning} />
          </CameraViewport>
        </div>

        {/* Controls bar */}
        <ScanControls
          scanning={scanning}
          onCalibrate={handleCalibrate}
          onStartStop={handleStartStop}
          onReset={handleReset}
          calibrating={calibrating}
        />
      </div>

      {/* Live detection panel - visible on lg+, on mobile appears as overlay */}
      <div className="hidden lg:flex">
        <LiveDetectionPanel objects={detectedObjects} />
      </div>

      {/* Mobile detection panel - shows at bottom on small screens when scanning */}
      {detectedObjects.length > 0 && (
        <div className="lg:hidden border-t border-border bg-surface max-h-40 overflow-y-auto">
          <div className="px-3 py-2 border-b border-border flex items-center justify-between">
            <span className="text-xs font-semibold text-foreground">Detections</span>
            <span className="text-[10px] font-mono text-cyber">{detectedObjects.length} found</span>
          </div>
          <div className="p-2 space-y-1">
            {[...detectedObjects].reverse().map((obj) => (
              <div
                key={obj.id}
                className="flex items-center gap-2 px-2 py-1 text-xs"
              >
                <div
                  className="h-2 w-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: obj.color }}
                />
                <span className="text-foreground truncate flex-1">{obj.label}</span>
                <span className="text-muted font-mono">{Math.round(obj.confidence * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
