declare module '@mailchimp/mailchimp_marketing' {
  export function setConfig(config: { apiKey: string; server: string }): void;
  
  export const lists: {
    addListMember: (listId: string, data: any) => Promise<any>;
    updateListMemberTags: (listId: string, subscriberHash: string, tags: { tags: Array<{ name: string, status: string }> }) => Promise<any>;
    createSegment: (listId: string, data: { name: string, static_segment: any[] }) => Promise<any>;
  };

  export const ping: {
    get: () => Promise<{ health_status: string }>;
  };
}