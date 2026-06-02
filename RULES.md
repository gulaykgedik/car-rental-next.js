### Project Structure & Code Organization Rules

**UTILS / HELPERS**

- All reusable utility or helper functions **MUST** be defined in `utils/` or `helpers/` directories.
- Utility functions **MUST NOT** be duplicated across files.
- Utility modules **SHOULD** be framework-agnostic and side-effect free where possible.

**SERVICES (API LAYER)**

- All API request logic **MUST** reside in `services/` modules.
- Components and hooks **MUST NOT** directly perform API calls.
- Each service file **SHOULD** be scoped to a specific domain (e.g., `user.service.ts`, `auth.service.ts`).
- API logic **MUST** be abstracted into reusable functions.

**TYPES**

- Shared or complex type definitions **MUST** be placed in `types/` modules.
- Types used across multiple layers **MUST NOT** be redefined in-place.
- Domain-specific types **SHOULD** be grouped logically (e.g., `user.types.ts`).

**ICONS**

- All icons **MUST** be imported from lucide-react.
- Custom or mixed icon libraries **MUST NOT** be used unless explicitly approved.
- Icon usage **SHOULD** remain consistent across the project.