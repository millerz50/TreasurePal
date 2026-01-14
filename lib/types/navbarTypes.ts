export interface User {
  name: string;
  avatarUrl: string;
}

export interface NavTypes {
  name: string;
  description: string;
  user?: User; // Optional for SSR flexibility
}
