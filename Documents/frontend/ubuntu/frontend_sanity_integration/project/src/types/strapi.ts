// Types génériques Strapi
export interface StrapiResponse<T> {
  data: StrapiData<T>;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiData<T> {
  id: number;
  attributes: T;
}

export interface StrapiRelation<T> {
  data: StrapiData<T> | null;
}

export interface StrapiMultiRelation<T> {
  data: StrapiData<T>[];
}

export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

export interface StrapiErrorResponse {
  data: null;
  error: StrapiError;
}

// Types spécifiques à notre application
export interface Category {
  name: string;
  slug: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface Author {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  title: string;
  slug: string;
  content: string;
  description: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  image: string;
  category: StrapiRelation<Category>;
  tags: StrapiMultiRelation<Tag>;
  author: StrapiRelation<Author>;
}