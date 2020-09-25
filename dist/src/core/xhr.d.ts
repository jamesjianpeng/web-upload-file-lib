declare const request: (options: any) => Promise<unknown>;
declare const uploadFormData: (action: string, formData: FormData) => Promise<unknown>;
export { request, uploadFormData };
