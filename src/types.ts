
export type QRCodeType = 'url' | 'vcard' | 'wifi' | 'pdf' | 'app' | 'ai';

export interface QRConfig {
  type: QRCodeType;
  data: any;
  design: {
    dots: 'square' | 'rounded' | 'dots' | 'classy';
    corners: 'square' | 'rounded' | 'extra-rounded';
    color: string;
    gradient?: {
      from: string;
      to: string;
      type: 'linear' | 'radial';
    };
    logo?: string;
  };
}

export interface ScanMetric {
  date: string;
  count: number;
}

export interface DeviceMetric {
  name: string;
  value: number;
  color: string;
}

export interface Campaign {
  id: string;
  name: string;
  folders: string[];
  totalScans: number;
  status: 'active' | 'paused';
  createdAt: string;
}
