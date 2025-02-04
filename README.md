# Mapster

- Building a community of seasoned travelers to make traveling simple for first time adventurers!

### **Application Flow**

1.  **URL Access**: User hits frontend URL → Next.js middleware checks authentication → Redirects to login if unauthenticated → Shows loading state during auth check → Renders protected routes if authenticated.
2.  **Auth Flow**: Login/register via `AuthForm` → JWT stored in cookies → AuthContext manages user state → Protected routes use `ProtectedLayout` for access control.

### **Home Page View**

- **Authenticated**: Displays grid of user's maps (title, city count) with "Create New Map" button.
- **Unauthenticated**: Redirects to login page.
- **Components**: `MapsPage` fetches maps via `mapService`, uses `Link` for navigation.

### **User Interactions**

| **Action**      | **Component**            | **Result**                                   |
| --------------- | ------------------------ | -------------------------------------------- |
| Create Map      | `NewMapPage`             | POST to backend, redirect to map detail      |
| Right-click map | `MapComponent`           | Opens `AddCityForm` with coordinates         |
| Click marker    | `CityMarker/PlaceMarker` | Zooms map or shows `PlacePopup`              |
| Share map       | `ShareModal`             | Generates tokenized URL, copies to clipboard |
| Add place       | `AddPlaceForm`           | POST to backend, updates `MapContext`        |

### **File Roles & Dependencies**

1.  **Contexts**:

    - `AuthContext`: Manages user auth state (login/logout).
    - `MapContext`: Fetches/updates map data, shared across components.

2.  **Services**:

    - `api.js`: Axios instance with auth headers.
    - `mapService.js`: Handles CRUD operations for maps.

3.  **Components**:

    - **Map**: `MapComponent` (parent), `CityMarker`, `PlaceMarker`, `ClusterMarker` (children).
    - **UI**: `AuthForm`, `AddCityForm`, `ShareModal` (use contexts/services).

4.  **Routing**:

    - App Router: `(auth)`/`(protected)` groups manage access.
    - Dynamic routes: `[mapId]` page uses URL params + `MapContext`.

### **Key Dependencies**

- **Auth → Map**: Protected routes require valid auth state to access map data.
- **Services → Components**: All data operations go through `api.js`/`mapService.js`.
- **Contexts → Pages**: `MapDetailPage` uses `MapContext` for real-time updates.
