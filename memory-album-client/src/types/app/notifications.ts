export type Notification = {
  message: string;
  type: NotificationType;
};

export enum NotificationType {
  NORMAL,
  WARNING,
  ERROR,
}
