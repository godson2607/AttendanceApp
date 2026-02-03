import { MD3DarkTheme as DefaultTheme, configureFonts } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#8b5cf6', // Violet 500
    onPrimary: '#ffffff',
    primaryContainer: '#4c1d95', // Violet 900
    onPrimaryContainer: '#ede9fe', // Violet 100
    secondary: '#f472b6', // Pink 400
    onSecondary: '#ffffff',
    secondaryContainer: '#831843', // Pink 900
    onSecondaryContainer: '#fce7f3', // Pink 100
    background: '#0f172a', // Slate 900
    onBackground: '#f8fafc', // Slate 50
    surface: '#1e293b', // Slate 800
    onSurface: '#f8fafc', // Slate 50
    surfaceVariant: '#334155', // Slate 700
    onSurfaceVariant: '#cbd5e1', // Slate 300
    outline: '#475569', // Slate 600
    elevation: {
      level0: 'transparent',
      level1: '#1e293b',
      level2: '#334155',
      level3: '#475569',
      level4: '#64748b',
      level5: '#94a3b8',
    },
  },
  roundness: 12,
};
