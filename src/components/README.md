# Components Organization

This directory contains all React components organized by their purpose and functionality.

## Folder Structure

### `/layout`
Components that define the overall page structure and layout:
- **Navigation.jsx** - Main navigation component with collapsible menu
- **LandingMoment.jsx** - Hero section with landing animations
- **MockContent.jsx** - Main content wrapper with sections

### `/content`
Components that display and manage content:
- **Stories.jsx** - Individual story sections with interactive text
- **StoriesIntro.jsx** - Introduction section for stories
- **PullQuote.jsx** - Pull quote display component
- **FullWidthImage.jsx** - Full-width image display component

### `/ui`
Reusable UI components and utilities:
- **DynamicData.jsx** - Dynamic data panel with smooth animations
- **InteractiveText.jsx** - Interactive text with hover effects and links

## Import Usage

### Individual Imports
```javascript
import { Navigation, LandingMoment } from './components/layout';
import { Stories, PullQuote } from './components/content';
import { DynamicData, InteractiveText } from './components/ui';
```

### All Components
```javascript
import { Navigation, LandingMoment, Stories, DynamicData } from './components';
```

## Benefits

- **Clear Separation**: Components are grouped by their primary function
- **Easy Navigation**: Related components are co-located
- **Scalable**: Easy to add new components to appropriate folders
- **Clean Imports**: Index files provide clean import paths
- **Maintainable**: Clear structure makes the codebase easier to maintain
