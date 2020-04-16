export interface Input {
  jiraEndpoint: string;
  jiraIssueId: number;
  jiraAccount: string;
  jiraAuthToken: string;
  options?: {
    listeners: {
      stdout: (data: Buffer) => void;
    };
  };
  appName?: string;
  previewUrl?: string;
  commentId?: number;
  commentPayload?: string;
}
