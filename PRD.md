# TasteTrail NL - Product Requirements Document

TasteTrail NL is a personal restaurant discovery and tracking app that helps food enthusiasts explore and document their culinary journey across the Netherlands.

**Experience Qualities**:
1. **Inspiring** - Motivates users to discover new dining experiences through beautiful imagery and compelling descriptions
2. **Intimate** - Creates a personal connection with each restaurant entry and review experience
3. **Effortless** - Simple interactions that don't distract from the joy of food discovery

**Complexity Level**: Light Application (multiple features with basic state)
The app manages restaurant data, user visits, and reviews with straightforward state management - perfect for a focused culinary tracking experience.

## Essential Features

### Restaurant Discovery List
- **Functionality**: Browse curated restaurants across the Netherlands with filtering capabilities
- **Purpose**: Inspire users to discover new dining experiences and track their bucket list progress
- **Trigger**: App load displays the main restaurant list
- **Progression**: View list → Apply filters (all/visited/unvisited) → Select restaurant → View details
- **Success criteria**: Users can easily browse and filter restaurants, with clear visual distinction between visited/unvisited

### Visit Tracking & Reviews
- **Functionality**: Toggle visited status and add personal reviews for each restaurant
- **Purpose**: Document culinary journey and create personal food memories
- **Trigger**: Tap on restaurant card or dedicated action buttons
- **Progression**: Select restaurant → Toggle visited status → Add review text → Save automatically
- **Success criteria**: Changes persist across sessions, reviews are easily readable, visited status is immediately visible

### Map Visualization
- **Functionality**: Interactive map showing restaurant locations with pins
- **Purpose**: Help users plan food adventures and understand geographic distribution
- **Trigger**: Switch to map view via navigation
- **Progression**: Open map → View restaurant pins → Tap pin → See restaurant summary → Navigate to details
- **Success criteria**: All restaurants appear correctly positioned, pins are clearly visible, smooth transitions between views

## Edge Case Handling

- **Empty Reviews**: Allow restaurants without reviews to display gracefully with placeholder text
- **Filter Persistence**: Remember last selected filter when returning to the app
- **Long Restaurant Names**: Truncate with ellipsis while maintaining readability
- **Map Loading**: Show skeleton or loading state while map initializes
- **Data Corruption**: Gracefully handle invalid localStorage data with fallback to defaults

## Design Direction

The design should feel warm and inviting like stepping into a cozy Dutch café, with clean modern lines that let the food content shine while encouraging exploration and personal connection with each dining experience.

## Color Selection

Complementary color scheme using warm coral and sage green to create an inviting, food-focused palette that feels both sophisticated and approachable.

- **Primary Color**: Sage Green (oklch(0.7 0.08 142)) - Represents freshness and Dutch countryside, used for primary actions and navigation
- **Secondary Color**: Warm Coral (oklch(0.72 0.15 35)) - Evokes warmth and appetite, used for visited status and interactive highlights
- **Accent Color**: Warm Coral (oklch(0.72 0.15 35)) - For CTAs, visited indicators, and important interactions
- **Foreground/Background Pairings**:
  - Background (Cream White oklch(0.98 0.01 85)): Dark Text (oklch(0.2 0.02 35)) - Ratio 14.2:1 ✓
  - Card (Pure White oklch(1 0 0)): Dark Text (oklch(0.2 0.02 35)) - Ratio 15.8:1 ✓
  - Primary Sage (oklch(0.7 0.08 142)): White Text (oklch(1 0 0)) - Ratio 5.1:1 ✓
  - Accent Coral (oklch(0.72 0.15 35)): White Text (oklch(1 0 0)) - Ratio 4.8:1 ✓

## Font Selection

Typography should feel approachable and readable while conveying quality and sophistication, using Inter for its excellent readability across all devices and friendly character.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Restaurant Names): Inter SemiBold/20px/normal letter spacing  
  - H3 (Section Headers): Inter Medium/16px/normal letter spacing
  - Body (Reviews, Descriptions): Inter Regular/14px/relaxed line height
  - Small (Tags, Meta): Inter Medium/12px/wide letter spacing

## Animations

Subtle animations that enhance the sense of discovery and accomplishment, with gentle transitions that feel organic rather than mechanical.

- **Purposeful Meaning**: Visited toggles should feel satisfying like checking off a bucket list item, with gentle spring animations that communicate achievement
- **Hierarchy of Movement**: Focus animation attention on status changes and navigation transitions, keeping list scrolling and filtering smooth and immediate

## Component Selection

- **Components**: 
  - Card for restaurant entries with hover states
  - Button for primary actions (visit toggle, filters)
  - Badge for restaurant tags and categories
  - Input/Textarea for review writing
  - Tabs for view switching (list/map)
  - Sheet/Dialog for detailed restaurant views
- **Customizations**: Custom map integration, restaurant card layout with image placeholders, filter button group
- **States**: Visited/unvisited restaurant cards, active filter states, review editing modes
- **Icon Selection**: MapPin for locations, Heart for favorites, CheckCircle for visited, Filter for controls
- **Spacing**: 4px base unit, 16px card padding, 24px section spacing
- **Mobile**: Stack cards vertically, collapsible filter bar, full-screen map mode with floating controls