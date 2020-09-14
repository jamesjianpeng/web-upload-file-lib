declare const request: (options: any) => Promise<unknown>;
declare const uploadFormData: (action: string, files: File[]) => Promise<unknown>;
export { request, uploadFormData };
