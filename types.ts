export interface Shape {
  name: string;
  type: '2D' | '3D' | '4D';
  description: string;
  properties: { [key: string]: string | number };
  color: string; // Hex for non-tailwind uses like SVG fill
  colorName: string; // Tailwind color name e.g., 'yellow'
}