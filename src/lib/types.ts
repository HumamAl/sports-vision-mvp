export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DetectedObject {
  id: string;
  scanId: string;
  label: string;
  category: "ball" | "player" | "goal" | "boundary" | "equipment" | "surface" | "obstacle";
  confidence: number;
  boundingBox: BoundingBox;
  distance: number;
  timestamp: string;
  color: string;
}

export interface SpatialMeasurement {
  id: string;
  scanId: string;
  fromObjectId: string;
  toObjectId: string;
  distance: number;
  unit: "m" | "cm" | "ft";
  confidence: number;
}

export interface ScanSession {
  id: string;
  name: string;
  location: string;
  sport: string;
  status: "completed" | "reviewing" | "in_progress" | "failed";
  date: string;
  duration: number;
  objectsDetected: number;
  avgConfidence: number;
  qualityScore: number;
  device: string;
  thumbnailUrl?: string;
}

export interface DeviceStatus {
  model: string;
  osVersion: string;
  lidarAvailable: boolean;
  lidarCalibrated: boolean;
  lastCalibration: string;
  batteryLevel: number;
  storageUsed: number;
  storageTotal: number;
  orientation: "portrait" | "landscape" | "face-up" | "face-down";
  gyroActive: boolean;
}

export interface DetectionSettings {
  sensitivity: number;
  minConfidence: number;
  maxObjects: number;
  showBoundingBoxes: boolean;
  showLabels: boolean;
  showConfidence: boolean;
  showDistance: boolean;
  overlayOpacity: number;
  autoSave: boolean;
}

export interface ScanActivityData {
  date: string;
  scans: number;
  objects: number;
}

export interface DetectionAccuracyData {
  category: string;
  accuracy: number;
  count: number;
}

export interface RadarMetricData {
  metric: string;
  value: number;
  fullMark: number;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: number;
  icon: string;
}
