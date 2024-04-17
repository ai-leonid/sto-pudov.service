import { HttpException } from '@nestjs/common';

export const errorHandler = (res = null, statusCode = 500, message = 'Internal Server Error.') => {
  throw new HttpException(message, statusCode);
};

export function sendResponse<T>(
  res = null,
  statusCode = 200,
  message = 'Success',
  isSuccess = true,
  data: T | null = null,
) {
  return res.json({
    statusCode,
    isSuccess,
    message,
    data,
  });
}

export const userSuccessResponse = {
  status: 201,
  description: 'Success! Returns the user data.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 201 },
          isSuccess: { type: 'boolean', example: true },
          message: { type: 'string', example: 'Record Created' },
          data: { type: 'object', example: 'Record Created' },
        },
      },
      example: {
        statusCode: 201,
        isSuccess: true,
        message: 'Record Created',
        data: {
          firstName: 'Ivan',
          lastName: 'Ivanov',
          email: 'example@test.com',
          createdAt: '2023-12-11T04:45:45.710Z',
          updatedAt: '2023-12-11T04:45:45.710Z',
        },
      },
    },
  },
};

export const userErrorResponse = {
  status: 400,
  description: 'Error : Invalid input data.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          isSuccess: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Record Created' },
          data: { type: 'object', example: null },
          timestamp: { type: 'date', example: '2023-12-22T05:17:16.499Z' },
          error: {
            type: 'array',
            example: ['firstName should not be empty'],
          },
        },
      },
      example: {
        statusCode: 400,
        message: 'Bad Request Exception',
        error: ['firstName should not be empty'],
        timestamp: '2023-12-22T05:17:16.499Z',
        path: '/v1/users',
        isSuccess: false,
        data: null,
      },
    },
  },
};

export const userListSuccessResponse = {
  status: 200,
  description: 'Success! Returns the user data.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 201 },
          isSuccess: { type: 'boolean', example: true },
          message: { type: 'string', example: 'SUCCESS' },
          data: {
            type: 'array',
            example: [
              {
                createdAt: '2023-12-11T05:44:35.286Z',
                updatedAt: '2023-12-11T05:44:35.286Z',
                id: '657845cf5dc54b24021ecf04',
                firstName: 'test',
                lastName: 'test',
                email: 'te@test.com',
              },
            ],
          },
        },
      },
      example: {
        statusCode: 200,
        isSuccess: true,
        message: 'SUCCESS',
        data: [
          {
            createdAt: '2023-12-11T05:44:35.286Z',
            updatedAt: '2023-12-11T05:44:35.286Z',
            id: '657845cf5dc54b24021ecf04',
            firstName: 'test',
            lastName: 'test',
            email: 'te@test.com',
          },
        ],
      },
    },
  },
};

export const loginSuccessResponse = {
  status: 200,
  description: 'Success! Returns the user data.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 201 },
          isSuccess: { type: 'boolean', example: true },
          message: { type: 'string', example: 'SUCCESS' },
          data: { type: 'object', example: null },
        },
      },
      example: {
        statusCode: 200,
        isSuccess: true,
        message: 'SUCCESS',
        data: null,
      },
    },
  },
};

export const loginErrorResponse = {
  status: 401,
  description: 'Unauthorized access.',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          isSuccess: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Unauthorized' },
          data: { type: 'object', example: null },
          timestamp: { type: 'date', example: '2023-12-22T05:17:16.499Z' },
          path: { type: 'string', example: '/login' },
        },
      },
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
        timestamp: '2023-12-22T06:00:04.100Z',
        path: '/auth/login',
        isSuccess: false,
        data: null,
      },
    },
  },
};

export const refreshErrorResponse = {
  status: 401,
  description: 'Unauthorized access',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 400 },
          isSuccess: { type: 'boolean', example: false },
          message: { type: 'string', example: 'Unauthorized' },
          data: { type: 'object', example: null },
          timestamp: { type: 'date', example: '2023-12-22T05:17:16.499Z' },
          path: { type: 'string', example: '/login' },
        },
      },
      example: {
        statusCode: 401,
        message: 'Unauthorized',
        error: 'Unauthorized',
        timestamp: '2023-12-22T06:00:04.100Z',
        path: '/auth/refesh',
        isSuccess: false,
        data: null,
      },
    },
  },
};
