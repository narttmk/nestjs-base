export interface JwtPayload {
  username: string;
  sub: string; // This is the user ID
  role: string;
}
