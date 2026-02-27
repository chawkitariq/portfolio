export type GraphqlResponseExtensions = {
  code: string;
  originalError: {
    statusCode: number;
    message: string;
    error: string;
  };
};

export type GraphqlResponse<T = unknown> = {
  data?: T;
  errors?: {
    message: string;
    extensions: GraphqlResponseExtensions;
  }[];
};
