export type FilterBy = "author" | "title" | "body";

export type Post = {
    id: Number;
    path: string,
    title: string;
    body?: string;
    slug: string;
    author: string;
    thumbnail: string;
    created_at: string;
};